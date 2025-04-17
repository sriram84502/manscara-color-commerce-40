
import { ShoppingCart, Star } from "lucide-react";
import CTAButtons from "./CTAButtons";

const HeroSection = () => (
  <section className="w-full bg-gradient-to-br from-beige to-sand py-12 md:py-20 font-jakarta relative overflow-hidden animate-fade-in">
    <div className="container flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 text-center md:text-left space-y-7">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight animate-fade-in-up">
          Reveal <span className="text-accent">confidence</span> in every wash,<br className="hidden md:inline"/> with <span className="text-black">Manscara Facewash</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto md:mx-0">
          The modern solution for oily and acne-prone skin &mdash; oil control, clarifying & uniquely crafted for bold skin health.
        </p>
        <CTAButtons />
        <div className="flex items-center gap-2 pt-2 justify-center md:justify-start">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-base text-black font-bold">4.8/5</span>
          <span className="text-accent ml-1">(192 reviews)</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/lovable-uploads/a4971b4c-6651-4f18-86ad-e8911ab235f9.png"
          alt="Manscara Facewash"
          className="w-[320px] h-[400px] object-contain rounded-xl shadow-card bg-gradient-to-t from-sand to-beige border-2 border-beige"
          draggable={false}
        />
      </div>
    </div>
  </section>
);
export default HeroSection;
