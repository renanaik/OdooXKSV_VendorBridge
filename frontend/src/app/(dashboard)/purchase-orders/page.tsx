"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import api from "@/lib/api";

export default function PurchaseOrdersPage() {
  const { toast } = useToast();
  const [pos, setPos] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPOs();
    fetchQuotations();
  }, []);

  const fetchPOs = async () => {
    try {
      const res = await api.get("/purchase-orders");
      setPos(res.data);
    } catch (err) {
      console.error("Failed to load POs", err);
    }
  };

  const fetchQuotations = async () => {
    try {
      const res = await api.get("/quotations");
      // filter only approved or accepted quotations to generate POs from
      const approved = res.data.filter((q: any) => q.status === "Accepted");
      setQuotations(approved);
    } catch (err) {
      console.error("Failed to load Quotations", err);
    }
  };

  const generatePO = async () => {
    if (!selectedQuotation) {
      toast({ title: "Validation Error", description: "Select a Quotation first", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const q = quotations.find((q) => q._id === selectedQuotation);
      const payload = {
        quotation: q._id,
        vendor: q.vendor._id,
        items: q.items.map((i: any) => ({
          itemName: i.itemName,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          tax: i.tax,
          total: i.total
        })),
        subtotal: q.subtotal,
        tax: q.tax,
        grandTotal: q.grandTotal,
        status: "Draft"
      };

      await api.post("/purchase-orders", payload);
      toast({ title: "Success", description: "Purchase Order generated successfully" });
      setOpen(false);
      fetchPOs();
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to generate PO", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Purchase Orders</h2>
          <p className="text-muted-foreground mt-1">Manage and track your purchase orders.</p>
        </div>
        <div className="flex gap-2">
           <Dialog open={open} onOpenChange={setOpen}>
             <DialogTrigger render={<Button />}>
                <Plus className="w-4 h-4 mr-2" /> Generate PO
             </DialogTrigger>
             <DialogContent>
               <DialogHeader>
                 <DialogTitle>Generate Purchase Order</DialogTitle>
               </DialogHeader>
               <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Accepted Quotation</label>
                    <Select value={selectedQuotation} onValueChange={(val) => setSelectedQuotation(val || "")}>
                      <SelectTrigger><SelectValue placeholder="Choose a quotation" /></SelectTrigger>
                      <SelectContent>
                        {quotations.length === 0 && <SelectItem value="none" disabled>No accepted quotations available</SelectItem>}
                        {quotations.map((q) => (
                          <SelectItem key={q._id} value={q._id}>{q.quotationNumber} - {q.vendor?.companyName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={generatePO} disabled={loading}>
                    {loading ? "Generating..." : "Generate Purchase Order"}
                  </Button>
               </div>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Purchase Orders List</CardTitle>
        </CardHeader>
        <CardContent>
           {pos.length === 0 ? (
             <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">
                No purchase orders found. Click "Generate PO" to create one.
             </div>
           ) : (
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>PO Number</TableHead>
                   <TableHead>Vendor</TableHead>
                   <TableHead>Date</TableHead>
                   <TableHead>Amount (₹)</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {pos.map((po) => (
                   <TableRow key={po._id}>
                     <TableCell className="font-medium">{po.poNumber}</TableCell>
                     <TableCell>{po.vendor?.companyName}</TableCell>
                     <TableCell>{new Date(po.createdAt).toLocaleDateString()}</TableCell>
                     <TableCell>{po.grandTotal?.toLocaleString('en-IN')}</TableCell>
                     <TableCell>
                       <Badge variant={po.status === 'Draft' ? 'secondary' : 'default'}>{po.status}</Badge>
                     </TableCell>
                     <TableCell className="text-right">
                       <Button variant="ghost" size="sm" onClick={() => window.location.href = `/purchase-orders/${po._id}`}>
                         <Eye className="w-4 h-4 mr-2" /> View
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
