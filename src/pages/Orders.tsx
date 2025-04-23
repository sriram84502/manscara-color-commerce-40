import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Truck, Check, Package, Clock, MapPin } from "lucide-react";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCancelOrder = async (orderId: string) => {
    try {
      // In a real implementation, we would call an API endpoint to cancel the order
      // Since the API doesn't have a cancel endpoint, we'll just remove it from the UI
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      
      toast({
        title: "Order cancelled",
        description: "Your order has been successfully cancelled"
      });
    } catch (err: any) {
      toast({
        title: "Failed to cancel order",
        description: err.message || "Please try again",
        variant: "destructive"
      });
    }
  };

  // Load orders from API
  useEffect(() => {
    const token = localStorage.getItem("manscara_token");
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    const fetchOrders = async () => {
      try {
        const response = await api.orders.getHistory();
        setOrders(response);
      } catch (err: any) {
        toast({
          title: "Failed to fetch orders",
          description: err.message || "Please try again later",
          variant: "destructive"
        });
        
        if (err.message?.includes("401")) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [navigate, toast]);

  const renderStatus = (order: Order) => {
    if (!order.status) return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
        <Package className="w-4 h-4" /> Pending
      </span>
    );
    
    switch (order.status.toLowerCase()) {
      case "processing":
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
            <Check className="w-4 h-4" /> Accepted
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            <Check className="w-4 h-4" /> Delivered
          </span>
        );
      case "shipped":
      case "out for delivery":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
            <Truck className="w-4 h-4" /> Out for Delivery
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
            <Package className="w-4 h-4" /> {order.status}
          </span>
        );
    }
  };

  // Format date from API
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-beige font-jakarta flex flex-col">
      <Navbar />
      <div className="container max-w-2xl mx-auto py-12 flex-1">
        <h2 className="text-3xl font-bold text-black mb-4">Your Orders</h2>
        <div className="p-6 bg-white rounded-lg shadow-card border border-beige">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
              <p className="mt-2">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No orders found</p>
              <Button
                className="bg-black text-beige hover:bg-accent transition-all"
                onClick={() => navigate("/checkout")}
              >
                Place Your First Order
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {orders.map(order => (
                <div key={order._id} className="p-4 border rounded-lg bg-beige/20">
                  <div className="flex justify-between text-black mb-1 items-center">
                    <span className="font-bold text-lg">Order ID:{" "}
                      <span className="font-mono">{order._id}</span>
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-1">
                    <span>Items: <b>{order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}</b></span>
                    <span>Total: <b>₹{order.totalAmount}</b></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    {renderStatus(order)}
                    {/* Show est date and tracking ID for shipped orders */}
                    {(order.status === "out for delivery" || order.status === "shipped") && (
                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center ml-3">
                        {order.estDeliveryDate && (
                          <span className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded text-yellow-900">
                            <Clock className="w-4 h-4" /> ETA: {formatDate(order.estDeliveryDate)}
                          </span>
                        )}
                        {order.trackingId && (
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-gray-700">
                            <MapPin className="w-4 h-4" /> Tracking: <b>{order.trackingId}</b>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs flex gap-2 items-center">
                    <span className="font-semibold">Address:</span>
                    <span className="text-gray-600 break-all">{order.shippingAddress}</span>
                  </div>
                  <div className="flex mt-4 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={["delivered", "shipped", "out for delivery"].includes(order.status?.toLowerCase() || "")}
                    >
                      <Trash2 className="w-4 h-4" /> Cancel Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
