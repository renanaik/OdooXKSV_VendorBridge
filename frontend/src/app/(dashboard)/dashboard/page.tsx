"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, Users, ShoppingCart, Receipt, 
  IndianRupee, Clock, TrendingUp, CheckCircle2 
} from "lucide-react";
import { KpiData, MonthlyTrendData, SpendByCategoryData, RecentActivityFeed } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function DashboardPage() {
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
            <div className="text-2xl font-bold">{KpiData.totalSpend}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Achieved</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{KpiData.savingsAchieved}</div>
            <p className="text-xs text-muted-foreground">Exceeded target by 12%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active RFQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{KpiData.activeRfqs}</div>
            <p className="text-xs text-muted-foreground">14 closing this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cycle Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{KpiData.avgCycleTime}</div>
            <p className="text-xs text-muted-foreground">-2 days from last quarter</p>
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
                <LineChart data={MonthlyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{fill: 'currentColor'}} />
                  <YAxis className="text-xs" tick={{fill: 'currentColor'}} tickFormatter={(value) => `₹${value/100000}L`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line type="monotone" dataKey="spend" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="savings" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
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
               {RecentActivityFeed.map(activity => (
                 <div key={activity.id} className="flex items-center">
                   <img className="h-9 w-9 rounded-full border border-border" src={activity.avatar === "0" ? "https://github.com/shadcn.png" : `https://i.pravatar.cc/100?img=${activity.avatar}`} alt="Avatar" />
                   <div className="ml-4 space-y-1">
                     <p className="text-sm font-medium leading-none">{activity.user}</p>
                     <p className="text-sm text-muted-foreground">
                       {activity.action}
                     </p>
                   </div>
                   <div className="ml-auto font-medium text-xs text-muted-foreground">
                     {activity.time}
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
              <div className="text-xs text-muted-foreground mt-1">{KpiData.pendingApprovals} requests waiting</div>
           </Card>
        </div>
      </div>
    </div>
  );
}
