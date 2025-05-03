
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="container mx-auto p-4">
            <header className="flex items-center justify-between mb-8">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold text-support-darkblue">TI Help Desk</h1>
              <div></div>
            </header>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
