"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";
import { VendorProfileDrawer } from "@/components/vendors/VendorProfileDrawer";
import Link from "next/link";
import api from "@/lib/api";

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await api.get('/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(vendor => {
    const searchMatch = vendor.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        vendor.taxId?.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  const openVendorProfile = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vendor Management</h2>
          <p className="text-muted-foreground mt-1">Manage enterprise supplier registry and performance.</p>
        </div>
        <Link href="/vendors/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Vendor
          </Button>
        </Link>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="pb-4 bg-muted/10 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="flex items-center gap-2 w-full md:w-1/3">
                <div className="relative w-full group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder="Search vendors by name or GST..."
                    className="pl-10 w-full bg-background border-border/50 focus-visible:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
             </div>
             <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex items-center gap-2 border-border/50 bg-background hover:bg-muted/50">
                  <Filter className="h-4 w-4 text-muted-foreground" /> Filters
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] border-border/50 bg-background">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="it">IT Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] border-border/50 bg-background">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b-border/50">
                  <TableHead className="w-[100px] pl-6 font-semibold">Vendor ID</TableHead>
                  <TableHead className="font-semibold">Company Name</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Tax ID (GST)</TableHead>
                  <TableHead className="font-semibold">Rating</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right pr-6 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground animate-pulse">
                      Loading your enterprise vendors...
                    </TableCell>
                  </TableRow>
                ) : filteredVendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2 opacity-20" />
                        <p>No vendors found matching your criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredVendors.map((vendor) => (
                  <TableRow key={vendor._id} className="cursor-pointer hover:bg-muted/30 transition-colors border-b-border/50 group" onClick={() => openVendorProfile(vendor)}>
                    <TableCell className="font-medium text-muted-foreground pl-6">
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">{vendor.vendorCode || vendor._id.substring(0,8)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors">{vendor.companyName}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{vendor.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-background">{vendor.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{vendor.taxId || vendor.gstNumber}</TableCell>
                    <TableCell>
                      {vendor.rating ? (
                        <div className="flex items-center gap-1.5 bg-amber-500/10 w-fit px-2 py-1 rounded-md border border-amber-500/20">
                          <span className="text-amber-500 text-xs">★</span>
                          <span className="font-bold text-xs text-amber-700 dark:text-amber-400">{vendor.rating}</span>
                        </div>
                      ) : (
                        <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">New</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={vendor.status === "Active" ? "default" : vendor.status === "Pending" ? "outline" : "secondary"}
                             className={vendor.status === "Pending Verification" || vendor.status === "Pending" ? "text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400" : vendor.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
                      >
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger onClick={(e: any) => e.stopPropagation()} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-background border border-transparent hover:border-border/50 text-muted-foreground hover:text-foreground transition-all outline-none">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={(e: any) => { e.stopPropagation(); openVendorProfile(vendor); }}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e: any) => e.stopPropagation()}>Edit Vendor</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e: any) => e.stopPropagation()} className="text-destructive">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <VendorProfileDrawer 
        vendor={selectedVendor} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </div>
  );
}
