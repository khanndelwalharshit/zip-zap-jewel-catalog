import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Package,
  FolderTree,
  BookOpen,
  MessageSquare,
  Settings,
  Crown,
  Diamond,
  Star
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    group: "main"
  },
  {
    title: "Categories",
    url: "/categories",
    icon: FolderTree,
    group: "catalog"
  },
  {
    title: "Products",
    url: "/products", 
    icon: Package,
    group: "catalog"
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
    group: "management"
  },
  {
    title: "Catalogs",
    url: "/catalogs",
    icon: BookOpen,
    group: "management"
  },
  {
    title: "Inquiries",
    url: "/inquiries",
    icon: MessageSquare,
    group: "management"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    group: "system"
  }
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground shadow-elegant font-semibold" 
      : "hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200";

  const groupedItems = {
    main: menuItems.filter(item => item.group === "main"),
    catalog: menuItems.filter(item => item.group === "catalog"),
    management: menuItems.filter(item => item.group === "management"),
    system: menuItems.filter(item => item.group === "system"),
  };

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r border-border bg-card shadow-elegant`}>
      <SidebarContent>
        {/* Brand Header */}
        {!collapsed && (
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Crown className="h-8 w-8 text-gold" />
                <Diamond className="h-3 w-3 text-gold absolute -top-1 -right-1" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">ZipZag</h2>
                <p className="text-xs text-muted-foreground">Jewelry Catalog</p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Catalog Management */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-gold font-semibold flex items-center gap-2">
              <Star className="h-4 w-4" />
              Catalog
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.catalog.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business Management */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-primary font-semibold">
              Management
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.management.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-muted-foreground">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.system.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
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