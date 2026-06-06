"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Send, FileText, CalendarDays } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

export default function QuotationSubmitPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  
  const [selectedRfqId, setSelectedRfqId] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [selectedRfq, setSelectedRfq] = useState<any>(null);

  const [items, setItems] = useState<any[]>([]);
  
  const [terms, setTerms] = useState({
    paymentTerms: "Net 30 Days",
    warranty: "1 Year",
    notes: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rfqRes, vendorRes] = await Promise.all([
          api.get("/rfqs"),
          api.get("/vendors")
        ]);
        setRfqs(rfqRes.data);
        setVendors(vendorRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRfqId) {
      const rfq = rfqs.find(r => r._id === selectedRfqId);
      setSelectedRfq(rfq);
      if (rfq && rfq.lineItems) {
        setItems(rfq.lineItems.map((item: any, i: number) => ({
          id: i,
          name: item.itemName,
          qty: item.quantity,
          price: item.expectedPrice || 0,
          tax: item.tax || 0,
          discount: 0,
          deliveryDays: 14
        })));
      }
    } else {
      setSelectedRfq(null);
      setItems([]);
    }
  }, [selectedRfqId, rfqs]);

  const calculateRowTotal = (item: any) => {
    const base = item.qty * item.price;
    const discountAmt = base * (item.discount / 100);
    const afterDiscount = base - discountAmt;
    const taxAmt = afterDiscount * (item.tax / 100);
    return afterDiscount + taxAmt;
  };

  const calculateSummary = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    items.forEach(item => {
      const base = item.qty * item.price;
      const discountAmt = base * (item.discount / 100);
      const afterDiscount = base - discountAmt;
      const taxAmt = afterDiscount * (item.tax / 100);
      
      subtotal += base;
      totalDiscount += discountAmt;
      totalTax += taxAmt;
    });

    return { subtotal, totalDiscount, totalTax, grandTotal: subtotal - totalDiscount + totalTax };
  };

  const summary = calculateSummary();

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: parseFloat(value) || 0 };
    setItems(newItems);
  };

  const handleSubmit = async () => {
    if (!selectedRfqId || !selectedVendorId) {
      toast({ title: "Validation Error", description: "Please select an RFQ and Vendor", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        rfq: selectedRfqId,
        vendor: selectedVendorId,
        items: items.map(i => ({
          itemName: i.name,
          quantity: i.qty,
          unitPrice: i.price,
          tax: i.tax,
          discount: i.discount,
          total: calculateRowTotal(i)
        })),
        subtotal: summary.subtotal,
        tax: summary.totalTax,
        discount: summary.totalDiscount,
        grandTotal: summary.grandTotal,
        deliveryDays: Math.max(...items.map(i => i.deliveryDays), 0),
        paymentTerms: terms.paymentTerms,
        warranty: terms.warranty,
        notes: terms.notes,
        status: 'Submitted'
      };

      await api.post("/quotations", payload);
      toast({ title: "Success", description: "Quotation submitted successfully!" });
      router.push(`/quotations/compare?rfqId=${selectedRfqId}`);
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to submit quotation", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Submit Quotation</h2>
          <p className="text-muted-foreground mt-1">Provide your best rates for the requested items.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
           <Button className="flex items-center gap-2" onClick={handleSubmit} disabled={loading}>
             <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Submit Quotation"}
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2"><FileText className="w-5 h-5" /> Selection</CardTitle>
             </CardHeader>
             <CardContent className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Select Vendor</label>
                 <Select value={selectedVendorId} onValueChange={setSelectedVendorId}>
                   <SelectTrigger><SelectValue placeholder="Choose vendor" /></SelectTrigger>
                   <SelectContent>
                     {vendors.map(v => (
                       <SelectItem key={v._id} value={v._id}>{v.companyName}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Select RFQ</label>
                 <Select value={selectedRfqId} onValueChange={setSelectedRfqId}>
                   <SelectTrigger><SelectValue placeholder="Choose RFQ" /></SelectTrigger>
                   <SelectContent>
                     {rfqs.map(r => (
                       <SelectItem key={r._id} value={r._id}>{r.rfqNumber} - {r.title}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               {selectedRfq && (
                 <div className="col-span-2 mt-4 p-4 bg-muted/50 rounded-lg text-sm grid grid-cols-2 gap-4">
                    <div><span className="text-muted-foreground">Category:</span> <span className="font-medium">{selectedRfq.category}</span></div>
                    <div><span className="text-muted-foreground">Priority:</span> <span className="font-medium">{selectedRfq.priority}</span></div>
                    <div><span className="text-muted-foreground">Department:</span> <span className="font-medium">{selectedRfq.department}</span></div>
                    <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium text-destructive">{new Date(selectedRfq.deadline).toLocaleDateString()}</span></div>
                 </div>
               )}
             </CardContent>
           </Card>

           {items.length > 0 && (
             <Card>
               <CardHeader>
                 <CardTitle className="text-lg">Line Items Pricing</CardTitle>
                 <CardDescription>Enter unit price, applicable taxes, and discounts.</CardDescription>
               </CardHeader>
               <CardContent className="p-0 overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Item</TableHead>
                       <TableHead className="w-[80px]">Qty</TableHead>
                       <TableHead className="w-[120px]">Unit Price (₹)</TableHead>
                       <TableHead className="w-[80px]">Tax %</TableHead>
                       <TableHead className="w-[80px]">Disc %</TableHead>
                       <TableHead className="w-[100px]">Delivery (Days)</TableHead>
                       <TableHead className="text-right w-[150px]">Net Total (₹)</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {items.map((item, index) => (
                       <TableRow key={item.id}>
                         <TableCell className="font-medium">{item.name}</TableCell>
                         <TableCell>{item.qty}</TableCell>
                         <TableCell><Input type="number" value={item.price} onChange={(e) => updateItem(index, 'price', e.target.value)} className="h-8" /></TableCell>
                         <TableCell><Input type="number" value={item.tax} onChange={(e) => updateItem(index, 'tax', e.target.value)} className="h-8" /></TableCell>
                         <TableCell><Input type="number" value={item.discount} onChange={(e) => updateItem(index, 'discount', e.target.value)} className="h-8" /></TableCell>
                         <TableCell><Input type="number" value={item.deliveryDays} onChange={(e) => updateItem(index, 'deliveryDays', e.target.value)} className="h-8" /></TableCell>
                         <TableCell className="text-right font-bold">{(calculateRowTotal(item)).toLocaleString('en-IN')}</TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </CardContent>
             </Card>
           )}

           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Terms & Conditions</CardTitle>
             </CardHeader>
             <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Terms</label>
                  <Select value={terms.paymentTerms} onValueChange={(val) => setTerms({...terms, paymentTerms: val})}>
                    <SelectTrigger><SelectValue placeholder="Select terms" /></SelectTrigger>
                    <SelectContent>
                       <SelectItem value="Net 30">Net 30</SelectItem>
                       <SelectItem value="50% Advance">50% Advance</SelectItem>
                       <SelectItem value="Immediate">Immediate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Warranty</label>
                  <Input value={terms.warranty} onChange={(e) => setTerms({...terms, warranty: e.target.value})} placeholder="e.g. 1 Year Comprehensive" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Additional Comments</label>
                  <Textarea value={terms.notes} onChange={(e) => setTerms({...terms, notes: e.target.value})} placeholder="Any specific constraints or offers..." />
                </div>
             </CardContent>
           </Card>
        </div>

        <div className="space-y-6">
           <Card className="sticky top-6 border-2 border-primary/20 shadow-md">
             <CardHeader className="bg-primary/5 pb-4 border-b">
               <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-primary" /> Live Cost Summary</CardTitle>
             </CardHeader>
             <CardContent className="pt-6 space-y-4">
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Subtotal</span>
                 <span className="font-medium">₹ {summary.subtotal.toLocaleString('en-IN')}</span>
               </div>
               <div className="flex justify-between text-sm text-emerald-500">
                 <span>Discount</span>
                 <span>- ₹ {summary.totalDiscount.toLocaleString('en-IN')}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Estimated Tax</span>
                 <span className="font-medium">+ ₹ {summary.totalTax.toLocaleString('en-IN')}</span>
               </div>
               <div className="my-4 border-t border-dashed"></div>
               <div className="flex justify-between items-end">
                 <span className="font-semibold">Grand Total</span>
                 <span className="text-2xl font-bold text-primary">₹ {summary.grandTotal.toLocaleString('en-IN')}</span>
               </div>
               
               <div className="mt-6 pt-6 border-t space-y-3">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" /> Avg Delivery: {items.length ? Math.max(...items.map(i => i.deliveryDays)) : 0} Days
                 </div>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
