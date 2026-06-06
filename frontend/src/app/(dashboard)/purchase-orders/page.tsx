"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, FileText, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PurchaseOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Purchase Order Details</h2>
          <p className="text-muted-foreground mt-1">PO-2026-0045</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline"><Printer className="w-4 h-4 mr-2" /> Print</Button>
           <Button variant="outline"><Download className="w-4 h-4 mr-2" /> PDF</Button>
           <Button><Share2 className="w-4 h-4 mr-2" /> Share</Button>
        </div>
      </div>

      <Card className="border-2 p-4 md:p-8">
        <CardHeader className="px-0 pt-0 flex flex-row items-start justify-between border-b pb-6">
           <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg text-primary-foreground font-bold text-xl">VB</div>
              <div>
                <h3 className="text-2xl font-bold">TechCorp India</h3>
                <p className="text-sm text-muted-foreground">Corporate Headquarters, Mumbai</p>
              </div>
           </div>
           <div className="text-right">
              <h1 className="text-3xl font-black text-primary/20 uppercase tracking-widest mb-2">Purchase Order</h1>
              <div className="text-sm"><span className="font-medium">PO Number:</span> PO-2026-0045</div>
              <div className="text-sm"><span className="font-medium">Date:</span> 12 May 2026</div>
              <div className="mt-2"><Badge className="bg-emerald-500 hover:bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge></div>
           </div>
        </CardHeader>
        
        <CardContent className="px-0 pt-6 space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <div>
                 <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-2">Vendor Details</h4>
                 <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-bold text-lg">Reliance Retail Ltd</p>
                    <p className="text-sm mt-1">Bandra Kurla Complex, Mumbai, 400051</p>
                    <p className="text-sm">GST: 27AADCR4534K1Z2</p>
                    <p className="text-sm mt-2">Attn: Anil Ambani (+91 98765 43210)</p>
                 </div>
              </div>
              <div>
                 <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-2">Shipping Details</h4>
                 <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-bold">TechCorp India - IT Hub</p>
                    <p className="text-sm mt-1">Sector 62, Noida, UP, 201309</p>
                    <p className="text-sm mt-2">Delivery Expected By: 26 May 2026</p>
                 </div>
              </div>
           </div>
           
           <div className="rounded-md border border-muted-foreground/20">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px] text-center">Qty</TableHead>
                    <TableHead className="w-[150px] text-right">Unit Price (₹)</TableHead>
                    <TableHead className="w-[150px] text-right">Total (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell className="font-medium">Dell Latitude 5430 Laptop<br/><span className="text-xs text-muted-foreground font-normal">Core i7, 16GB RAM, 512GB SSD</span></TableCell>
                    <TableCell className="text-center">500</TableCell>
                    <TableCell className="text-right">65,000</TableCell>
                    <TableCell className="text-right font-semibold">3,25,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell className="font-medium">Dell 24-inch Monitor<br/><span className="text-xs text-muted-foreground font-normal">P2422H</span></TableCell>
                    <TableCell className="text-center">500</TableCell>
                    <TableCell className="text-right">12,000</TableCell>
                    <TableCell className="text-right font-semibold">60,00,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
           </div>
           
           <div className="flex justify-end">
              <div className="w-1/2 space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Subtotal</span>
                   <span>₹ 3,85,00,000</span>
                 </div>
                 <div className="flex justify-between text-sm text-emerald-500">
                   <span>Bulk Discount (5%)</span>
                   <span>- ₹ 19,25,000</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">CGST (9%)</span>
                   <span>₹ 32,91,750</span>
                 </div>
                 <div className="flex justify-between text-sm border-b pb-3">
                   <span className="text-muted-foreground">SGST (9%)</span>
                   <span>₹ 32,91,750</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                   <span className="font-bold text-lg">Grand Total</span>
                   <span className="text-2xl font-black text-primary">₹ 4,31,58,500</span>
                 </div>
              </div>
           </div>
           
           <div className="border-t pt-6 text-sm text-muted-foreground">
              <h4 className="font-semibold text-foreground mb-2">Terms & Conditions</h4>
              <ul className="list-disc pl-5 space-y-1">
                 <li>Payment: 30 days net from the date of invoice.</li>
                 <li>All goods must be delivered along with the original tax invoice.</li>
                 <li>3 Years comprehensive on-site warranty applicable as per SLA.</li>
              </ul>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
