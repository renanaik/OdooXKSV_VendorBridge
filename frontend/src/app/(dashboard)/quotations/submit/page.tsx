"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Send, FileText, CalendarDays } from "lucide-react";

export default function QuotationSubmitPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Dell Latitude 5430", qty: 250, price: 65000, tax: 18, discount: 5, deliveryDays: 14 },
    { id: 2, name: "Dell Monitor 24-inch", qty: 250, price: 12000, tax: 18, discount: 5, deliveryDays: 14 },
  ]);

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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Submit Quotation</h2>
          <p className="text-muted-foreground mt-1">Provide your best rates for the requested items.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">Save Draft</Button>
           <Button className="flex items-center gap-2"><Send className="w-4 h-4" /> Submit Quotation</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2"><FileText className="w-5 h-5" /> RFQ Summary</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Reference:</span> <span className="font-medium">RFQ-2026-001</span></div>
                  <div><span className="text-muted-foreground">Title:</span> <span className="font-medium">Procurement of 500 Enterprise Laptops</span></div>
                  <div><span className="text-muted-foreground">Buyer:</span> <span className="font-medium">TechCorp India</span></div>
                  <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium text-destructive">15 June 2026</span></div>
               </div>
             </CardContent>
           </Card>

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

           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Terms & Conditions</CardTitle>
             </CardHeader>
             <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Terms</label>
                  <Input placeholder="e.g. Net 30, 50% Advance" defaultValue="Net 30 Days" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Warranty</label>
                  <Input placeholder="e.g. 1 Year Comprehensive" defaultValue="3 Years On-site" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Additional Comments</label>
                  <Textarea placeholder="Any specific constraints or offers..." />
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
                 <span className="text-muted-foreground">Estimated Tax (GST)</span>
                 <span className="font-medium">+ ₹ {summary.totalTax.toLocaleString('en-IN')}</span>
               </div>
               <div className="my-4 border-t border-dashed"></div>
               <div className="flex justify-between items-end">
                 <span className="font-semibold">Grand Total</span>
                 <span className="text-2xl font-bold text-primary">₹ {summary.grandTotal.toLocaleString('en-IN')}</span>
               </div>
               
               <div className="mt-6 pt-6 border-t space-y-3">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" /> Avg Delivery: {Math.max(...items.map(i => i.deliveryDays))} Days
                 </div>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
