
const Orders = () => (
  <div className="min-h-screen bg-beige font-jakarta">
    <div className="container max-w-2xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-black mb-4">Your Orders</h2>
      <div className="p-6 bg-white rounded-lg shadow-card border border-beige text-gray-600">
        <p className="mb-2">Login to view your Manscara Facewash order history.</p>
        <div className="grid place-items-center">
          <button className="bg-black text-beige px-6 py-2 rounded-md font-semibold hover:bg-accent hover:text-black transition-all">
            Login / Signup
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-xs">
        *Once logged in, all your recent and past orders will be shown here.
      </div>
    </div>
  </div>
);

export default Orders;
