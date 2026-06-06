"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ShieldAlert, CheckCircle, Info } from "lucide-react";
import { RecentActivityFeed } from "@/lib/mock-data";

export default function ActivityLogsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Enterprise Audit Trail</h2>
          <p className="text-muted-foreground mt-1">Comprehensive system activity logs and compliance tracking.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
           <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input type="search" placeholder="Search by user, action, IP..." className="pl-9" />
              </div>
              <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
           </div>
        </CardHeader>
        <CardContent>
           <div className="relative border-l border-border ml-4 space-y-8 py-2">
              {[
                { type: "auth", user: "Rajesh Sharma", action: "Successful login from 192.168.1.45", time: "10 mins ago", icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
                { type: "po", user: "Ankit Gupta", action: "Approved PO-2026-0045 for Reliance Retail Ltd", time: "2 hours ago", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { type: "vendor", user: "System", action: "Vendor 'L&T Infotech' compliance documents expired", time: "5 hours ago", icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" },
                { type: "rfq", user: "Rahul Desai", action: "Published RFQ-2026-001 (Supply of Dell Laptops)", time: "1 day ago", icon: Info, color: "text-primary", bg: "bg-primary/10" },
              ].map((log, i) => (
                <div key={i} className="relative pl-8">
                   <div className={`absolute -left-4 top-1 w-8 h-8 rounded-full border border-background flex items-center justify-center ${log.bg}`}>
                      <log.icon className={`h-4 w-4 ${log.color}`} />
                   </div>
                   
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-muted/30 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{log.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">User: {log.user} • IP: 10.0.0.1</p>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded">
                        {log.time}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Temporary inline button to avoid circular dependency
function Button({ className, variant, size, ...props }: any) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${variant === 'outline' ? 'border border-input hover:bg-accent hover:text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'} h-10 py-2 px-4 ${className}`} {...props} />;
}
