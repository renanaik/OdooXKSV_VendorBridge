"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, Receipt } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function InvoicesPage() {
  const invoices = [
    { id: "INV-2026-001", po: "PO-2026-0045", vendor: "Reliance Retail Ltd", date: "26 May 2026", due: "25 Jun 2026", amount: "₹4,31,58,500", status: "Pending" },
    { id: "INV-2026-002", po: "PO-2026-0032", vendor: "Tata Consultancy Services", date: "15 May 2026", due: "14 Jun 2026", amount: "₹8,50,000", status: "Paid" },
    { id: "INV-2026-003", po: "PO-2026-0021", vendor: "Wipro Enterprises", date: "02 Apr 2026", due: "02 May 2026", amount: "₹1,25,000", status: "Overdue" },
  ];

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
            <div className="text-2xl font-bold text-amber-500">₹4,31,58,500</div>
            <p className="text-xs text-muted-foreground">1 Invoice due next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹1,25,000</div>
            <p className="text-xs text-muted-foreground">1 Invoice past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">₹8,50,000</div>
            <p className="text-xs text-muted-foreground">2 Invoices settled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
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
                 <TableRow key={inv.id}>
                   <TableCell className="font-bold">{inv.id}</TableCell>
                   <TableCell className="text-muted-foreground">{inv.po}</TableCell>
                   <TableCell>{inv.vendor}</TableCell>
                   <TableCell>{inv.date}</TableCell>
                   <TableCell className={inv.status === 'Overdue' ? "text-destructive font-medium" : ""}>{inv.due}</TableCell>
                   <TableCell>
                      <Badge variant={inv.status === 'Paid' ? 'default' : inv.status === 'Pending' ? 'secondary' : 'destructive'}
                             className={inv.status === 'Paid' ? 'bg-emerald-500 hover:bg-emerald-600' : inv.status === 'Pending' ? 'bg-amber-500/20 text-amber-600 hover:bg-amber-500/30' : ''}
                      >
                         {inv.status}
                      </Badge>
                   </TableCell>
                   <TableCell className="text-right font-semibold">{inv.amount}</TableCell>
                   <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                         <Button variant="ghost" size="icon" title="Download PDF"><Download className="h-4 w-4" /></Button>
                         {inv.status !== 'Paid' && <Button size="sm" variant={inv.status === 'Overdue' ? 'destructive' : 'default'}>Mark Paid</Button>}
                      </div>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
        </CardContent>
      </Card>
    </div>
  );
}
