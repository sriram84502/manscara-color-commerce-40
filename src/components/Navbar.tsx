
import { ShoppingCart, User, List, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => (
  <header className="w-full bg-beige shadow-card font-jakarta">
    <nav className="container flex items-center justify-between py-4 px-1">
      <div className="flex items-center gap-3">
        <img src="/lovable-uploads/a4971b4c-6651-4f18-86ad-e8911ab235f9.png" alt="Manscara" className="w-10 h-10 rounded-lg shadow" />
        <span className="text-xl font-bold tracking-tight text-black">MANSCARA</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-black text-base">
        <Link to="/" className="hover:underline underline-offset-4 font-medium">Home</Link>
        <Link to="/orders" className="hover:underline underline-offset-4 flex items-center gap-1"><History className="w-5 h-5"/><span>Orders</span></Link>
        <Link to="/checkout" className="hover:underline underline-offset-4 flex items-center gap-1"><ShoppingCart className="w-5 h-5"/> <span>Buy Now</span></Link>
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-black text-beige font-semibold px-4 py-2 rounded-md shadow hover:scale-105 transition-transform" asChild>
          <Link to="/login"><User className="w-4 h-4 mr-1 inline-block"/> Login/Signup</Link>
        </Button>
      </div>
    </nav>
  </header>
);

export default Navbar;
