"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

export default function CreateRfqPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendorsList, setVendorsList] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    deadline: "",
    budget: "",
    department: "Procurement",
    description: "",
  });

  const [lineItems, setLineItems] = useState([
    { id: Date.now(), itemName: "", sku: "", quantity: "", unit: "Nos", expectedPrice: "", tax: "0" }
  ]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await api.get('/vendors');
        setVendorsList(res.data);
      } catch (err) {
        console.error("Failed to fetch vendors", err);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string | null) => {
    if (value) setFormData({ ...formData, [name]: value });
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), itemName: "", sku: "", quantity: "", unit: "Nos", expectedPrice: "", tax: "0" }]);
  };

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: number, field: string, value: string) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        budget: Number(formData.budget),
        deadline: new Date(formData.deadline).toISOString(),
        department: formData.department,
        lineItems: lineItems.map(item => ({
          itemName: item.itemName,
          sku: item.sku,
          quantity: Number(item.quantity),
          unit: item.unit,
          expectedPrice: Number(item.expectedPrice),
          tax: Number(item.tax)
        })),
        assignedVendors: selectedVendors,
        status: 'Published'
      };

      await api.post('/rfqs', payload);
      toast({ title: "Success", description: "RFQ published successfully!" });
      router.push("/rfqs");
    } catch (err: any) {
      toast({ 
        title: "Error", 
        description: err.response?.data?.message || "Failed to create RFQ", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
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
            { num: 4, label: "Review" }
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
            {step === 4 && "Final Review"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Provide high-level details for your sourcing requirement."}
            {step === 2 && "Specify the exact goods or services required."}
            {step === 3 && "Select vendors to invite. AI has recommended the best matches."}
            {step === 4 && "Review and publish."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="min-h-[400px]">
          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">RFQ Title <span className="text-destructive">*</span></label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Procurement of 500 Enterprise Laptops" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category <span className="text-destructive">*</span></label>
                <Select value={formData.category} onValueChange={(v) => handleSelectChange('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT Hardware">IT Hardware</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={formData.priority} onValueChange={(v) => handleSelectChange('priority', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline for Submission <span className="text-destructive">*</span></label>
                <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Budget (₹) <span className="text-destructive">*</span></label>
                <Input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="1000000" required />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Detailed Description <span className="text-destructive">*</span></label>
                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Provide detailed specifications..." className="h-32" required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Item Name</TableHead>
                      <TableHead>SKU/Part No.</TableHead>
                      <TableHead className="w-[100px]">Qty</TableHead>
                      <TableHead className="w-[120px]">Unit</TableHead>
                      <TableHead>Expected Price</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell><Input value={item.itemName} onChange={(e) => updateLineItem(item.id, 'itemName', e.target.value)} placeholder="Item Description" /></TableCell>
                        <TableCell><Input value={item.sku} onChange={(e) => updateLineItem(item.id, 'sku', e.target.value)} placeholder="SKU-123" /></TableCell>
                        <TableCell><Input type="number" value={item.quantity} onChange={(e) => updateLineItem(item.id, 'quantity', e.target.value)} placeholder="10" /></TableCell>
                        <TableCell>
                          <Select value={item.unit} onValueChange={(v) => updateLineItem(item.id, 'unit', v || "")}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Nos">Nos</SelectItem>
                              <SelectItem value="Kg">Kg</SelectItem>
                              <SelectItem value="Litres">Litres</SelectItem>
                              <SelectItem value="Lumpsum">Lumpsum</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><Input type="number" value={item.expectedPrice} onChange={(e) => updateLineItem(item.id, 'expectedPrice', e.target.value)} placeholder="Price" /></TableCell>
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
                   <p className="text-sm text-primary/80 mt-1">Based on the category "{formData.category || 'selected'}", we recommend these vendors from your registry.</p>
                 </div>
              </div>

              {vendorsList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No vendors found. Please add vendors first.</div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                   {vendorsList.map((vendor) => {
                     const isSelected = selectedVendors.includes(vendor._id);
                     const isCategoryMatch = vendor.category === formData.category;
                     const isRecommended = isCategoryMatch || vendor.rating > 4;
                     
                     return (
                       <div 
                         key={vendor._id} 
                         className={cn(
                           "border rounded-lg p-4 cursor-pointer transition-all",
                           isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-muted-foreground/50",
                           isRecommended && !isSelected && "border-primary/30"
                         )}
                         onClick={() => toggleVendor(vendor._id)}
                       >
                         <div className="flex justify-between items-start">
                           <div>
                             <div className="flex items-center gap-2">
                               <h4 className="font-semibold">{vendor.companyName}</h4>
                               {isRecommended && <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">Recommended</Badge>}
                             </div>
                             <p className="text-xs text-muted-foreground mt-1">GST: {vendor.gstNumber} • Rating: {vendor.rating}★</p>
                           </div>
                           <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", isSelected ? "bg-primary border-primary" : "border-muted-foreground")}>
                              {isSelected && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                           </div>
                         </div>
                       </div>
                     );
                   })}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 py-6">
               <h3 className="text-xl font-bold text-center">Ready to Publish</h3>
               <p className="text-center text-muted-foreground">Please review your selections before publishing this RFQ.</p>
               
               <div className="mt-8 pt-8 border-t max-w-md mx-auto">
                 <h4 className="font-semibold mb-2">Title</h4>
                 <p className="text-muted-foreground mb-4">{formData.title}</p>
                 
                 <h4 className="font-semibold mb-2">Line Items</h4>
                 <p className="text-muted-foreground mb-4">{lineItems.length} item(s) total expected budget: ₹{formData.budget}</p>

                 <h4 className="font-semibold mb-4">Selected Vendors ({selectedVendors.length})</h4>
                 <div className="flex flex-wrap gap-2">
                    {selectedVendors.map(id => {
                      const v = vendorsList.find(x => x._id === id);
                      return <Badge key={id} variant="secondary">{v?.companyName}</Badge>;
                    })}
                 </div>
               </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
          <Button variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting}>
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish & Send RFQ"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
