
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/utils/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [qty, setQty] = useState(1);
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Animate the total / product card when quantity changes
  const [animKey, setAnimKey] = useState(0);

  function handleChange(delta: number) {
    setQty(q => {
      const newQty = Math.max(1, q + delta);
      setAnimKey(prev => prev + 1); // trigger key change for animation
      return newQty;
    });
  }

  const total = qty * 299;

  async function placeOrder() {
    const userCookie = Cookies.get('manscara_current_user');
    if (!userCookie) {
      toast({
        title: "Login required",
        description: "Please login to place an order",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userCookie);
    
    setIsLoading(true);
    try {
      const orderData = {
        orderItems: [
          {
            productId: "manscara001",
            name: "Manscara Facewash (100mL)",
            quantity: qty,
            price: 299
          }
        ],
        shippingAddress: user.address,
        totalAmount: total
      };
      
      await api.orders.create(orderData);
      
      setConfirm(true);
      toast({
        title: "Order placed successfully!",
        description: "You can track your order in the Orders page"
      });
      
      setTimeout(() => {
        setConfirm(false);
        navigate("/orders");
      }, 1500);
    } catch (err: any) {
      toast({
        title: "Failed to place order",
        description: err.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setConfirm(false);
  }, []);

  return (
    <div className="min-h-screen bg-beige font-jakarta flex flex-col">
      <Navbar />
      <div className="container max-w-xl mx-auto py-12 flex-1">
        <h2 className="text-3xl font-bold text-black mb-5">Checkout</h2>
        <div
          key={animKey}
          className="bg-white rounded-lg p-8 border border-beige shadow-card animate-scale-in"
        >
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl text-black">Manscara Facewash (100mL)</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{qty}x ₹299</span>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Decrease quantity"
                  className="rounded-full bg-beige text-black font-bold w-7 h-7 flex items-center justify-center border border-gray-300 hover:scale-110 hover:bg-accent transition-all"
                  onClick={() => handleChange(-1)}
                  disabled={qty === 1 || isLoading}
                  type="button"
                ><Minus className="w-4 h-4" /></button>
                <button
                  aria-label="Increase quantity"
                  className="rounded-full bg-beige text-black font-bold w-7 h-7 flex items-center justify-center border border-gray-300 hover:scale-110 hover:bg-accent transition-all"
                  onClick={() => handleChange(1)}
                  disabled={isLoading}
                  type="button"
                ><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <span className="text-lg font-semibold text-black py-1 animate-fade-in">Total: ₹{total}</span>
          </div>
          <button
            className="w-full mt-6 bg-black text-beige py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 hover:bg-accent hover:text-black disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed"
            onClick={placeOrder}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
          {confirm && (
            <div className="text-green-500 font-bold text-center mt-2 animate-fade-in">
              Order placed!
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600 mt-4 text-center animate-fade-in">
          Secure payments &mdash; Stripe/UPI/Cards (login for real purchases)
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Checkout;
