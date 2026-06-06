"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FileSignature,
  ShoppingCart,
  Receipt,
  UserCircle,
  Building2
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/vendor-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My RFQs",
    href: "/vendor-rfqs",
    icon: FileText,
  },
  {
    title: "My Quotations",
    href: "/vendor-quotations",
    icon: FileSignature,
  },
  {
    title: "Purchase Orders",
    href: "/vendor-pos",
    icon: ShoppingCart,
  },
  {
    title: "Invoices",
    href: "/vendor-invoices",
    icon: Receipt,
  },
  {
    title: "Profile",
    href: "/vendor-profile",
    icon: UserCircle,
  },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full bg-slate-950 text-slate-300 w-64 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-emerald-600 p-1.5 rounded-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Vendor Portal</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {sidebarNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                isActive 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "hover:bg-slate-900 hover:text-slate-100"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300")} />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
            TV
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white truncate">TechCorp Vendor</span>
            <span className="text-xs text-slate-500">IT Supplier</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
