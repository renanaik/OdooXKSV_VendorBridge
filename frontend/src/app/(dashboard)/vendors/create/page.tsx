"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, CheckCircle2, UploadCloud, Building, Briefcase } from "lucide-react";

export default function AddVendorPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: "Company Details", icon: Building2 },
    { id: 2, title: "Bank Details", icon: Briefcase },
    { id: 3, title: "Compliance & Docs", icon: FileText },
  ];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/vendors');
    }, 1500);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Register New Vendor</h2>
          <p className="text-muted-foreground">Add a new supplier to the VendorBridge ecosystem.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="secondary" onClick={() => alert("Draft saved successfully!")}>Save Draft</Button>
          {step === 3 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Vendor"}
            </Button>
          ) : (
            <Button onClick={handleNext}>Next Step</Button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 bg-card border rounded-lg p-4">
        {steps.map((s, index) => (
          <div key={s.id} className="flex flex-col items-center w-1/3 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-muted-foreground/30 text-muted-foreground'}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <span className={`text-sm mt-2 font-medium ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>{s.title}</span>
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-[60%] w-[80%] h-[2px] -z-10 ${step > s.id ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-semibold border-b pb-2">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name <span className="text-destructive">*</span></label>
                  <Input placeholder="e.g. Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vendor Category <span className="text-destructive">*</span></label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Hardware & Software</SelectItem>
                      <SelectItem value="logistics">Logistics & Transport</SelectItem>
                      <SelectItem value="raw">Raw Materials</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                  <Input type="email" placeholder="contact@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
                  <Input placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input placeholder="https://www.company.com" />
                </div>
              </div>

              <h3 className="text-lg font-semibold border-b pb-2 mt-8">Registered Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Address Line 1 <span className="text-destructive">*</span></label>
                  <Input placeholder="Street address, building, suite" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
                  <Input placeholder="City" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State / Province <span className="text-destructive">*</span></label>
                  <Input placeholder="State" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Postal Code <span className="text-destructive">*</span></label>
                  <Input placeholder="PIN code" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country <span className="text-destructive">*</span></label>
                  <Select defaultValue="india">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-semibold border-b pb-2">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bank Name <span className="text-destructive">*</span></label>
                  <Input placeholder="e.g. HDFC Bank, SBI" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Holder Name <span className="text-destructive">*</span></label>
                  <Input placeholder="Name on the bank account" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Number <span className="text-destructive">*</span></label>
                  <Input placeholder="Enter account number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">IFSC / Routing Code <span className="text-destructive">*</span></label>
                  <Input placeholder="e.g. HDFC0001234" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-semibold border-b pb-2">Compliance & Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GST Number <span className="text-destructive">*</span></label>
                  <Input placeholder="e.g. 22AAAAA0000A1Z5" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">PAN Number <span className="text-destructive">*</span></label>
                  <Input placeholder="e.g. ABCDE1234F" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "GST Certificate", req: true, id: "gst" },
                  { title: "PAN Card Copy", req: true, id: "pan" },
                  { title: "MSME Certificate", req: false, id: "msme" },
                  { title: "Signed Vendor Agreement", req: false, id: "agreement" }
                ].map((doc, idx) => (
                  <div key={idx} className="relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer group">
                    <input type="file" id={doc.id} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{doc.title} {doc.req && <span className="text-destructive">*</span>}</span>
                    <span className="text-xs text-muted-foreground mt-1">PDF or Image up to 5MB</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {step > 1 && (
        <div className="flex justify-start">
          <Button variant="ghost" onClick={handlePrev}>← Previous Step</Button>
        </div>
      )}
    </div>
  );
}
