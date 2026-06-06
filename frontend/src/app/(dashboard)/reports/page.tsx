"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileSpreadsheet, FileIcon, BarChart3, TrendingUp, Users, Target, ShieldCheck, Clock } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { MonthlyTrendData, SpendByCategoryData } from "@/lib/mock-data";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function ReportsPage() {
  const VendorPerformanceData = [
    { name: 'Reliance', rating: 4.8, volume: 1450000 },
    { name: 'TCS', rating: 4.9, volume: 850000 },
    { name: 'Wipro', rating: 4.5, volume: 125000 },
    { name: 'Infosys', rating: 4.7, volume: 600000 },
  ];

  const ApprovalTrendData = [
    { name: 'Q1', cycleTime: 4.5, count: 120 },
    { name: 'Q2', cycleTime: 3.2, count: 150 },
    { name: 'Q3', cycleTime: 2.8, count: 210 },
    { name: 'Q4', cycleTime: 2.1, count: 180 },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Analytics Center</h2>
          <p className="text-muted-foreground mt-1">Deep insights into procurement performance and vendor metrics.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="hidden md:flex"><FileIcon className="w-4 h-4 mr-2" /> PDF</Button>
           <Button variant="outline" size="sm" className="hidden md:flex"><FileSpreadsheet className="w-4 h-4 mr-2" /> Excel</Button>
           <Button size="sm"><Download className="w-4 h-4 mr-2" /> Export All Data</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
         <Card>
           <CardContent className="p-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-sm font-medium text-muted-foreground">PO Fulfillment Rate</p>
                   <p className="text-2xl font-bold text-emerald-500">96.4%</p>
                 </div>
                 <div className="p-3 bg-emerald-500/10 rounded-full"><Target className="w-5 h-5 text-emerald-500" /></div>
              </div>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-sm font-medium text-muted-foreground">Avg Approval Cycle</p>
                   <p className="text-2xl font-bold">2.1 Days</p>
                 </div>
                 <div className="p-3 bg-primary/10 rounded-full"><Clock className="w-5 h-5 text-primary" /></div>
              </div>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                   <p className="text-2xl font-bold text-emerald-500">99.8%</p>
                 </div>
                 <div className="p-3 bg-emerald-500/10 rounded-full"><ShieldCheck className="w-5 h-5 text-emerald-500" /></div>
              </div>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-sm font-medium text-muted-foreground">Procurement Efficiency</p>
                   <p className="text-2xl font-bold text-primary">8.5 / 10</p>
                 </div>
                 <div className="p-3 bg-primary/10 rounded-full"><BarChart3 className="w-5 h-5 text-primary" /></div>
              </div>
           </CardContent>
         </Card>
      </div>

      <Tabs defaultValue="spend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="spend">Spend Analysis</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Performance</TabsTrigger>
          <TabsTrigger value="efficiency">Process Efficiency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spend" className="space-y-4">
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                 <CardHeader>
                   <CardTitle>Spend vs Savings (YTD)</CardTitle>
                   <CardDescription>Monthly comparison of total spend and negotiated savings.</CardDescription>
                 </CardHeader>
                 <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={MonthlyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                           <defs>
                             <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                             </linearGradient>
                             <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                             </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                           <XAxis dataKey="name" className="text-xs" tick={{fill: 'currentColor'}} />
                           <YAxis className="text-xs" tick={{fill: 'currentColor'}} tickFormatter={(value) => `₹${value/100000}L`} />
                           <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} itemStyle={{ color: 'hsl(var(--foreground))' }} />
                           <Area type="monotone" dataKey="spend" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSpend)" />
                           <Area type="monotone" dataKey="savings" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorSavings)" />
                         </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </CardContent>
              </Card>
              
              <Card className="col-span-3">
                 <CardHeader>
                   <CardTitle>Spend Distribution</CardTitle>
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
                             outerRadius={100}
                             paddingAngle={2}
                             dataKey="value"
                           >
                             {SpendByCategoryData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                           </Pie>
                           <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                           <Legend />
                         </PieChart>
                       </ResponsiveContainer>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-4">
           <Card>
              <CardHeader>
                 <CardTitle>Top Vendors by Volume & Rating</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={VendorPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                        <XAxis dataKey="name" className="text-xs" tick={{fill: 'currentColor'}} />
                        <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" className="text-xs" tickFormatter={(v) => `₹${v/100000}L`} />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-4))" className="text-xs" domain={[0, 5]} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="volume" name="PO Volume (₹)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="rating" name="Rating (Out of 5)" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
           <Card>
              <CardHeader>
                 <CardTitle>Approval Cycle Time Trends</CardTitle>
                 <CardDescription>Reduction in cycle time over the last 4 quarters.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ApprovalTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                         <defs>
                           <linearGradient id="colorCycle" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                             <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                         <XAxis dataKey="name" className="text-xs" tick={{fill: 'currentColor'}} />
                         <YAxis className="text-xs" tick={{fill: 'currentColor'}} label={{ value: 'Days', angle: -90, position: 'insideLeft', fill: 'currentColor' }} />
                         <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                         <Area type="monotone" dataKey="cycleTime" name="Cycle Time (Days)" stroke="hsl(var(--chart-2))" fill="url(#colorCycle)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
