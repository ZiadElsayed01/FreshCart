import { createContext, useContext, useState } from "react";

const ReviewsContext = createContext({
  reviews: [],
  addReview: () => {},
  getProductReviews: () => {},
});

// Local storage key for reviews
const STORAGE_KEY = "freshcart-reviews";

export function ReviewsContextProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Failed to parse reviews:", error);
        return [];
      }
    }
    return [];
  });

  const addReview = (productId, review) => {
    const newReview = {
      id: Date.now(),
      productId,
      ...review,
      date: new Date().toISOString(),
    };
    setReviews((prev) => {
      const updated = [...prev, newReview];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getProductReviews = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsContextProvider");
  }
  return context;
};
