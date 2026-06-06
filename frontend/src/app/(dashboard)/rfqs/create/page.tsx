"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VendorsList } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CreateRfqPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [lineItems, setLineItems] = useState([{ id: 1, item: "", sku: "", qty: "", unit: "", price: "" }]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), item: "", sku: "", qty: "", unit: "", price: "" }]);
  };

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const toggleVendor = (id: string) => {
    setSelectedVendors(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Request for Quotation</h2>
          <p className="text-muted-foreground mt-1">Multi-step wizard to publish new sourcing requirements.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            {isDraftSaved ? <><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Saved</> : "Save Draft"}
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          
          {[
            { num: 1, label: "Basic Info" },
            { num: 2, label: "Line Items" },
            { num: 3, label: "Vendors" },
            { num: 4, label: "Attachments" }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors",
                step >= s.num ? "bg-primary border-primary text-primary-foreground" : "bg-card border-muted text-muted-foreground"
              )}>
                {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
              </div>
              <span className={cn("text-xs font-medium", step >= s.num ? "text-primary" : "text-muted-foreground")}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader>
          <CardTitle>
            {step === 1 && "RFQ Information"}
            {step === 2 && "Line Items"}
            {step === 3 && "Vendor Assignment"}
            {step === 4 && "Attachments & Final Review"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Provide high-level details for your sourcing requirement."}
            {step === 2 && "Specify the exact goods or services required."}
            {step === 3 && "Select vendors to invite. AI has recommended the best matches."}
            {step === 4 && "Upload supporting documents and publish."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="min-h-[400px]">
          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">RFQ Title</label>
                <Input placeholder="e.g. Procurement of 500 Enterprise Laptops" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hw">IT Hardware</SelectItem>
                    <SelectItem value="sw">Software</SelectItem>
                    <SelectItem value="srv">Services</SelectItem>
                    <SelectItem value="furn">Furniture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline for Submission</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Budget (₹)</label>
                <Input type="number" placeholder="1000000" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Detailed Description</label>
                <Textarea placeholder="Provide detailed specifications..." className="h-32" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>SKU/Part No.</TableHead>
                      <TableHead className="w-[100px]">Qty</TableHead>
                      <TableHead className="w-[120px]">Unit</TableHead>
                      <TableHead>Expected Price</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell><Input placeholder="Item Description" /></TableCell>
                        <TableCell><Input placeholder="SKU-123" /></TableCell>
                        <TableCell><Input type="number" placeholder="10" /></TableCell>
                        <TableCell>
                          <Select defaultValue="nos">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nos">Nos</SelectItem>
                              <SelectItem value="kg">Kg</SelectItem>
                              <SelectItem value="lit">Litres</SelectItem>
                              <SelectItem value="ls">Lumpsum</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><Input type="number" placeholder="Price" /></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeLineItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" className="w-full border-dashed" onClick={addLineItem}>
                <Plus className="mr-2 h-4 w-4" /> Add Line Item
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg flex items-start gap-4">
                 <div className="p-2 bg-primary/20 rounded-full"><Sparkles className="h-5 w-5 text-primary" /></div>
                 <div>
                   <h4 className="font-semibold text-primary">AI Vendor Recommendations</h4>
                   <p className="text-sm text-primary/80 mt-1">Based on the category "Hardware" and your historical POs, we highly recommend inviting these top performing vendors.</p>
                 </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                 {VendorsList.filter(v => v.category === "Hardware" || v.category === "IT Services").map((vendor) => {
                   const isSelected = selectedVendors.includes(vendor.id);
                   const isRecommended = vendor.rating > 4.5;
                   
                   return (
                     <div 
                       key={vendor.id} 
                       className={cn(
                         "border rounded-lg p-4 cursor-pointer transition-all",
                         isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-muted-foreground/50",
                         isRecommended && !isSelected && "border-primary/30"
                       )}
                       onClick={() => toggleVendor(vendor.id)}
                     >
                       <div className="flex justify-between items-start">
                         <div>
                           <div className="flex items-center gap-2">
                             <h4 className="font-semibold">{vendor.name}</h4>
                             {isRecommended && <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">Recommended</Badge>}
                           </div>
                           <p className="text-xs text-muted-foreground mt-1">GST: {vendor.gst} • Rating: {vendor.rating}★</p>
                         </div>
                         <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", isSelected ? "bg-primary border-primary" : "border-muted-foreground")}>
                            {isSelected && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                         </div>
                       </div>
                     </div>
                   );
                 })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center py-12">
               <div className="mx-auto w-24 h-24 rounded-full bg-accent/30 border-2 border-dashed border-border flex items-center justify-center mb-6">
                  <Upload className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="text-lg font-medium">Upload RFQ Attachments</h3>
               <p className="text-muted-foreground max-w-md mx-auto">
                 Drag and drop specification sheets, CAD diagrams, or SLA documents here, or click to browse.
               </p>
               <input 
                 type="file" 
                 id="file-upload" 
                 multiple 
                 className="hidden" 
                 onChange={handleFileUpload} 
               />
               <Button variant="outline" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
                 Browse Files
               </Button>
               
               {uploadedFiles.length > 0 && (
                 <div className="mt-6 max-w-md mx-auto bg-muted/50 p-4 rounded-lg text-left">
                   <h4 className="text-sm font-semibold mb-2">Uploaded Files:</h4>
                   <ul className="text-sm space-y-1">
                     {uploadedFiles.map((file, i) => (
                       <li key={i} className="flex items-center gap-2 text-muted-foreground">
                         <FileText className="w-4 h-4" /> {file}
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
               
               <div className="mt-8 pt-8 border-t text-left max-w-md mx-auto">
                 <h4 className="font-semibold mb-4">Selected Vendors ({selectedVendors.length})</h4>
                 <div className="flex flex-wrap gap-2">
                    {selectedVendors.map(id => {
                      const v = VendorsList.find(x => x.id === id);
                      return <Badge key={id} variant="secondary">{v?.name}</Badge>;
                    })}
                 </div>
               </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
              Publish & Send RFQ
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
