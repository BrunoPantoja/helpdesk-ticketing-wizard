
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";
import { TicketIcon, HomeIcon, UserPlusIcon, FileTextIcon, InfoIcon } from "lucide-react";

const AppSidebar: React.FC = () => {
  const items = [
    { 
      title: "Home", 
      url: "/", 
      icon: HomeIcon 
    },
    { 
      title: "Tickets", 
      url: "/tickets", 
      icon: TicketIcon 
    },
    { 
      title: "Cadastro", 
      url: "/cadastro", 
      icon: UserPlusIcon 
    },
    {
      title: "Sobre",
      url: "/sobre",
      icon: InfoIcon
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <TicketIcon className="h-6 w-6 text-support-blue" />
          <span className="text-xl font-bold">HelpDesk TI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        isActive ? "text-support-blue font-medium" : "text-gray-600 hover:text-support-blue"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
