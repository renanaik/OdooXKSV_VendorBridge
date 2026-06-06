"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2, TrendingDown, Clock, ShieldAlert, Award, IndianRupee, FileText } from "lucide-react";
import { QuotationComparisonData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CompareQuotationsPage() {
  const recommendedVendor = QuotationComparisonData.find(q => q.recommended);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Quotation Comparison</h2>
          <p className="text-muted-foreground mt-1">Intelligent evaluation matrix for RFQ-2026-001 (Supply of Dell Laptops)</p>
        </div>
        <Button>Generate PO for Selected Vendor</Button>
      </div>

      {recommendedVendor && (
        <Card className="border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4">
             <Badge className="bg-emerald-500 hover:bg-emerald-600">Top Choice</Badge>
          </div>
          <CardContent className="p-6 md:p-8">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                   <div className="flex items-center gap-2">
                     <Sparkles className="w-6 h-6 text-emerald-500" />
                     <h3 className="text-2xl font-bold">AI Recommendation: {recommendedVendor.vendor}</h3>
                   </div>
                   <p className="text-muted-foreground">
                     Based on our multi-factor Procurement Score (Price 50%, Rating 20%, Delivery 15%, Performance 10%, Risk 5%), 
                     <span className="font-semibold text-foreground"> {recommendedVendor.vendor} </span> 
                     provides the best overall value.
                   </p>
                   
                   <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-background p-2 px-4 rounded-full border shadow-sm">
                         <TrendingDown className="w-4 h-4 text-emerald-500" />
                         <span className="text-sm font-medium">Estimated Savings: ₹ 70,000</span>
                      </div>
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
                  {QuotationComparisonData.map(q => (
                    <th key={q.vendor} className="p-4 font-semibold text-foreground text-center border-l w-1/3">
                      <div className="flex flex-col items-center gap-2">
                        {q.vendor}
                        {q.recommended && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      </div>
                    </th>
                  ))}
               </tr>
            </thead>
            <tbody className="divide-y">
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><IndianRupee className="w-4 h-4 text-muted-foreground" /> Total Price</td>
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className={cn("p-4 text-center border-l font-bold", q.price === Math.min(...QuotationComparisonData.map(x=>x.price)) ? "text-emerald-500 text-lg" : "")}>
                       ₹ {q.price.toLocaleString('en-IN')}
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> Delivery Time</td>
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className={cn("p-4 text-center border-l", q.deliveryDays === Math.min(...QuotationComparisonData.map(x=>x.deliveryDays)) ? "text-emerald-500 font-bold" : "")}>
                       {q.deliveryDays} Days
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><Award className="w-4 h-4 text-muted-foreground" /> Vendor Rating</td>
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className="p-4 text-center border-l">
                       <div className="flex items-center justify-center gap-1">
                          <span className="text-amber-500 font-bold">{q.rating}</span>
                          <span className="text-amber-500 text-xs">★</span>
                       </div>
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" /> Payment Terms</td>
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className="p-4 text-center border-l text-muted-foreground">
                       {q.paymentTerms}
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-muted-foreground" /> Warranty</td>
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className="p-4 text-center border-l text-muted-foreground">
                       {q.recommended ? "3 Years On-site" : "1 Year Standard"}
                    </td>
                  ))}
               </tr>
               <tr className="hover:bg-muted/30">
                  <td className="p-4 font-medium flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-muted-foreground" /> Risk Score</td>
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className="p-4 text-center border-l">
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
                  {QuotationComparisonData.map(q => (
                    <td key={q.vendor} className="p-4 text-center border-l">
                       <Button variant={q.recommended ? "default" : "outline"} className="w-full">
                         {q.recommended ? "Approve & Create PO" : "Select Alternative"}
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
