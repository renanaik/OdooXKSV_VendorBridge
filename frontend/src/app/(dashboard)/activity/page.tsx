"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldAlert, CheckCircle, Info } from "lucide-react";
import api from "@/lib/api";

export default function ActivityLogsPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await api.get("/activity");
      setActivities(res.data);
    } catch (err) {
      console.error("Failed to load activities", err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    if (type === 'Error') return ShieldAlert;
    if (type === 'Success') return CheckCircle;
    return Info;
  };

  const getColor = (type: string) => {
    if (type === 'Error') return "text-destructive bg-destructive/10";
    if (type === 'Success') return "text-emerald-500 bg-emerald-500/10";
    return "text-blue-500 bg-blue-500/10";
  };

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
              {loading ? (
                <div className="pl-8 text-muted-foreground">Loading logs...</div>
              ) : activities.length === 0 ? (
                <div className="pl-8 text-muted-foreground">No activity logs found.</div>
              ) : (
                activities.map((log) => {
                  const Icon = getIcon(log.type || 'Info');
                  const colorClass = getColor(log.type || 'Info');
                  return (
                    <div key={log._id} className="relative pl-8">
                       <div className={`absolute -left-4 top-1 w-8 h-8 rounded-full border border-background flex items-center justify-center ${colorClass}`}>
                          <Icon className="h-4 w-4" />
                       </div>
                       
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-muted/30 rounded-lg border">
                          <div>
                            <p className="font-medium text-sm">{log.action}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              User: {log.user?.name || 'System'} • Role: {log.user?.role || 'System'}
                            </p>
                          </div>
                          <div className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded">
                            {new Date(log.createdAt).toLocaleString()}
                          </div>
                       </div>
                    </div>
                  );
                })
              )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
