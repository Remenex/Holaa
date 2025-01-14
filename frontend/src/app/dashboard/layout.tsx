import { ReactNode } from "react";
import Sidebar from "@/components/dashboard";
import DashboardNavbar from "../../components/dashboard/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex bg-background">
      <Sidebar />
      <div className="w-full">
        <DashboardNavbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
