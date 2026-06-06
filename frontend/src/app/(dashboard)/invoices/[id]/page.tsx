"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Printer, Download, CheckCircle, XCircle, ArrowLeft, Building2, MapPin, Calendar, CreditCard, Receipt, Building, Mail, Send } from "lucide-react";
import Link from "next/link";

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const invoiceId = params.id || "INV-2026-042";
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Invoice Details</h2>
        <Badge variant="outline" className="text-amber-500 border-amber-500 ml-auto bg-amber-500/10">Pending Payment</Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1"><Receipt className="w-4 h-4" /> {invoiceId}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Issued: 05 Jun 2026</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-destructive"><Calendar className="w-4 h-4" /> Due: 05 Jul 2026</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto flex-wrap">
          <Button variant="outline"><Printer className="w-4 h-4 mr-2" /> Print</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> PDF</Button>
          
          <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><Mail className="w-4 h-4 mr-2" /> Email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send Invoice Email</DialogTitle>
                <DialogDescription>
                  Send invoice {invoiceId} directly to the vendor or client.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="to">Recipient Email</Label>
                  <Input id="to" defaultValue="accounts@dell.in" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cc">CC</Label>
                  <Input id="cc" placeholder="finance@vendorbridge.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" defaultValue={`Invoice ${invoiceId} from VendorBridge`} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={4}
                    defaultValue={`Please find attached the invoice ${invoiceId} for PO-2026-089. Kindly process the payment before the due date.`} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsEmailModalOpen(false)}><Send className="w-4 h-4 mr-2" /> Send Email</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white"><CheckCircle className="w-4 h-4 mr-2" /> Mark Paid</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Building2 className="w-5 h-5" /> Billed To (Company)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h4 className="font-bold text-lg">VendorBridge Technologies</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2"><MapPin className="w-4 h-4" /> Cyber City, DLF Phase 2</p>
              <p className="text-sm text-muted-foreground pl-6">Gurugram, Haryana 122002</p>
              <p className="text-sm text-muted-foreground pl-6">GSTIN: 06AAACA1234A1Z5</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Building className="w-5 h-5" /> Vendor Details</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-1">
              <h4 className="font-bold text-lg text-primary">Dell India Pvt. Ltd.</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2"><MapPin className="w-4 h-4" /> Divyasree Greens, Inner Ring Rd</p>
              <p className="text-sm text-muted-foreground pl-6">Bengaluru, Karnataka 560071</p>
              <p className="text-sm text-muted-foreground pl-6">GSTIN: 29AABCD1234F1Z9</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
          <CardDescription>Items linked to Purchase Order <Link href="#" className="text-primary hover:underline">PO-2026-089</Link></CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Qty</TableHead>
                <TableHead className="w-[150px]">Unit Price</TableHead>
                <TableHead className="w-[150px]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Dell Latitude 5430 - Core i5, 16GB RAM</TableCell>
                <TableCell>50</TableCell>
                <TableCell>₹ 62,000.00</TableCell>
                <TableCell>₹ 31,00,000.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dell 24" USB-C Monitor</TableCell>
                <TableCell>50</TableCell>
                <TableCell>₹ 14,500.00</TableCell>
                <TableCell>₹ 7,25,000.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Wireless Keyboard & Mouse Combo</TableCell>
                <TableCell>50</TableCell>
                <TableCell>₹ 2,100.00</TableCell>
                <TableCell>₹ 1,05,000.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                   <div className="text-muted-foreground">Bank Name:</div>
                   <div className="font-medium">HDFC Bank Ltd.</div>
                   <div className="text-muted-foreground">Account Number:</div>
                   <div className="font-medium">50200012345678</div>
                   <div className="text-muted-foreground">IFSC Code:</div>
                   <div className="font-medium">HDFC0000001</div>
                   <div className="text-muted-foreground">Branch:</div>
                   <div className="font-medium">Koramangala, Bengaluru</div>
                </div>
                <div className="bg-muted p-3 rounded-lg border text-sm text-muted-foreground">
                   Please include invoice number <strong>{invoiceId}</strong> in your payment reference to ensure prompt processing.
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-md">
          <CardContent className="pt-6">
             <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹ 39,30,000.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount (5%)</span>
                  <span className="text-emerald-500">- ₹ 1,96,500.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxable Value</span>
                  <span className="font-medium">₹ 37,33,500.00</span>
                </div>
                <div className="border-t pt-4 mt-2">
                   <div className="flex justify-between text-sm mb-2">
                     <span className="text-muted-foreground">IGST (18%)</span>
                     <span className="font-medium">₹ 6,72,030.00</span>
                   </div>
                </div>
                <div className="border-t border-dashed pt-4 mt-2">
                   <div className="flex justify-between items-end">
                     <span className="font-semibold text-lg">Grand Total</span>
                     <span className="text-3xl font-bold text-primary">₹ 44,05,530.00</span>
                   </div>
                   <p className="text-xs text-right text-muted-foreground mt-1">Forty Four Lakh Five Thousand Five Hundred Thirty Rupees Only</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
         <h3 className="text-lg font-semibold mb-4">Payment Timeline</h3>
         <div className="flex flex-col sm:flex-row gap-4 justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted hidden sm:block -z-10"></div>
            
            <div className="bg-card border shadow-sm p-4 rounded-xl flex-1 text-center relative">
               <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2 border-4 border-background">
                 <CheckCircle className="w-4 h-4" />
               </div>
               <p className="font-medium text-sm">Invoice Submitted</p>
               <p className="text-xs text-muted-foreground">05 Jun 2026, 10:30 AM</p>
            </div>
            
            <div className="bg-card border shadow-sm p-4 rounded-xl flex-1 text-center relative">
               <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2 border-4 border-background">
                 <CheckCircle className="w-4 h-4" />
               </div>
               <p className="font-medium text-sm">Goods Received (GRN)</p>
               <p className="text-xs text-muted-foreground">06 Jun 2026, 02:15 PM</p>
            </div>

            <div className="bg-card border border-primary shadow-md p-4 rounded-xl flex-1 text-center relative ring-2 ring-primary/20">
               <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 border-4 border-background">
                 <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
               </div>
               <p className="font-medium text-sm">Pending Approval</p>
               <p className="text-xs text-muted-foreground">Finance Dept.</p>
            </div>

            <div className="bg-muted p-4 rounded-xl flex-1 text-center opacity-50">
               <div className="w-8 h-8 rounded-full bg-muted-foreground text-background flex items-center justify-center mx-auto mb-2 border-4 border-background">
                 <div className="w-2 h-2 rounded-full bg-current"></div>
               </div>
               <p className="font-medium text-sm">Payment Scheduled</p>
               <p className="text-xs text-muted-foreground">Awaiting Approval</p>
            </div>
         </div>
      </div>
    </div>
  );
}
