"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, UploadCloud, Briefcase } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

export default function AddVendorPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    category: "",
    gstNumber: "",
    panNumber: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const steps = [
    { id: 1, title: "Company Details", icon: Building2 },
    { id: 2, title: "Bank Details", icon: Briefcase },
    { id: 3, title: "Compliance & Docs", icon: FileText },
  ];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string | null) => {
    if (value) setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.post("/vendors", formData);
      toast({ title: "Success", description: "Vendor registered successfully" });
      router.push('/vendors');
    } catch (err: any) {
      toast({ 
        title: "Registration Failed", 
        description: err.response?.data?.message || "Failed to register vendor", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Acme Corporation" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vendor Category <span className="text-destructive">*</span></label>
                  <Select value={formData.category} onValueChange={(val) => handleSelectChange('category', val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT Hardware & Software">IT Hardware & Software</SelectItem>
                      <SelectItem value="Logistics & Transport">Logistics & Transport</SelectItem>
                      <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                      <SelectItem value="Professional Services">Professional Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                  <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="contact@company.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://www.company.com" />
                </div>
              </div>

              <h3 className="text-lg font-semibold border-b pb-2 mt-8">Registered Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Address Line 1 <span className="text-destructive">*</span></label>
                  <Input name="address" value={formData.address} onChange={handleChange} placeholder="Street address, building, suite" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
                  <Input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State / Province <span className="text-destructive">*</span></label>
                  <Input name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Postal Code <span className="text-destructive">*</span></label>
                  <Input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="PIN code" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country <span className="text-destructive">*</span></label>
                  <Select value={formData.country} onValueChange={(val) => handleSelectChange('country', val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
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
                  <Input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank, SBI" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Holder Name <span className="text-destructive">*</span></label>
                  <Input placeholder="Name on the bank account" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Number <span className="text-destructive">*</span></label>
                  <Input name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Enter account number" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">IFSC / Routing Code <span className="text-destructive">*</span></label>
                  <Input name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="e.g. HDFC0001234" required />
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
                  <Input name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="e.g. 22AAAAA0000A1Z5" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">PAN Number <span className="text-destructive">*</span></label>
                  <Input name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="e.g. ABCDE1234F" required />
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
