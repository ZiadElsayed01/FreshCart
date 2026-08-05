import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Categories() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  function getCategories() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
        // Check if there's a selected category from navigation state
        const selectedCategoryId = location.state?.selectedCategoryId;
        if (selectedCategoryId) {
          const category = res.data.data.find(
            (c) => c._id === selectedCategoryId,
          );
          if (category) {
            setSelectedCategory(category);
          } else if (res.data.data.length > 0) {
            setSelectedCategory(res.data.data[0]);
          }
        } else if (res.data.data.length > 0 && !selectedCategory) {
          setSelectedCategory(res.data.data[0]);
        }
      })
      .finally(() => setLoading(false));
  }

  function getCategoryProducts(categoryId) {
    setProductsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        const filtered = res.data.data.filter(
          (product) => product.category._id === categoryId,
        );
        setCategoryProducts(filtered);
      })
      .finally(() => setProductsLoading(false));
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    getCategoryProducts(category._id);
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getCategoryProducts(selectedCategory._id);
    }
  }, [selectedCategory]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">
          Categories
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Browse products by category
        </p>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 max-h-[50vh] overflow-y-scroll">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">All Categories</h2>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                          selectedCategory?._id === category._id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        <span className="truncate">{category.name}</span>
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {selectedCategory && (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  {selectedCategory.name}
                </h2>
                {productsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="aspect-square w-full" />
                        <CardContent className="p-4 space-y-3">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-6 w-1/4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : categoryProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categoryProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <img
                            className="w-full h-full object-cover"
                            src={product.imageCover}
                            alt={product.title}
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {product.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">
                              {product.price} EGP
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No products found in this category
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
