import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContenxt";
import { WishContext } from "../../Context/WishContext";
import { SearchContext } from "../../Context/SearchContext";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  ShoppingCart,
  Heart,
  Star,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "../../lib/utils";

export default function RecentProducts() {
  let products = useProducts();
  let { addProductToCart, cartItems, setCartItems } = useContext(CartContext);
  let { addProductToWish, wishItems, setwishItems, deleteWishItem } =
    useContext(WishContext);
  const { searchQuery } = useContext(SearchContext);

  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filterCategory, setFilterCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category?.name))];

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Category filter
      if (filterCategory === "all") return true;
      return product.category?.name === filterCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.ratingsAverage - a.ratingsAverage;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  async function toggleWish(id) {
    if (wishlist.includes(id)) {
      let response = await deleteWishItem(id);
      if (response?.data?.status === "success") {
        setwishItems(wishItems - 1);
        setWishlist(wishlist.filter((itemId) => itemId !== id));
        toast.success("Product Removed Successfully");
      } else {
        toast.error("Product Not Removed");
      }
    } else {
      let response = await addProductToWish(id);
      if (response?.data?.status === "success") {
        setwishItems(wishItems + 1);
        setWishlist([...wishlist, id]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  }

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Discover our latest collection of quality products
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {filterCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {filterCategory}
                <button
                  onClick={() => setFilterCategory("all")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => setSortBy("default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>
                Highest Rated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Name: A to Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20"
                >
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                    className="block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge
                          className="bg-primary/90 hover:bg-primary"
                          variant="secondary"
                        >
                          {product.category.name}
                        </Badge>
                        {product.priceAfterDiscount && (
                          <Badge
                            className="bg-red-500 hover:bg-red-600"
                            variant="destructive"
                          >
                            {Math.round(
                              ((product.priceAfterDiscount - product.price) /
                                product.priceAfterDiscount) *
                                100,
                            )}
                            % OFF
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions Overlay */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWish(product.id);
                          }}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              wishlist.includes(product.id) &&
                                "fill-red-500 text-red-500",
                            )}
                          />
                        </Button>
                      </div>
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link
                      to={`/productdetails/${product.id}/${product.category.name}`}
                    >
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(product.ratingsAverage)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200",
                            )}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">
                          {product.ratingsAverage.toFixed(1)}
                        </span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="text-sm text-muted-foreground">
                        {product.ratingsQuantity} reviews
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">
                          {product.price} EGP
                        </span>
                        {product.priceAfterDiscount && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.priceAfterDiscount} EGP
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4 pt-4">
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={loading && currentId === product.id}
                      className="flex-1 group-hover:bg-primary/90 transition-colors"
                      size="sm"
                    >
                      {loading && currentId === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to cart
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="icon"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className="w-8 h-8"
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/4" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
