"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, ShoppingCart } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import api from "@/lib/api";

const categoryData = [
  { name: 'IT Hardware', value: 45 },
  { name: 'Software Licenses', value: 25 },
  { name: 'Facilities', value: 15 },
  { name: 'Consulting', value: 10 },
  { name: 'Logistics', value: 5 },
];

const cycleTimeData = [
  { stage: 'RFQ Creation', time: 2 },
  { stage: 'Quotation Collection', time: 7 },
  { stage: 'Evaluation & Approval', time: 4 },
  { stage: 'PO Generation', time: 1 },
  { stage: 'Delivery', time: 14 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AnalyticsDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [spendData, setSpendData] = useState<any[]>([]);
  const [vendorData, setVendorData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [statsRes, spendRes, vendorRes] = await Promise.all([
          api.get("/reports/dashboard"),
          api.get("/reports/spending"),
          api.get("/reports/vendor-performance")
        ]);
        setStats(statsRes.data);
        setSpendData(spendRes.data);
        setVendorData(vendorRes.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!stats) return <div className="p-8">Loading Analytics...</div>;

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
            <CardTitle className="text-sm font-medium">Total Spend (Live)</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ {(stats.totalSpend / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-500">
              <TrendingUp className="h-3 w-3" /> Live data
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground mt-1">Tasks requiring action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVendors}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active RFQs</CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRFQs}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress sourcing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Spend Trend Analysis</CardTitle>
            <CardDescription>Monthly procurement expenditure across all categories.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2 h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}} 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} 
                    formatter={(value: any) => [`₹${(value).toLocaleString('en-IN')}`, 'Spend']}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
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
            <CardTitle>Vendor Ratings Overview</CardTitle>
            <CardDescription>Top vendors by average performance rating.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#888" opacity={0.2} />
                  <XAxis type="number" domain={[0, 5]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} width={100} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}} 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                    formatter={(value: any) => [`${value} Stars`, 'Rating']}
                  />
                  <Bar dataKey="rating" fill="#3b82f6" radius={[0, 4, 4, 0]} maxBarSize={20} />
                </BarChart>
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
