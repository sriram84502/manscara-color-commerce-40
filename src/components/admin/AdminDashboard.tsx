
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package, ShoppingCart, User } from "lucide-react";

const AdminDashboard = () => {
  // In a real application, these would be fetched from an API
  const stats = {
    totalOrders: 67,
    pendingOrders: 12,
    totalUsers: 89,
    totalRevenue: 24599
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 1}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 5) + 1}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 15) + 1}% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of recent store activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2 border rounded-md">
                <div className="bg-black/5 p-2 rounded-md">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">New order #12876</p>
                  <p className="text-sm text-gray-500">4 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-2 border rounded-md">
                <div className="bg-black/5 p-2 rounded-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-gray-500">12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-2 border rounded-md">
                <div className="bg-black/5 p-2 rounded-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Order #12875 completed</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
