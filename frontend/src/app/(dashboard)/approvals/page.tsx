"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, Clock, AlertTriangle, FileText, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

export default function ApprovalsPage() {
  const { toast } = useToast();
  const [approvals, setApprovals] = useState<any[]>([]);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const res = await api.get("/approvals");
      setApprovals(res.data);
      if (res.data.length > 0 && !selectedApproval) {
        setSelectedApproval(res.data[0]);
      }
    } catch (error) {
      console.error("Failed to load approvals", error);
    }
  };

  const handleAction = async (status: string) => {
    if (!selectedApproval) return;
    setLoading(true);
    try {
      await api.put(`/approvals/${selectedApproval._id}`, { status, remarks });
      toast({ title: "Success", description: `Approval ${status.toLowerCase()} successfully.` });
      setRemarks("");
      fetchApprovals();
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to update approval", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Approval Workflow</h2>
          <p className="text-muted-foreground mt-1">Enterprise approval pipeline and pending requests.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-4 max-h-[800px] overflow-y-auto">
          <h3 className="font-semibold text-lg">Pending Requests</h3>
          {approvals.length === 0 ? (
            <div className="text-muted-foreground">No pending approvals found.</div>
          ) : (
            approvals.map((app) => (
              <Card 
                key={app._id} 
                className={`cursor-pointer transition-colors ${selectedApproval?._id === app._id ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/50'}`}
                onClick={() => setSelectedApproval(app)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={app.status === 'Pending' ? 'secondary' : app.status === 'Approved' ? 'default' : 'destructive'}>
                      {app.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold">{app.documentType} Approval</h4>
                  <p className="text-sm text-muted-foreground mt-1">Level: {app.approvalLevel}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          {selectedApproval ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedApproval.documentType} Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
                   <div><span className="text-muted-foreground">Document ID:</span> <span className="font-semibold">{selectedApproval.documentId}</span></div>
                   <div><span className="text-muted-foreground">Type:</span> <span className="font-semibold">{selectedApproval.documentType}</span></div>
                   <div><span className="text-muted-foreground">Level:</span> {selectedApproval.approvalLevel}</div>
                   <div><span className="text-muted-foreground">Status:</span> {selectedApproval.status}</div>
                   <div className="sm:col-span-2">
                     <Button variant="outline" size="sm" className="mt-2"><FileText className="w-4 h-4 mr-2" /> View Original Document</Button>
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
                     <div className="relative pl-8">
                        <div className="absolute -left-3 top-1 bg-background rounded-full">
                           {selectedApproval.status === "Approved" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                           {selectedApproval.status === "Pending" && <Clock className="w-6 h-6 text-amber-500 fill-amber-500/20" />}
                           {selectedApproval.status === "Rejected" && <AlertTriangle className="w-6 h-6 text-destructive" />}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                           <div>
                             <h4 className="font-semibold flex items-center gap-2">
                               {selectedApproval.approvalLevel}
                               {selectedApproval.status === "Pending" && <Badge className="bg-amber-500 hover:bg-amber-600">Action Required</Badge>}
                             </h4>
                             <p className="text-sm text-muted-foreground">{selectedApproval.approver?.name || 'Unknown Approver'} • {selectedApproval.approver?.role || 'Approver'}</p>
                           </div>
                           <div className="text-sm text-muted-foreground whitespace-nowrap">
                             {selectedApproval.actionDate ? new Date(selectedApproval.actionDate).toLocaleString() : 'Pending'}
                           </div>
                        </div>
                        
                        {selectedApproval.remarks && (
                          <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm italic border-l-4 border-primary">
                             "{selectedApproval.remarks}"
                          </div>
                        )}
                     </div>
                  </div>
                </CardContent>
              </Card>

              {selectedApproval.status === 'Pending' && (
                <Card className="border-primary/50 shadow-md">
                  <CardHeader className="bg-primary/5 border-b pb-4">
                    <CardTitle>Your Action</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                     <div className="space-y-2">
                       <label className="text-sm font-medium">Remarks</label>
                       <Textarea 
                         placeholder="Add justification or comments..." 
                         className="min-h-[100px]" 
                         value={remarks}
                         onChange={(e) => setRemarks(e.target.value)}
                       />
                     </div>
                     
                     <div className="flex gap-4 pt-4">
                        <Button 
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => handleAction('Approved')}
                          disabled={loading}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => handleAction('Rejected')}
                          disabled={loading}
                        >
                          Reject
                        </Button>
                     </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
              Select an approval request to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
