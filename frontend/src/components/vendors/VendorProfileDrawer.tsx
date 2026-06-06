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
            <SheetTitle className="text-2xl">{vendor.companyName}</SheetTitle>
            <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
              {vendor.status}
            </Badge>
          </div>
          <SheetDescription className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {vendor.category} Supplier • ID: {vendor.vendorCode || vendor._id}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 mb-6 space-x-6">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0">Overview</TabsTrigger>
            <TabsTrigger value="compliance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0">Compliance & Tax</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-0">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-4">
            <div className="group border rounded-xl p-5 hover:border-primary/50 transition-colors bg-gradient-to-br from-muted/30 to-muted/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                 <div className="p-2 bg-primary/10 rounded-md"><MapPin className="h-4 w-4" /></div>
                 Address Information
              </h3>
              <div className="space-y-1.5 text-sm text-muted-foreground ml-10">
                <p className="text-foreground font-medium">Corporate Office, Building No. 45</p>
                <p>Bandra Kurla Complex</p>
                <p>Mumbai, Maharashtra 400051, India</p>
              </div>
            </div>
            
            <div className="group border rounded-xl p-5 hover:border-primary/50 transition-colors bg-gradient-to-br from-muted/30 to-muted/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                 <div className="p-2 bg-primary/10 rounded-md"><Phone className="h-4 w-4" /></div>
                 Contact Person
              </h3>
              <div className="ml-10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Primary Contact</p>
                <p className="font-bold text-base mb-3">Anil Ambani</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-background/50 p-2 rounded-lg border border-border/50 w-fit">
                    <Phone className="h-4 w-4 text-primary" /> +91 98765 43210
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-background/50 p-2 rounded-lg border border-border/50 w-fit">
                    <Mail className="h-4 w-4 text-primary" /> anil@example.com
                  </div>
                </div>
              </div>
            </div>

            <div className="group border rounded-xl p-5 hover:border-primary/50 transition-colors bg-gradient-to-br from-muted/30 to-muted/10">
               <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                 <div className="p-2 bg-primary/10 rounded-md"><Landmark className="h-4 w-4" /></div>
                 Bank Details
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
                 <div className="space-y-1">
                   <p className="text-xs text-muted-foreground">Bank Name</p>
                   <p className="font-medium text-sm bg-background/50 p-2 rounded-md border border-border/50">HDFC Bank Ltd.</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xs text-muted-foreground">Account Name</p>
                   <p className="font-medium text-sm bg-background/50 p-2 rounded-md border border-border/50">{vendor.companyName}</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xs text-muted-foreground">Account No</p>
                   <p className="font-medium text-sm font-mono tracking-wider bg-background/50 p-2 rounded-md border border-border/50">502000XXXXXX12</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xs text-muted-foreground">IFSC Code</p>
                   <p className="font-medium text-sm font-mono tracking-wider bg-background/50 p-2 rounded-md border border-border/50">HDFC0001234</p>
                 </div>
               </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6 mt-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="border border-border/50 rounded-xl p-5 bg-gradient-to-br from-muted/20 to-transparent relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-20"><FileCheck2 className="w-12 h-12" /></div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">GST Identification</p>
                   <p className="text-lg font-bold font-mono tracking-wider mb-3">{vendor.gstNumber}</p>
                   <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10"><FileCheck2 className="w-3 h-3 mr-1.5" /> Verified Active</Badge>
                </div>
                <div className="border border-border/50 rounded-xl p-5 bg-gradient-to-br from-muted/20 to-transparent relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-20"><FileCheck2 className="w-12 h-12" /></div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">PAN Number</p>
                   <p className="text-lg font-bold font-mono tracking-wider mb-3">{vendor.panNumber || vendor.gstNumber?.substring(2, 12)}</p>
                   <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10"><FileCheck2 className="w-3 h-3 mr-1.5" /> Verified Active</Badge>
                </div>
             </div>

             <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4 text-primary">Compliance Documents</h3>
                <div className="space-y-3">
                   {['GST Certificate.pdf', 'Cancelled Cheque.jpg', 'Company Incorporation.pdf'].map(doc => (
                      <div key={doc} className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-background hover:border-primary/50 cursor-pointer transition-all hover:shadow-sm group">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-primary/10 rounded-md text-primary group-hover:scale-110 transition-transform"><FileText className="h-4 w-4" /></div>
                           <span className="text-sm font-medium">{doc}</span>
                         </div>
                         <Button variant="ghost" size="sm" className="h-8 text-xs">Download</Button>
                      </div>
                   ))}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-4">
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-card to-muted/20 border border-border/50 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                   <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
                   <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-3">Vendor Rating</span>
                   <div className="text-5xl font-black text-primary mb-2">{vendor.rating ? vendor.rating : 'N/A'}</div>
                   {vendor.rating ? (
                     <div className="flex text-amber-500 gap-1 text-sm">
                       {'★'.repeat(Math.floor(vendor.rating))}{'☆'.repeat(5 - Math.floor(vendor.rating))}
                     </div>
                   ) : (
                     <Badge variant="secondary">New Vendor</Badge>
                   )}
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                   <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
                   <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wider font-bold mb-3">On-Time Delivery</span>
                   <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400 mb-2">96%</div>
                   <div className="text-xs font-medium text-emerald-600/80 dark:text-emerald-400/80 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full"><TrendingUp className="h-3 w-3" /> +2% this year</div>
                </div>
                <div className="bg-card border border-border/50 shadow-sm rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                   <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">Total POs</span>
                   <div className="text-2xl font-bold">124</div>
                </div>
                <div className="bg-card border border-border/50 shadow-sm rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                   <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">Total Value</span>
                   <div className="text-2xl font-bold">₹8.5M</div>
                </div>
             </div>

             <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary">Recent Purchase History</h3>
                  <Button variant="link" size="sm" className="h-auto p-0">View All</Button>
                </div>
                <div className="border border-border/50 rounded-xl overflow-hidden bg-card">
                   {[
                     { po: 'PO-2026-045', date: '12 May 2026', amount: '₹1,50,000', status: 'Delivered' },
                     { po: 'PO-2026-021', date: '04 Apr 2026', amount: '₹85,000', status: 'Delivered' },
                     { po: 'PO-2026-009', date: '15 Feb 2026', amount: '₹2,10,000', status: 'Paid' },
                   ].map((hist, i) => (
                      <div key={hist.po} className={`flex items-center justify-between p-4 ${i !== 2 ? 'border-b border-border/50' : ''} hover:bg-muted/30 transition-colors`}>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                               <FileText className="w-4 h-4" />
                            </div>
                            <div>
                               <p className="text-sm font-bold">{hist.po}</p>
                               <p className="text-xs text-muted-foreground">{hist.date}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-bold">{hist.amount}</p>
                            <Badge variant="outline" className="text-[10px] mt-1 bg-background">{hist.status}</Badge>
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
