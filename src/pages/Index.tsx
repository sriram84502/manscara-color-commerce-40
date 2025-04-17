
// Modern Ecommerce Home Page for Manscara Facewash

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import AboutProduct from "@/components/AboutProduct";
import ReviewsSection from "@/components/ReviewsSection";

const Index = () => {
  return (
    <div className="bg-beige min-h-screen font-jakarta pb-10">
      <Navbar />
      <HeroSection />
      <ProductCatalog />
      <AboutProduct />
      <ReviewsSection />
    </div>
  );
};

export default Index;
