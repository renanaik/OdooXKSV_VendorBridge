"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, FileSignature, ShoppingCart, Receipt, ArrowRight, TrendingUp } from "lucide-react";

export default function VendorDashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h2>
          <p className="text-muted-foreground">Welcome back to VendorBridge. Here is your business overview.</p>
        </div>
        <Button>Browse Open RFQs</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned RFQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">3 requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotations</CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">4 under review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active POs</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">₹4.2M total value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">₹8.5L</div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 invoices</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent RFQs</CardTitle>
            <CardDescription>Latest sourcing requests assigned to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "RFQ-2026-089", title: "Enterprise Laptops Q3", deadline: "12 Jun 2026", status: "Open" },
                { id: "RFQ-2026-085", title: "Cloud Hosting Services", deadline: "10 Jun 2026", status: "Open" },
                { id: "RFQ-2026-081", title: "Office Networking Gear", deadline: "05 Jun 2026", status: "Closed" },
              ].map((rfq) => (
                <div key={rfq.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{rfq.title}</p>
                    <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                      <span>{rfq.id}</span> • <span>Due: {rfq.deadline}</span>
                    </div>
                  </div>
                  <Badge variant={rfq.status === 'Open' ? 'default' : 'secondary'}>{rfq.status}</Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" size="sm">View All RFQs <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Purchase Orders</CardTitle>
            <CardDescription>Recent orders awaiting fulfillment.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {[
                { id: "PO-2026-045", desc: "Developer Workstations (x15)", value: "₹24.5L", status: "In Transit" },
                { id: "PO-2026-041", desc: "Data Center Switches", value: "₹12.0L", status: "Processing" },
                { id: "PO-2026-038", desc: "Annual Security Audit", value: "₹5.5L", status: "Pending Start" },
              ].map((po) => (
                <div key={po.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{po.desc}</p>
                    <p className="text-sm text-muted-foreground mt-1">{po.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{po.value}</p>
                    <Badge variant="outline" className="mt-1 text-[10px]">{po.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" size="sm">View All Orders <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
