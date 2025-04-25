
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, 
  SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { FileText, Home, Settings, User } from "lucide-react";
import Cookies from "js-cookie";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminSettings from "@/components/admin/AdminSettings";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userCookie = Cookies.get('manscara_current_user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUser(user);
    
    if (!userCookie) {
      navigate("/login");
      return;
    }
    
    // In a real app, you would check for admin role here
    // For now, we'll simply check if user exists
    if (!user) {
      toast({
        title: "Access denied",
        description: "You need to be logged in as an admin to access this page.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [navigate, toast]);

  const renderContent = () => {
    switch(activeTab) {
      case "dashboard": 
        return <AdminDashboard />;
      case "orders":
        return <AdminOrders />;
      case "users":
        return <AdminUsers />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-beige font-jakarta">
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full min-h-screen">
          <Sidebar variant="inset">
            <SidebarHeader>
              <div className="flex items-center px-2">
                <img src="/favicon.ico" alt="logo" className="w-8 h-8" />
                <h2 className="text-xl font-bold ml-2">Manscara Admin</h2>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("dashboard")}
                        isActive={activeTab === "dashboard"}
                      >
                        <Home className="w-5 h-5" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("orders")}
                        isActive={activeTab === "orders"}
                      >
                        <FileText className="w-5 h-5" />
                        <span>Orders</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("users")}
                        isActive={activeTab === "users"}
                      >
                        <User className="w-5 h-5" />
                        <span>Users</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("settings")}
                        isActive={activeTab === "settings"}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <div className="p-4 mt-auto">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </div>
          </Sidebar>
          <div className="flex-1 p-6 bg-background">
            {renderContent()}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;
