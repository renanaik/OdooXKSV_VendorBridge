"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, Clock, AlertTriangle, FileText, Send } from "lucide-react";

export default function ApprovalsPage() {
  const approvalPipeline = [
    { level: "Submitted", name: "Rahul Desai", role: "Procurement Officer", status: "completed", time: "12 May, 10:00 AM", comment: "PO created based on AI recommendation." },
    { level: "L1 Review", name: "Priya Sharma", role: "Procurement Manager", status: "completed", time: "12 May, 14:30 PM", comment: "Looks good. Vendor rating is excellent." },
    { level: "Finance Approval", name: "Ankit Gupta", role: "CFO", status: "current", time: "Pending", comment: "" },
    { level: "Final Approval", name: "Rajesh Sharma", role: "CEO", status: "pending", time: "-", comment: "" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Approval Workflow</h2>
          <p className="text-muted-foreground mt-1">Enterprise approval pipeline for PO-2026-0045.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle>PO-2026-0045 Summary</CardTitle>
             </CardHeader>
             <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
                <div><span className="text-muted-foreground">Vendor:</span> <span className="font-semibold">Reliance Retail Ltd</span></div>
                <div><span className="text-muted-foreground">Total Value:</span> <span className="font-bold text-lg text-primary">₹14,50,000</span></div>
                <div><span className="text-muted-foreground">Items:</span> 500x Dell Latitude</div>
                <div><span className="text-muted-foreground">Department:</span> IT Infrastructure</div>
                <div className="sm:col-span-2">
                  <Button variant="outline" size="sm" className="mt-2"><FileText className="w-4 h-4 mr-2" /> View Original PO Document</Button>
                </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle>Approval Pipeline</CardTitle>
               <CardDescription>Multi-tier workflow progress.</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="relative border-l border-muted-foreground/30 ml-4 space-y-8 py-2">
                  {approvalPipeline.map((step, i) => (
                    <div key={i} className="relative pl-8">
                       <div className="absolute -left-3 top-1 bg-background rounded-full">
                          {step.status === "completed" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                          {step.status === "current" && <Clock className="w-6 h-6 text-amber-500 fill-amber-500/20" />}
                          {step.status === "pending" && <Circle className="w-6 h-6 text-muted-foreground" />}
                       </div>
                       
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {step.level}
                              {step.status === "current" && <Badge className="bg-amber-500 hover:bg-amber-600">Action Required</Badge>}
                            </h4>
                            <p className="text-sm text-muted-foreground">{step.name} • {step.role}</p>
                          </div>
                          <div className="text-sm text-muted-foreground whitespace-nowrap">
                            {step.time}
                          </div>
                       </div>
                       
                       {step.comment && (
                         <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm italic border-l-4 border-primary">
                            "{step.comment}"
                         </div>
                       )}
                    </div>
                  ))}
               </div>
             </CardContent>
           </Card>
        </div>

        <div>
           <Card className="sticky top-6 border-primary/50 shadow-md">
             <CardHeader className="bg-primary/5 border-b pb-4">
               <CardTitle>Your Action</CardTitle>
               <CardDescription>You are logged in as Ankit Gupta (CFO).</CardDescription>
             </CardHeader>
             <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
                   <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                   <p className="text-sm text-amber-700 dark:text-amber-500">This PO exceeds the ₹10L threshold and requires executive finance clearance.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remarks</label>
                  <Textarea placeholder="Add justification or comments..." className="min-h-[100px]" />
                </div>
                
                <div className="space-y-2 pt-4">
                   <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"><CheckCircle2 className="w-4 h-4 mr-2" /> Approve Request</Button>
                   <Button variant="outline" className="w-full"><Send className="w-4 h-4 mr-2" /> Request Changes</Button>
                   <Button variant="destructive" className="w-full">Reject</Button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
