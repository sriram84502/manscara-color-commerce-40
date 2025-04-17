
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Fake reviews for demo
const REVIEWS = [
  {
    user: "Amit Patel",
    rating: 5,
    content: "Absolutely love this facewash! Leaves my skin feeling super clean and fresh. No dryness or irritation.",
  },
  {
    user: "Rohan S.",
    rating: 4,
    content: "Great oil control. Works well during summer. Smells subtle and masculine.",
  },
  {
    user: "Dev R.",
    rating: 5,
    content: "Noticeably reduced acne in a week. Highly recommend for anyone facing breakouts!",
  }
];

const ReviewsSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="bg-white font-jakarta py-12">
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h3 className="text-2xl font-bold text-black">User Reviews & Ratings</h3>
          <Button
            className="bg-black text-beige rounded-md px-6"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </Button>
        </div>
        {showForm && (
          <div className="animate-fade-in-up p-4 border border-beige rounded-lg mb-8 bg-sand/30 shadow">
            <form className="flex flex-col gap-3">
              <label className="font-semibold text-black">
                Your Review
                <textarea className="w-full mt-1 p-2 border rounded-sm border-accent" placeholder="Share your experience..." rows={3} />
              </label>
              <div className="flex items-center gap-2">
                <label className="font-semibold text-black">Your Rating:</label>
                <div className="flex gap-1">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" />
                  ))}
                </div>
              </div>
              <Button type="submit" className="self-end bg-black text-beige hover:bg-accent hover:text-black transition-all">Submit</Button>
            </form>
          </div>
        )}
        <div className="divide-y border border-beige shadow-card bg-beige/20 rounded-lg overflow-hidden">
          {REVIEWS.map((review, idx) => (
            <div key={idx} className="flex items-start gap-4 p-5 animate-fade-in-up">
              <div className="flex-shrink-0 rounded-full bg-accent w-10 h-10 flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({length: review.rating}).map((_, i) =>
                    <Star key={i} className="w-4 h-4 text-yellow-500" />
                  )}
                  {Array.from({length: 5 - review.rating}).map((_, i) =>
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div className="text-black font-bold">{review.user}</div>
                <div className="text-gray-700 text-sm mt-1">{review.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ReviewsSection;
