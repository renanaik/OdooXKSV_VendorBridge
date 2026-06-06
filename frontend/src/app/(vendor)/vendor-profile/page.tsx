import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, Briefcase, FileText, Lock, UploadCloud } from "lucide-react";

export default function VendorProfilePage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Organization Profile</h2>
          <p className="text-muted-foreground mt-1">Manage your company details, banking information, and compliance documents.</p>
        </div>
        <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-default">Status: Active</Badge>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mb-8">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5" /> Company Information</CardTitle>
              <CardDescription>Update your registered business details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Company Name</label>
                   <Input defaultValue="TechCorp IT Solutions" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Vendor Category</label>
                   <Input defaultValue="IT Hardware & Software" disabled />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Email Address</label>
                   <Input defaultValue="contact@techcorp.com" type="email" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Phone Number</label>
                   <Input defaultValue="+91 98765 43210" />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                   <label className="text-sm font-medium">Registered Address</label>
                   <Input defaultValue="Cyber City, DLF Phase 2, Gurugram, Haryana 122002" />
                 </div>
               </div>
               <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Changes</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> Banking Details</CardTitle>
              <CardDescription>Update the bank account used for invoice payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Bank Name</label>
                   <Input defaultValue="HDFC Bank Ltd." />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Account Holder Name</label>
                   <Input defaultValue="TechCorp IT Solutions" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Account Number</label>
                   <Input defaultValue="50200012345678" type="password" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">IFSC Code</label>
                   <Input defaultValue="HDFC0000001" />
                 </div>
               </div>
               <div className="flex justify-end gap-2">
                  <Button variant="outline">Discard</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Update Banking Info</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Compliance Documents</CardTitle>
              <CardDescription>Manage and update your uploaded certificates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-muted-foreground">GST Number</label>
                   <p className="font-semibold text-lg">06AAACA1234A1Z5</p>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-muted-foreground">PAN Number</label>
                   <p className="font-semibold text-lg">AAACA1234A</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                 {[
                   { title: "GST Certificate", status: "Verified" },
                   { title: "PAN Card Copy", status: "Verified" },
                   { title: "MSME Certificate", status: "Not Uploaded" },
                   { title: "Signed Vendor Agreement", status: "Pending Review" }
                 ].map((doc, idx) => (
                   <div key={idx} className="relative border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                         <FileText className="w-5 h-5 text-primary" />
                       </div>
                       <div>
                         <span className="font-medium block">{doc.title}</span>
                         <span className={`text-xs ${doc.status === 'Verified' ? 'text-emerald-500' : doc.status === 'Pending Review' ? 'text-amber-500' : 'text-muted-foreground'}`}>{doc.status}</span>
                       </div>
                     </div>
                     <div className="relative overflow-hidden cursor-pointer text-primary text-sm font-medium hover:underline">
                        Upload New
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" /> Security & Access</CardTitle>
              <CardDescription>Update your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="max-w-md space-y-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Current Password</label>
                   <Input type="password" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">New Password</label>
                   <Input type="password" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Confirm New Password</label>
                   <Input type="password" />
                 </div>
               </div>
               <div className="flex justify-start pt-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Change Password</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
