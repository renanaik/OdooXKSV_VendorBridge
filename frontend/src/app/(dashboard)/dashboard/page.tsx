"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, Users, ShoppingCart, Receipt, 
  IndianRupee, Clock, TrendingUp, CheckCircle2 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import api from "@/lib/api";
import { SpendByCategoryData } from "@/lib/mock-data";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeRFQs: 0,
    pendingApprovals: 0,
    totalSpend: 0
  });
  const [spendingData, setSpendingData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, spendRes, activityRes] = await Promise.all([
          api.get('/reports/dashboard'),
          api.get('/reports/spending'),
          api.get('/activity')
        ]);
        
        setStats(statsRes.data);
        setSpendingData(spendRes.data);
        setActivities(activityRes.data.slice(0, 5)); // Just take top 5
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Procurement Executive Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend (YTD)</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(stats.totalSpend || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{stats.totalVendors}</div>
            <p className="text-xs text-muted-foreground">Registered in system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active RFQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRFQs}</div>
            <p className="text-xs text-muted-foreground">Currently published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Awaiting your action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Procurement Trend</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{fill: 'currentColor'}} />
                  <YAxis className="text-xs" tick={{fill: 'currentColor'}} tickFormatter={(value) => `₹${value/1000}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Spend By Category</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SpendByCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SpendByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-4">
                {SpendByCategoryData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    {item.name}
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
           <CardHeader>
             <CardTitle>Recent Activity</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-8">
               {activities.length === 0 ? <p className="text-muted-foreground text-sm">No recent activity.</p> : activities.map((activity: any) => (
                 <div key={activity._id} className="flex items-center">
                   <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                     {activity.user?.name?.charAt(0) || "U"}
                   </div>
                   <div className="ml-4 space-y-1">
                     <p className="text-sm font-medium leading-none">{activity.user?.name || "System"}</p>
                     <p className="text-sm text-muted-foreground">
                       {activity.action}
                     </p>
                   </div>
                   <div className="ml-auto font-medium text-xs text-muted-foreground">
                     {new Date(activity.createdAt).toLocaleDateString()}
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
        </Card>
        
        <div className="col-span-3 grid grid-cols-2 gap-4">
           <Card className="col-span-2 sm:col-span-1 flex flex-col justify-center items-center text-center p-6 cursor-pointer hover:bg-accent/50 transition-colors border-dashed">
              <Users className="h-8 w-8 text-primary mb-2" />
              <div className="font-semibold">Add Vendor</div>
              <div className="text-xs text-muted-foreground mt-1">Register new supplier</div>
           </Card>
           <Card className="col-span-2 sm:col-span-1 flex flex-col justify-center items-center text-center p-6 cursor-pointer hover:bg-accent/50 transition-colors border-dashed">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <div className="font-semibold">Create RFQ</div>
              <div className="text-xs text-muted-foreground mt-1">Start sourcing process</div>
           </Card>
           <Card className="col-span-2 sm:col-span-1 flex flex-col justify-center items-center text-center p-6 cursor-pointer hover:bg-accent/50 transition-colors border-dashed">
              <ShoppingCart className="h-8 w-8 text-primary mb-2" />
              <div className="font-semibold">Generate PO</div>
              <div className="text-xs text-muted-foreground mt-1">Create purchase order</div>
           </Card>
           <Card className="col-span-2 sm:col-span-1 flex flex-col justify-center items-center text-center p-6 cursor-pointer hover:bg-accent/50 transition-colors border-dashed">
              <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
              <div className="font-semibold">Pending Approvals</div>
              <div className="text-xs text-muted-foreground mt-1">{stats.pendingApprovals} requests waiting</div>
           </Card>
        </div>
      </div>
    </div>
  );
}
