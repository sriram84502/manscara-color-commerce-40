
const Checkout = () => (
  <div className="min-h-screen bg-beige font-jakarta">
    <div className="container max-w-xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-black mb-5">Checkout</h2>
      <div className="bg-white rounded-lg p-8 border border-beige shadow-card">
        <div className="flex flex-col gap-4">
          <span className="font-bold text-xl text-black">Manscara Facewash (100mL)</span>
          <span className="text-sm text-gray-600">1x ₹299</span>
          <span className="text-lg font-semibold text-black py-1">Total: ₹299</span>
        </div>
        <button
          className="w-full mt-6 bg-black text-beige py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 hover:bg-accent hover:text-black"
        >
          Pay Now (coming soon)
        </button>
      </div>
      <div className="text-sm text-gray-600 mt-4 text-center">
        Secure payments &mdash; Stripe/UPI/Cards (login for real purchases)
      </div>
    </div>
  </div>
);
export default Checkout;
