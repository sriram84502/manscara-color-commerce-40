
const AboutProduct = () => (
  <section className="bg-beige font-jakarta py-12">
    <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-5 text-black">About Manscara Facewash</h3>
        <p className="text-gray-700 mb-4">
          Developed for men, Manscara Facewash is expert-grade for oily and acne-prone skin. Its gentle formula deeply cleanses pores, controls excess oil, and clarifies the skin without harsh dryness.
        </p>
        <ul className="list-disc pl-6 text-black text-base opacity-90">
          <li>Advanced oil control with <b>Zinc PCA</b> & botanical extracts</li>
          <li>Clarifies skin & prevents breakouts</li>
          <li>Non-drying, daily use for lasting freshness</li>
          <li>Zero parabens, SLS, or artificial dyes</li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-48 h-48 bg-white rounded-full shadow-card flex items-center justify-center mb-4">
          <img
            src="/lovable-uploads/a4971b4c-6651-4f18-86ad-e8911ab235f9.png"
            alt="About Manscara"
            className="w-32 h-40 object-contain"
          />
        </div>
        <div className="bg-black/90 text-beige p-4 rounded-lg text-sm shadow-card text-center max-w-xs mt-2">
          <b>Manscara:</b> Crafted for confidence, powered by science.
        </div>
      </div>
    </div>
  </section>
);
export default AboutProduct;
