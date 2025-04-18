
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CTAButtons from "./CTAButtons";
import { Star } from "lucide-react";

const HeroSection = () => {
  const [titleRef, titleAnim] = useScrollReveal("animate-fade-in-up", 100);
  const [subtitleRef, subtitleAnim] = useScrollReveal("animate-fade-in-up", 200);
  const [taglineRef, taglineAnim] = useScrollReveal("animate-fade-in-up", 300);
  const [imgRef, imgAnim] = useScrollReveal("animate-fade-in", 400);
  const [ratingRef, ratingAnim] = useScrollReveal("animate-fade-in-up", 500);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#f5f5f5] to-[#e2d1c3]">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-[#f5f5f5] to-[#e2d1c3] opacity-75"></div>
      </div>
      
      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-2xl space-y-6">
          <h1
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-4xl font-bold text-[#1A1F2C] md:text-6xl lg:text-7xl tracking-wider ${titleAnim}`}
          >
            Reveal confidence in every wash
          </h1>
          <h2
            ref={subtitleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-2xl font-semibold text-[#1A1F2C] md:text-4xl tracking-wide ${subtitleAnim}`}
          >
            with Manscara Facewash
          </h2>
          <p
            ref={taglineRef as React.RefObject<HTMLParagraphElement>}
            className={`text-lg text-[#8E9196] md:text-xl max-w-xl ${taglineAnim}`}
          >
            The modern solution for oily and acne-prone skin — oil control, clarifying & uniquely crafted for bold skin health.
          </p>
          
          <CTAButtons />
          
          <div 
            ref={ratingRef as React.RefObject<HTMLDivElement>}
            className={`flex items-center gap-2 mt-6 ${ratingAnim}`}
          >
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-xl font-bold text-[#1A1F2C]">4.8/5</span>
            </div>
            <span className="text-[#8E9196]">(192 reviews)</span>
          </div>
        </div>

        <div className="absolute right-6 bottom-6 md:right-16 md:bottom-16 w-[280px] md:w-[320px]">
          <img
            ref={imgRef as React.RefObject<HTMLImageElement>}
            src="https://preview--manscara-color-commerce.lovable.app/lovable-uploads/24c4d1a3-6643-4f72-9433-7d1f90d36d85.png"
            alt="Product shot of Manscara Facewash for men"
            className={`w-full object-contain ${imgAnim}`}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
