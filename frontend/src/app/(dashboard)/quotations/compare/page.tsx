"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle2, TrendingDown, Clock, ShieldAlert, Award, IndianRupee, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

function CompareQuotationsContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [rfqId, setRfqId] = useState<string | null>(searchParams.get("rfqId"));
  const [allRfqs, setAllRfqs] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPO, setProcessingPO] = useState(false);

  // Fetch RFQs list once on mount
  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const rfqsRes = await api.get('/rfqs');
        setAllRfqs(rfqsRes.data || []);
        
        // Auto-select first RFQ if none provided in URL
        if (!rfqId && rfqsRes.data?.length > 0) {
          setRfqId(rfqsRes.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to load RFQs", err);
      }
    };
    fetchRfqs();
  }, []); // Only run once

  useEffect(() => {
    const fetchComparison = async () => {
      if (!rfqId) return;
      
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/quotations/compare/${rfqId}`);
        setComparisonData(res.data);
      } catch (err: any) {
        // Silently handle error without triggering Next.js dev overlay
        setError("Failed to load quotation comparison data for this RFQ.");
        setComparisonData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComparison();
  }, [rfqId]);

  // Handle Generate PO Action
  const handleGeneratePO = async (vendorToApprove?: any) => {
    const q = vendorToApprove || recommendedVendor;
    if (!q) {
      toast({ title: "No Vendor Selected", description: "Please select a vendor to generate PO", variant: "destructive" });
      return;
    }

    try {
      setProcessingPO(true);
      
      // 1. Mark quotation as Accepted
      await api.put(`/quotations/${q._id}`, { status: "Accepted" });
      
      // 2. Generate the Purchase Order payload
      const payload = {
        quotation: q._id,
        vendor: q.vendor?._id || q.vendor,
        items: q.items,
        subtotal: q.subtotal,
        tax: q.tax,
        grandTotal: q.grandTotal,
        status: "Draft"
      };
      
      await api.post("/purchase-orders", payload);
      
      toast({ title: "Success", description: "Quotation Approved & PO Created Successfully!" });
      router.push("/purchase-orders");
    } catch (err: any) {
      console.error("PO Creation failed:", err);
      toast({ title: "Error", description: err.response?.data?.message || "Failed to create Purchase Order", variant: "destructive" });
    } finally {
      setProcessingPO(false);
    }
  };

  // Handle RFQ Selection Change
  const handleRfqChange = (newRfqId: string) => {
    setRfqId(newRfqId);
    router.push(`/quotations/compare?rfqId=${newRfqId}`);
  };

  const recommendedVendor = comparisonData.length > 0 ? comparisonData[0] : null;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Quotation Comparison</h2>
          <p className="text-muted-foreground mt-1">Intelligent evaluation matrix</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[300px]">
             <Select value={rfqId || ""} onValueChange={handleRfqChange}>
               <SelectTrigger>
                 <SelectValue placeholder="Select RFQ to Compare" />
               </SelectTrigger>
               <SelectContent>
                 {allRfqs.map((r: any) => (
                   <SelectItem key={r._id} value={r._id}>{r.rfqNumber} - {r.title}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
          </div>
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600" 
            onClick={() => handleGeneratePO()}
            disabled={processingPO || comparisonData.length === 0}
          >
            {processingPO ? "Processing..." : "Generate PO for Selected Vendor"}
          </Button>
        </div>
      </div>

      {loading && <div className="p-8 text-center animate-pulse">Running AI scoring engine...</div>}
      
      {!loading && (error || comparisonData.length === 0) && (
        <div className="p-8 text-center text-muted-foreground bg-muted/20 border border-dashed rounded-xl">
           {error || "No quotations found for this RFQ to compare. Please select another RFQ."}
        </div>
      )}

      {!loading && recommendedVendor && (
        <Card className="border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4">
             <Badge className="bg-emerald-500 hover:bg-emerald-600">Top Choice</Badge>
          </div>
          <CardContent className="p-6 md:p-8">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                   <div className="flex items-center gap-2">
                     <Sparkles className="w-6 h-6 text-emerald-500" />
                     <h3 className="text-2xl font-bold">AI Recommendation: {recommendedVendor.vendor?.companyName}</h3>
                   </div>
                   <p className="text-muted-foreground">
                     Based on our multi-factor Procurement Score (Price 50%, Rating 20%, Delivery 15%, Historical 10%, Risk 5%), 
                     <span className="font-semibold text-foreground"> {recommendedVendor.vendor?.companyName} </span> 
                     provides the best overall value.
                   </p>
                   
                   <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-background p-2 px-4 rounded-full border shadow-sm">
                         <Award className="w-4 h-4 text-emerald-500" />
                         <span className="text-sm font-medium">Confidence Score: {recommendedVendor.score}%</span>
                      </div>
                   </div>
                </div>
                
                <div className="w-48 h-48 shrink-0 rounded-full border-8 border-background bg-card flex flex-col items-center justify-center shadow-inner relative">
                   <svg viewBox="0 0 192 192" className="absolute inset-0 w-full h-full transform -rotate-90">
                     <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                     <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${2 * Math.PI * 88}`} strokeDashoffset={`${2 * Math.PI * 88 * (1 - recommendedVendor.score / 100)}`} className="text-emerald-500 transition-all duration-1000" />
                   </svg>
                   <span className="text-4xl font-extrabold text-primary">{recommendedVendor.score}</span>
                   <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Procurement Score</span>
                </div>
             </div>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto border rounded-xl bg-card shadow-sm">
         <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
               <tr>
                  <th className="p-4 font-medium">Evaluation Criteria</th>
                  {comparisonData.map((q, i) => (
                    <th key={q._id} className="p-4 font-semibold text-foreground text-center border-l w-1/3">
                      <div className="flex flex-col items-center gap-2">
                        {q.vendor?.companyName}
                        {i === 0 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      </div>
                    </th>
                  ))}
               </tr>
            </thead>
            <tbody className="divide-y">
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><IndianRupee className="w-4 h-4 text-muted-foreground" /> Total Price</td>
                  {comparisonData.map((q, i) => (
                    <td key={q._id} className={cn("p-4 text-center border-l font-bold", i === 0 ? "text-emerald-500 text-lg" : "")}>
                       ₹ {(q.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> Delivery Time</td>
                  {comparisonData.map((q, i) => (
                    <td key={q._id} className={cn("p-4 text-center border-l", i === 0 ? "text-emerald-500 font-bold" : "")}>
                       {q.deliveryDays} Days
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><Award className="w-4 h-4 text-muted-foreground" /> Vendor Rating</td>
                  {comparisonData.map((q) => (
                    <td key={q._id} className="p-4 text-center border-l">
                       <div className="flex items-center justify-center gap-1">
                          <span className="text-amber-500 font-bold">{q.vendor?.rating || 4.5}</span>
                          <span className="text-amber-500 text-xs">★</span>
                       </div>
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" /> Payment Terms</td>
                  {comparisonData.map((q) => (
                    <td key={q._id} className="p-4 text-center border-l text-muted-foreground">
                       {q.paymentTerms}
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-muted-foreground" /> Warranty</td>
                  {comparisonData.map((q, i) => (
                    <td key={q._id} className="p-4 text-center border-l text-muted-foreground">
                       {q.warranty}
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-muted-foreground" /> Risk Score</td>
                  {comparisonData.map((q, i) => (
                    <td key={q._id} className="p-4 text-center border-l">
                       <Badge variant={q.score > 90 ? "outline" : "secondary"} className={q.score > 90 ? "text-emerald-500 border-emerald-500" : ""}>
                         {q.score > 90 ? "Low Risk" : "Medium Risk"}
                       </Badge>
                    </td>
                  ))}
               </tr>
            </tbody>
            <tfoot className="bg-muted/20 border-t">
               <tr>
                  <td className="p-4 font-medium">Final Action</td>
                  {comparisonData.map((q, i) => (
                    <td key={q._id} className="p-4 text-center border-l">
                       <Button 
                         variant={i === 0 ? "default" : "outline"} 
                         className={cn("w-full", i === 0 ? "bg-emerald-500 hover:bg-emerald-600" : "")}
                         onClick={() => handleGeneratePO(q)}
                         disabled={processingPO}
                       >
                         {i === 0 ? (processingPO ? "Processing..." : "Approve & Create PO") : "Select Alternative"}
                       </Button>
                    </td>
                  ))}
               </tr>
            </tfoot>
         </table>
      </div>
    </div>
  );
}

export default function CompareQuotationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading AI Compare Module...</div>}>
      <CompareQuotationsContent />
    </Suspense>
  );
}
