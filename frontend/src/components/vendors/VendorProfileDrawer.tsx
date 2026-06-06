"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Building2, MapPin, Landmark, Phone, Mail, FileCheck2, TrendingUp } from "lucide-react";

interface VendorDrawerProps {
  vendor: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VendorProfileDrawer({ vendor, open, onOpenChange }: VendorDrawerProps) {
  if (!vendor) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl">{vendor.name}</SheetTitle>
            <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
              {vendor.status}
            </Badge>
          </div>
          <SheetDescription className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {vendor.category} Supplier • ID: {vendor.id}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 mb-6 space-x-6">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0">Overview</TabsTrigger>
            <TabsTrigger value="compliance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0">Compliance & Tax</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> Address Information</h3>
              <div className="bg-muted/50 p-4 rounded-lg space-y-1 text-sm">
                <p>Corporate Office, Building No. 45</p>
                <p>Bandra Kurla Complex</p>
                <p>Mumbai, Maharashtra 400051</p>
                <p>India</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> Contact Person</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Primary Contact</p>
                  <p className="font-medium text-sm">Anil Ambani</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <Phone className="h-3 w-3" /> +91 98765 43210
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Mail className="h-3 w-3" /> anil@example.com
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
               <h3 className="font-semibold mb-3 flex items-center gap-2"><Landmark className="h-4 w-4 text-muted-foreground" /> Bank Details</h3>
               <div className="grid grid-cols-2 gap-y-2 text-sm">
                 <div className="text-muted-foreground">Bank Name:</div><div>HDFC Bank Ltd.</div>
                 <div className="text-muted-foreground">Account Name:</div><div>{vendor.name}</div>
                 <div className="text-muted-foreground">Account No:</div><div>502000XXXXXX12</div>
                 <div className="text-muted-foreground">IFSC Code:</div><div>HDFC0001234</div>
               </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-muted/20">
                   <p className="text-xs text-muted-foreground mb-1">GST Identification Number</p>
                   <p className="font-medium font-mono">{vendor.gst}</p>
                   <Badge variant="outline" className="mt-2 text-emerald-500 border-emerald-500 bg-emerald-500/10"><FileCheck2 className="w-3 h-3 mr-1" /> Verified</Badge>
                </div>
                <div className="border rounded-lg p-4 bg-muted/20">
                   <p className="text-xs text-muted-foreground mb-1">PAN Number</p>
                   <p className="font-medium font-mono">{vendor.gst.substring(2, 12)}</p>
                   <Badge variant="outline" className="mt-2 text-emerald-500 border-emerald-500 bg-emerald-500/10"><FileCheck2 className="w-3 h-3 mr-1" /> Verified</Badge>
                </div>
             </div>

             <div>
                <h3 className="font-semibold mb-3">Documents</h3>
                <div className="space-y-2">
                   {['GST Certificate.pdf', 'Cancelled Cheque.jpg', 'Company Incorporation.pdf'].map(doc => (
                      <div key={doc} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                         <div className="flex items-center gap-3">
                           <FileText className="h-5 w-5 text-primary" />
                           <span className="text-sm font-medium">{doc}</span>
                         </div>
                         <span className="text-xs text-muted-foreground">Download</span>
                      </div>
                   ))}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-card border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                   <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Vendor Rating</span>
                   <div className="text-4xl font-bold text-primary">{vendor.rating}</div>
                   <div className="flex text-amber-500 mt-2">
                     {'★'.repeat(Math.floor(vendor.rating))}{'☆'.repeat(5 - Math.floor(vendor.rating))}
                   </div>
                </div>
                <div className="bg-card border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                   <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">On-Time Delivery</span>
                   <div className="text-4xl font-bold text-emerald-500">96%</div>
                   <div className="text-xs mt-2 text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +2% this year</div>
                </div>
                <div className="bg-card border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                   <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Total POs</span>
                   <div className="text-3xl font-bold">124</div>
                </div>
                <div className="bg-card border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                   <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Total Value</span>
                   <div className="text-3xl font-bold">₹8.5M</div>
                </div>
             </div>

             <div>
                <h3 className="font-semibold mb-3">Purchase History</h3>
                <div className="space-y-4">
                   {[
                     { po: 'PO-2026-045', date: '12 May 2026', amount: '₹1,50,000', status: 'Delivered' },
                     { po: 'PO-2026-021', date: '04 Apr 2026', amount: '₹85,000', status: 'Delivered' },
                     { po: 'PO-2026-009', date: '15 Feb 2026', amount: '₹2,10,000', status: 'Paid' },
                   ].map(hist => (
                      <div key={hist.po} className="flex items-center justify-between border-b pb-2">
                         <div>
                            <p className="text-sm font-medium">{hist.po}</p>
                            <p className="text-xs text-muted-foreground">{hist.date}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-medium">{hist.amount}</p>
                            <Badge variant="outline" className="text-[10px] mt-1">{hist.status}</Badge>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-6 border-t flex items-center gap-3 w-full justify-end">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10">Block Vendor</Button>
          <Button variant="secondary">Request Update</Button>
          <Button>Approve Vendor</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
