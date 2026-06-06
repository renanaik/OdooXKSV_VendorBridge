"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, ArrowLeft, Building2, Calendar, IndianRupee, Tag } from "lucide-react";
import api from "@/lib/api";

export default function RfqDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [rfq, setRfq] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRfq = async () => {
      try {
        const res = await api.get(`/rfqs/${params.id}`);
        setRfq(res.data);
      } catch (err) {
        console.error("Failed to fetch RFQ", err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchRfq();
    }
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center animate-pulse">Loading RFQ Details...</div>;
  }

  if (!rfq) {
    return <div className="p-8 text-center">RFQ not found.</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">{rfq.title}</h2>
            <Badge variant={rfq.status === 'Published' ? 'default' : 'secondary'}>{rfq.status}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">RFQ Number: {rfq.rfqNumber}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><Tag className="w-4 h-4" /> Category</p>
                <p className="font-medium mt-1">{rfq.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Deadline</p>
                <p className="font-medium mt-1">{new Date(rfq.deadline).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><IndianRupee className="w-4 h-4" /> Budget</p>
                <p className="font-medium mt-1">₹{(rfq.budget || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><FileText className="w-4 h-4" /> Priority</p>
                <Badge variant="outline" className="mt-1">{rfq.priority}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{rfq.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invited Vendors</CardTitle>
            <CardDescription>{rfq.assignedVendors?.length || 0} vendors have been invited to quote.</CardDescription>
          </CardHeader>
          <CardContent>
            {rfq.assignedVendors?.length > 0 ? (
              <div className="space-y-3">
                {rfq.assignedVendors.map((v: any) => (
                  <div key={v._id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{v.companyName}</p>
                      <p className="text-xs text-muted-foreground">{v.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No vendors assigned.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Line Items</CardTitle>
          <CardDescription>Requested goods or services specifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Expected Price (₹)</TableHead>
                <TableHead>Total (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfq.lineItems?.map((item: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.expectedPrice?.toLocaleString() || '-'}</TableCell>
                  <TableCell>{(item.quantity * (item.expectedPrice || 0)).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {(!rfq.lineItems || rfq.lineItems.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No line items found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
