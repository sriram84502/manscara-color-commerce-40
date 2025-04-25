
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Check,
  Package,
  Truck,
  Clock,
  X,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Order = {
  _id: string;
  date: string;
  orderItems: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  userId?: string;
  status?: string;
  trackingId?: string;
  estDeliveryDate?: string;
  createdAt: string;
  updatedAt: string;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.orders.getHistory();
        console.log("Orders response:", response);
        
        if (Array.isArray(response)) {
          const validOrders = response.map(order => ({
            ...order,
            orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
          }));
          
          setOrders(validOrders);
        } else {
          console.error("Invalid orders response format:", response);
          toast({
            title: "Data format error",
            description: "Received invalid data format from server",
            variant: "destructive"
          });
          setOrders([]);
        }
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        toast({
          title: "Failed to fetch orders",
          description: err.message || "Please try again later",
          variant: "destructive"
        });
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [toast]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // In a real implementation, this would call an API to update the order status
      // For now, we'll just update it in the UI
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order  
        )
      );
      
      toast({
        title: "Order updated",
        description: `Order #${orderId} status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to update order",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const countItems = (order: Order) => {
    if (!order.orderItems || !Array.isArray(order.orderItems)) {
      return 0;
    }
    return order.orderItems.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  };

  const getStatusIcon = (status: string | undefined) => {
    if (!status) return <AlertCircle className="h-4 w-4" />;
    
    switch(status.toLowerCase()) {
      case 'processing':
      case 'accepted':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'shipped':
      case 'out for delivery':
        return <Truck className="h-4 w-4 text-yellow-500" />;
      case 'delivered':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        <Button>Export Orders</Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center p-8 border rounded-md">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-medium mb-2">No orders found</p>
          <p className="text-gray-500">Orders will appear here once customers make purchases</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono text-xs">{order._id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{countItems(order)}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span>{order.status || "Pending"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status || "pending"}
                      onValueChange={(value) => handleStatusChange(order._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
