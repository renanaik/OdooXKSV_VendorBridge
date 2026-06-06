"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, ShoppingCart } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const spendData = [
  { month: 'Jan', spend: 450000 },
  { month: 'Feb', spend: 520000 },
  { month: 'Mar', spend: 380000 },
  { month: 'Apr', spend: 610000 },
  { month: 'May', spend: 590000 },
  { month: 'Jun', spend: 820000 },
];

const categoryData = [
  { name: 'IT Hardware', value: 45 },
  { name: 'Software Licenses', value: 25 },
  { name: 'Facilities', value: 15 },
  { name: 'Consulting', value: 10 },
  { name: 'Logistics', value: 5 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

const vendorPerformanceData = [
  { subject: 'Quality', A: 90, B: 75, fullMark: 100 },
  { subject: 'Price', A: 85, B: 90, fullMark: 100 },
  { subject: 'Delivery Time', A: 95, B: 60, fullMark: 100 },
  { subject: 'Compliance', A: 100, B: 85, fullMark: 100 },
  { subject: 'Communication', A: 80, B: 85, fullMark: 100 },
  { subject: 'Innovation', A: 70, B: 65, fullMark: 100 },
];

const cycleTimeData = [
  { stage: 'RFQ Creation', time: 2 },
  { stage: 'Quotation Collection', time: 7 },
  { stage: 'Evaluation & Approval', time: 4 },
  { stage: 'PO Generation', time: 1 },
  { stage: 'Delivery', time: 14 },
];

export default function AnalyticsDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Procurement Analytics</h2>
          <p className="text-muted-foreground mt-1">Comprehensive insights into spend, efficiency, and vendor performance.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 3.37Cr</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-500">
              <TrendingUp className="h-3 w-3" /> +12.5% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings Achieved</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 42.5L</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-500">
              <TrendingUp className="h-3 w-3" /> Exceeded target by 4%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Users className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">184</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-500">
               Avg Rating: 4.6 / 5.0
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cycle Time</CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 Days</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-500">
               <TrendingDown className="h-3 w-3" /> -2 days vs last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Spend Trend Analysis (H1 2026)</CardTitle>
            <CardDescription>Monthly procurement expenditure across all categories.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2 h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(value) => `₹${value/100000}L`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}} 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} 
                    formatter={(value: any) => [`₹${(value).toLocaleString('en-IN')}`, 'Spend']}
                  />
                  <Bar dataKey="spend" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Distribution of budget across core procurement sectors.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
             <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, 'Share']}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Performance Comparison</CardTitle>
            <CardDescription>Top Tier vs Secondary Tier Vendor Evaluation Matrix.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={vendorPerformanceData}>
                  <PolarGrid stroke="#888" opacity={0.3} />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#888', fontSize: 12}} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fill: '#888', fontSize: 10}} />
                  <Radar name="Tier 1 Vendors" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="Tier 2 Vendors" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Procurement Cycle Time</CardTitle>
            <CardDescription>Average duration (in days) spent at each stage of procurement.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycleTimeData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#888" opacity={0.2} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} width={120} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}} 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                    formatter={(value: any) => [`${value} Days`, 'Duration']}
                  />
                  <Line type="monotone" dataKey="time" stroke="#f59e0b" strokeWidth={4} dot={{r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                </LineChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
