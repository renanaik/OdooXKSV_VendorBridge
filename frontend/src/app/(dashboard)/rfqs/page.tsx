"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Search, MoreHorizontal, FileSignature, Clock, CheckCircle2, Copy, Eye, Pencil, Trash2 } from "lucide-react";
import api from "@/lib/api";

export default function RfqManagementPage() {
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [categoryFilter, setCategoryFilter] = useState("all-categories");
  const [deadlineFilter, setDeadlineFilter] = useState("all-time");

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const response = await api.get('/rfqs');
        setRfqs(response.data);
      } catch (error) {
        console.error("Failed to fetch RFQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRfqs();
  }, []);

  const filteredData = rfqs.filter((rfq) => {
    const titleMatch = rfq.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = rfq.rfqNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || idMatch;
    
    const matchesStatus = statusFilter === "all-status" || rfq.status?.toLowerCase().includes(statusFilter.replace('-', ' '));
    const matchesCategory = categoryFilter === "all-categories" || rfq.category?.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesDeadline = deadlineFilter === "all-time" || true;

    return matchesSearch && matchesStatus && matchesCategory && matchesDeadline;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft": return <Badge variant="secondary" className="text-slate-500">{status}</Badge>;
      case "Published": return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      case "Quotation Received": return <Badge variant="default" className="bg-indigo-500 hover:bg-indigo-600">{status}</Badge>;
      case "Under Review": return <Badge variant="outline" className="text-amber-500 border-amber-500">{status}</Badge>;
      case "Approved": return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">{status}</Badge>;
      case "Closed": return <Badge variant="secondary" className="bg-slate-800 text-slate-300">{status}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === "High") return <Badge variant="outline" className="text-destructive border-destructive/50 bg-destructive/10">{priority}</Badge>;
    if (priority === "Medium") return <Badge variant="outline" className="text-amber-500 border-amber-500/50 bg-amber-500/10">{priority}</Badge>;
    return <Badge variant="outline" className="text-emerald-500 border-emerald-500/50 bg-emerald-500/10">{priority}</Badge>;
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RFQ Management</h2>
          <p className="text-muted-foreground mt-1">Manage sourcing requests, track quotations, and finalize vendors.</p>
        </div>
        <Link href="/rfqs/create">
          <Button><Plus className="w-4 h-4 mr-2" /> New RFQ</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RFQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active RFQs</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Published & receiving quotes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Quotations</CardTitle>
            <FileSignature className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting vendor submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed RFQs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully awarded</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by RFQ number or title..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "")}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || "")}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="it">IT Hardware</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                </SelectContent>
              </Select>
              <Select value={deadlineFilter} onValueChange={setDeadlineFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="next-week">Next Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFQ Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground animate-pulse">
                    Loading RFQs...
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No RFQs found matching the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((rfq) => (
                <TableRow key={rfq._id}>
                  <TableCell className="font-medium">{rfq.rfqNumber}</TableCell>
                  <TableCell>{rfq.title}</TableCell>
                  <TableCell>{rfq.category}</TableCell>
                  <TableCell>{getPriorityBadge(rfq.priority)}</TableCell>
                  <TableCell>₹{(rfq.budget || 0).toLocaleString()}</TableCell>
                  <TableCell>{new Date(rfq.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>{rfq.vendors?.length || 0} Vendors</TableCell>
                  <TableCell>{getStatusBadge(rfq.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem render={<Link href={`/rfqs/${rfq._id}`} />}>
                          <Eye className="w-4 h-4 mr-2" /> View RFQ
                        </DropdownMenuItem>
                        <DropdownMenuItem><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Cancel RFQ</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
