import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContenxt";
import { useRecentlyViewed } from "../../Context/RecentlyViewedContext";
import { useReviews } from "../../Context/ReviewsContext";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  ShoppingCart,
  Star,
  Loader2,
  Package,
  Tag,
  MessageSquare,
} from "lucide-react";

export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedproducts, setrelatedproducts] = useState([]);
  let { addProductToCart } = useContext(CartContext);
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addReview, getProductReviews } = useReviews();
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  let { cartItems, setCartItems } = useContext(CartContext);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response?.data?.message || "Failed to add to cart");
      setloading(false);
    }
  }

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      toast.error("Please enter a review");
      return;
    }
    if (product) {
      addReview(product.id, {
        text: reviewText,
        rating: reviewRating,
        userName: "Anonymous",
      });
      toast.success("Review added successfully!");
      setReviewText("");
      setReviewRating(5);
      setShowReviewForm(false);
    }
  };

  let { id, category } = useParams();

  function getProductsDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      });
  }

  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter(
        (product) => product.category.name == category,
      );
      setrelatedproducts(related);
    });
  }

  useEffect(() => {
    getProductsDetails(id);
    getProducts();
  }, [id, category]);

  // Add to recently viewed when product is loaded
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        title: product.title,
        price: product.price,
        priceAfterDiscount: product.priceAfterDiscount,
        imageCover: product.imageCover,
        category: product.category,
        ratingsAverage: product.ratingsAverage,
      });
    }
  }, [product, addToRecentlyViewed]);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };

  var settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-8">
      <div className="max-w-screen-xl mx-auto">
        {product ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Product Images */}
              <div className="space-y-4">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <Slider {...settings}>
                      {product.images.map((image, index) => (
                        <div key={index}>
                          <img
                            className="w-full aspect-square object-cover"
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </CardContent>
                </Card>
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((image, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    >
                      <img
                        className="w-full aspect-square object-cover"
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </Card>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    <Tag className="h-3 w-3 mr-1" />
                    {product?.category.name}
                  </Badge>
                  <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {product?.description}
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-2 text-2xl font-bold">
                        {product.ratingsAverage}
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <span className="text-muted-foreground">
                      {product.ratingsQuantity} reviews
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">
                        In Stock
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <span className="text-muted-foreground">
                      Brand: {product?.brand?.name || "N/A"}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-primary">
                      {product.price} EGP
                    </span>
                    {product.priceAfterDiscount && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          {product.priceAfterDiscount} EGP
                        </span>
                        <Badge variant="destructive">
                          Save{" "}
                          {Math.round(
                            ((product.priceAfterDiscount - product.price) /
                              product.priceAfterDiscount) *
                              100,
                          )}
                          %
                        </Badge>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={() => addToCart(product.id)}
                    disabled={loading && currentId === product.id}
                    size="lg"
                    className="w-full"
                  >
                    {loading && currentId === product.id ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              {relatedproducts.length > 0 ? (
                <Slider {...settings1}>
                  {relatedproducts.slice(0, 10).map((relatedProduct) => (
                    <div key={relatedProduct.id} className="px-2">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                        <Link
                          to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}
                        >
                          <div className="relative aspect-square overflow-hidden bg-muted">
                            <img
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              src={relatedProduct.imageCover}
                              alt={relatedProduct.title}
                            />
                            <Badge
                              className="absolute top-3 left-3"
                              variant="secondary"
                            >
                              {relatedProduct.category.name}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                              {relatedProduct.title
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">
                                {relatedProduct.ratingsAverage}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">
                                {relatedProduct.price} EGP
                              </span>
                            </div>
                          </CardContent>
                        </Link>
                        <div className="p-4 pt-0">
                          <Button
                            onClick={() => addToCart(relatedProduct.id)}
                            disabled={
                              loading && currentId === relatedProduct.id
                            }
                            size="sm"
                            className="w-full"
                          >
                            {loading && currentId === relatedProduct.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
                </Slider>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No related products found
                </p>
              )}
            </div>

            {/* Reviews Section */}
            {product && (
              <div className="mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Customer Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Add Review Form */}
                      <div className="border-b pb-6">
                        <Button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          variant="outline"
                          className="w-full"
                        >
                          {showReviewForm ? "Cancel" : "Write a Review"}
                        </Button>

                        {showReviewForm && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label>Rating</Label>
                              <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setReviewRating(star)}
                                    className="focus:outline-none"
                                  >
                                    <Star
                                      className={`h-6 w-6 ${
                                        star <= reviewRating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="review">Your Review</Label>
                              <Textarea
                                id="review"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience with this product..."
                                className="mt-2"
                              />
                            </div>
                            <Button
                              onClick={handleSubmitReview}
                              className="w-full"
                            >
                              Submit Review
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Reviews List */}
                      <div className="space-y-4">
                        {getProductReviews(product.id).length > 0 ? (
                          getProductReviews(product.id).map((review) => (
                            <div
                              key={review.id}
                              className="border-b pb-4 last:border-0"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    {review.userName}
                                  </span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-muted-foreground">
                                {review.text}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center py-4">
                            No reviews yet. Be the first to review this product!
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
