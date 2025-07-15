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
  Star,
  UserCog,
  BarChart3,
  Shield,
  Database
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    group: "main",
    badge: null
  },
  {
    title: "Admin Users",
    url: "/admin-users",
    icon: UserCog,
    group: "main",
    badge: "5"
  },
  {
    title: "Categories",
    url: "/categories",
    icon: FolderTree,
    group: "catalog",
    badge: "24"
  },
  {
    title: "Products",
    url: "/products", 
    icon: Package,
    group: "catalog",
    badge: "2.4K"
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
    group: "management",
    badge: "1.8K"
  },
  {
    title: "Catalogs",
    url: "/catalogs",
    icon: BookOpen,
    group: "management",
    badge: "156"
  },
  {
    title: "Inquiries",
    url: "/inquiries",
    icon: MessageSquare,
    group: "management",
    badge: "47"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    group: "system",
    badge: null
  },
  {
    title: "Security",
    url: "/security",
    icon: Shield,
    group: "system",
    badge: null
  },
  {
    title: "Database",
    url: "/database",
    icon: Database,
    group: "system",
    badge: null
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    group: "system",
    badge: null
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
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
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
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
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
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
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
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Version Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">ZipZag Catalog v2.1</p>
              <p className="text-xs text-muted-foreground">React 18.2 Stable</p>
              <Badge variant="outline" className="text-xs mt-2">Production Ready</Badge>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;