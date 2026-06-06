"use client";

import { useState, useEffect } from "react";
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
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(`/invoices/${invoiceId}`);
        setInvoice(res.data);
      } catch (err) {
        console.error("Failed to load invoice", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  if (loading) {
    return <div className="p-8 text-center animate-pulse">Loading invoice details...</div>;
  }

  if (!invoice) {
    return <div className="p-8 text-center text-muted-foreground">Invoice not found.</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Invoice Details</h2>
        <Badge variant="outline" className={invoice.status === "Paid" ? "text-emerald-500 border-emerald-500 bg-emerald-500/10" : "text-amber-500 border-amber-500 bg-amber-500/10"}>{invoice.status}</Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1"><Receipt className="w-4 h-4" /> {invoice.invoiceNumber}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Issued: {new Date(invoice.invoiceDate).toLocaleDateString()}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-destructive"><Calendar className="w-4 h-4" /> Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto flex-wrap">
          <Button variant="outline" onClick={async () => {
             // Handle print
             window.print();
          }}><Printer className="w-4 h-4 mr-2" /> Print</Button>
          <Button variant="outline" onClick={async () => {
             try {
                const res = await api.get(`/invoices/${invoice._id}/pdf`, { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Invoice-${invoice.invoiceNumber}.pdf`);
                document.body.appendChild(link);
                link.click();
             } catch (err) {
                toast({ title: "Error", description: "Could not download PDF", variant: "destructive" });
             }
          }}><Download className="w-4 h-4 mr-2" /> PDF</Button>
          
          <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Mail className="w-4 h-4 mr-2" /> Email
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send Invoice Email</DialogTitle>
                <DialogDescription>
                  Send invoice {invoice.invoiceNumber} directly to the vendor or client.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="to">Recipient Email</Label>
                  <Input id="to" defaultValue={invoice.vendor?.email || ""} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cc">CC</Label>
                  <Input id="cc" placeholder="finance@vendorbridge.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" defaultValue={`Invoice ${invoice.invoiceNumber} from VendorBridge`} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={4}
                    defaultValue={`Please find attached the invoice ${invoice.invoiceNumber} for ${invoice.poReference}. Kindly process the payment before the due date.`} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>Cancel</Button>
                <Button onClick={async () => {
                   try {
                     await api.post(`/invoices/${invoice._id}/send-email`, {
                       to: (document.getElementById('to') as HTMLInputElement).value,
                       subject: (document.getElementById('subject') as HTMLInputElement).value,
                       message: (document.getElementById('message') as HTMLTextAreaElement).value
                     });
                     toast({ title: "Success", description: "Email sent successfully." });
                     setIsEmailModalOpen(false);
                   } catch (err) {
                     toast({ title: "Error", description: "Failed to send email", variant: "destructive" });
                   }
                }}><Send className="w-4 h-4 mr-2" /> Send Email</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {invoice.status !== "Paid" && (
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={async () => {
              try {
                await api.put(`/invoices/${invoice._id}/status`, { status: 'Paid' });
                setInvoice({...invoice, status: 'Paid'});
                toast({ title: "Success", description: "Invoice marked as paid." });
              } catch (err) {
                toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
              }
            }}><CheckCircle className="w-4 h-4 mr-2" /> Mark Paid</Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Building2 className="w-5 h-5" /> Billed To (Company)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h4 className="font-bold text-lg">{invoice.billingDetails?.companyName || "VendorBridge Technologies"}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2"><MapPin className="w-4 h-4" /> {invoice.billingDetails?.address || "Cyber City, DLF Phase 2"}</p>
              <p className="text-sm text-muted-foreground pl-6">{invoice.billingDetails?.taxId ? `GSTIN: ${invoice.billingDetails.taxId}` : ""}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Building className="w-5 h-5" /> Vendor Details</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-1">
              <h4 className="font-bold text-lg text-primary">{invoice.vendor?.companyName}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2"><MapPin className="w-4 h-4" /> {invoice.vendor?.address}</p>
              <p className="text-sm text-muted-foreground pl-6">GSTIN: {invoice.vendor?.taxId}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
          <CardDescription>Items linked to Purchase Order <Link href="#" className="text-primary hover:underline">{invoice.poReference}</Link></CardDescription>
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
              {invoice.items?.map((item: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹ {(item.unitPrice || 0).toLocaleString()}</TableCell>
                  <TableCell>₹ {(item.total || (item.quantity * item.unitPrice) || 0).toLocaleString()}</TableCell>
                </TableRow>
              ))}
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
                <div className="bg-muted p-3 rounded-lg border text-sm text-muted-foreground">
                   Please include invoice number <strong>{invoice.invoiceNumber}</strong> in your payment reference to ensure prompt processing.
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-md">
          <CardContent className="pt-6">
             <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹ {(invoice.subtotal || 0).toLocaleString()}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-emerald-500">- ₹ {(invoice.discount || 0).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-4 mt-2">
                   <div className="flex justify-between text-sm mb-2">
                     <span className="text-muted-foreground">Tax</span>
                     <span className="font-medium">₹ {(invoice.tax || 0).toLocaleString()}</span>
                   </div>
                </div>
                <div className="border-t border-dashed pt-4 mt-2">
                   <div className="flex justify-between items-end">
                     <span className="font-semibold text-lg">Grand Total</span>
                     <span className="text-3xl font-bold text-primary">₹ {(invoice.grandTotal || 0).toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
