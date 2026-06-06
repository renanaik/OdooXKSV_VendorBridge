"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, Receipt, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import api from "@/lib/api";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    } finally {
      setLoading(false);
    }
  };

  const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((acc, curr) => acc + curr.grandTotal, 0);
  const overdueAmount = invoices.filter(i => i.status === 'Overdue').reduce((acc, curr) => acc + curr.grandTotal, 0);
  const paidAmount = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.grandTotal, 0);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoice Management</h2>
          <p className="text-muted-foreground mt-1">Track and process vendor payments.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">₹{pendingAmount.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">{invoices.filter(i => i.status === 'Pending').length} Invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹{overdueAmount.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">{invoices.filter(i => i.status === 'Overdue').length} Invoices past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">₹{paidAmount.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">{invoices.filter(i => i.status === 'Paid').length} Invoices settled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
           {loading ? (
             <div className="text-center py-8">Loading invoices...</div>
           ) : invoices.length === 0 ? (
             <div className="text-center py-8 text-muted-foreground">No invoices found.</div>
           ) : (
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Invoice #</TableHead>
                   <TableHead>PO Reference</TableHead>
                   <TableHead>Vendor</TableHead>
                   <TableHead>Invoice Date</TableHead>
                   <TableHead>Due Date</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="text-right">Amount (₹)</TableHead>
                   <TableHead className="text-center">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {invoices.map(inv => (
                   <TableRow key={inv._id}>
                     <TableCell className="font-bold">{inv.invoiceNumber}</TableCell>
                     <TableCell className="text-muted-foreground">{inv.purchaseOrder?.poNumber || 'N/A'}</TableCell>
                     <TableCell>{inv.vendor?.companyName}</TableCell>
                     <TableCell>{new Date(inv.invoiceDate).toLocaleDateString()}</TableCell>
                     <TableCell className={inv.status === 'Overdue' ? "text-destructive font-medium" : ""}>
                       {new Date(inv.dueDate).toLocaleDateString()}
                     </TableCell>
                     <TableCell>
                        <Badge variant={inv.status === 'Paid' ? 'default' : inv.status === 'Pending' ? 'secondary' : 'destructive'}
                               className={inv.status === 'Paid' ? 'bg-emerald-500 hover:bg-emerald-600' : inv.status === 'Pending' ? 'bg-amber-500/20 text-amber-600 hover:bg-amber-500/30' : ''}
                        >
                           {inv.status}
                        </Badge>
                     </TableCell>
                     <TableCell className="text-right font-semibold">{(inv.grandTotal || 0).toLocaleString('en-IN')}</TableCell>
                     <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => window.location.href = `/invoices/${inv._id}`}>
                          <Eye className="h-4 w-4 mr-2" /> View
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
