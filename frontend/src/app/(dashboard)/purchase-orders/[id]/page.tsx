"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/api";

export default function PurchaseOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [po, setPo] = useState<any>(null);

  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchPO = async () => {
      try {
        const res = await api.get(`/purchase-orders/${id}`);
        setPo(res.data);
      } catch (err) {
        console.error("Failed to load PO", err);
      }
    };
    if (id) fetchPO();
  }, [id]);

  const generateInvoice = async () => {
    setGenerating(true);
    try {
      const payload = {
        purchaseOrder: po._id,
        vendor: po.vendor._id,
        invoiceDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        items: po.items,
        subtotal: po.subtotal,
        tax: po.tax,
        discount: 0,
        grandTotal: po.grandTotal,
        status: "Pending"
      };
      const res = await api.post("/invoices", payload);
      alert("Invoice generated successfully!");
      router.push(`/invoices/${res.data._id}`);
    } catch (err: any) {
      alert("Failed to generate Invoice");
    } finally {
      setGenerating(false);
    }
  };

  if (!po) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="w-5 h-5" /></Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Purchase Order Details</h2>
            <p className="text-muted-foreground mt-1">{po.poNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline"><Printer className="w-4 h-4 mr-2" /> Print</Button>
           <Button variant="outline"><Download className="w-4 h-4 mr-2" /> PDF</Button>
           <Button variant="default" onClick={generateInvoice} disabled={generating}>
             <FileText className="w-4 h-4 mr-2" /> {generating ? "Generating..." : "Generate Invoice"}
           </Button>
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
              <div className="text-sm"><span className="font-medium">PO Number:</span> {po.poNumber}</div>
              <div className="text-sm"><span className="font-medium">Date:</span> {new Date(po.createdAt).toLocaleDateString()}</div>
              <div className="mt-2">
                 <Badge className={po.status === 'Accepted' || po.status === 'Sent to Vendor' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-amber-500 text-white'}>
                   <CheckCircle2 className="w-3 h-3 mr-1" /> {po.status}
                 </Badge>
              </div>
           </div>
        </CardHeader>
        
        <CardContent className="px-0 pt-6 space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <div>
                 <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-2">Vendor Details</h4>
                 <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-bold text-lg">{po.vendor?.companyName}</p>
                    <p className="text-sm mt-1">{po.vendor?.address}</p>
                    <p className="text-sm mt-2">{po.vendor?.email}</p>
                 </div>
              </div>
              <div>
                 <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-2">Shipping Details</h4>
                 <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-bold">TechCorp India - IT Hub</p>
                    <p className="text-sm mt-1">Sector 62, Noida, UP, 201309</p>
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
                  {po.items?.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="font-medium">{item.itemName}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{(item.unitPrice || 0).toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right font-semibold">{(item.total || 0).toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           </div>
           
           <div className="flex justify-end">
              <div className="w-1/2 space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Subtotal</span>
                   <span>₹ {po.subtotal?.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between text-sm border-b pb-3">
                   <span className="text-muted-foreground">Estimated Tax</span>
                   <span>₹ {po.tax?.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                   <span className="font-bold text-lg">Grand Total</span>
                   <span className="text-2xl font-black text-primary">₹ {po.grandTotal?.toLocaleString('en-IN')}</span>
                 </div>
              </div>
           </div>
           
           <div className="border-t pt-6 text-sm text-muted-foreground">
              <h4 className="font-semibold text-foreground mb-2">Terms & Conditions</h4>
              <ul className="list-disc pl-5 space-y-1">
                 <li>Payment: As per agreed quotation terms.</li>
                 <li>All goods must be delivered along with the original tax invoice.</li>
                 <li>Standard warranty applicable as per SLA.</li>
              </ul>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
