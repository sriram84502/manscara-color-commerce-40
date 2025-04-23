
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, MapPin, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const { orderId, amount, items } = location.state || {};

  useEffect(() => {
    if (!orderId || !amount) {
      navigate("/checkout");
      return;
    }

    // Load user address if available
    const userCookie = Cookies.get('manscara_current_user');
    if (userCookie) {
      const user = JSON.parse(userCookie);
      if (user.address) {
        const [street = "", city = "", state = "", pincode = ""] = user.address.split(",").map((s: string) => s.trim());
        setAddress({ street, city, state, pincode });
      }
    }
  }, [orderId, amount, navigate]);

  const handlePayment = async () => {
    if (!address.street || !address.city || !address.state || !address.pincode) {
      toast({
        title: "Missing address",
        description: "Please fill in all address fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create Razorpay order
      const razorpayOrder = await api.payments.createOrder(amount);

      // Load Razorpay SDK
      const options = {
        key: "rzp_test_wN6bDNj1rKzn3q", // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Manscara",
        description: "Purchase of Manscara products",
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          // Verify payment
          const verification = await api.payments.verifyPayment({
            order_id: razorpayOrder.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            dbOrderId: orderId
          });

          if (verification.verified) {
            toast({
              title: "Payment successful",
              description: "Your order has been placed successfully!"
            });
            navigate("/orders");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com"
        },
        theme: {
          color: "#000000"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast({
        title: "Payment failed",
        description: err.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige flex flex-col">
      <Navbar />
      <div className="container max-w-2xl mx-auto py-12 px-4 flex-1">
        <div className="bg-white rounded-lg p-6 shadow-card border border-beige">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="text-accent" />
            <h1 className="text-2xl font-bold">Payment Details</h1>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-beige/20 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Order Summary</h2>
              {items?.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-beige flex justify-between font-bold">
                <span>Total</span>
                <span>₹{amount}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
                <Input
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
                <Input
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
                <Input
                  placeholder="PIN Code"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                />
              </div>
            </div>

            {/* Payment Button */}
            <Button
              className="w-full bg-black text-beige hover:bg-accent transition-all"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : `Pay ₹${amount}`}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
