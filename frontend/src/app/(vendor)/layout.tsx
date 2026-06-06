import { VendorSidebar } from "@/components/layout/VendorSidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <VendorSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
