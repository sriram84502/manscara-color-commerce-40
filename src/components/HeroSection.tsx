
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const [titleRef, titleAnim] = useScrollReveal("animate-fade-in-up", 100);
  const [subtitleRef, subtitleAnim] = useScrollReveal("animate-fade-in-up", 200);
  const [taglineRef, taglineAnim] = useScrollReveal("animate-fade-in-up", 300);
  const [imgRef, imgAnim] = useScrollReveal("animate-fade-in", 400);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#f5f5f5] to-[#e2d1c3]">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-[#f5f5f5] to-[#e2d1c3] opacity-75"></div>
      </div>
      
      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-2xl space-y-4">
          <h1
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-4xl font-bold text-[#1A1F2C] md:text-6xl lg:text-7xl tracking-wider ${titleAnim}`}
          >
            MANSCARA
          </h1>
          <h2
            ref={subtitleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-2xl font-semibold text-[#1A1F2C] md:text-4xl tracking-wide ${subtitleAnim}`}
          >
            FACE WASH REFRESH
          </h2>
          <p
            ref={taglineRef as React.RefObject<HTMLParagraphElement>}
            className={`text-lg text-[#8E9196] md:text-xl ${taglineAnim}`}
          >
            confidence in a battle
          </p>
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
