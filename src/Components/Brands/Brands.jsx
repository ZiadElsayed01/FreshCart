import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  function getBrands() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setBrands(res.data.data);
        if (res.data.data.length > 0 && !selectedBrand) {
          setSelectedBrand(res.data.data[0]);
        }
      })
      .finally(() => setLoading(false));
  }

  function getBrandProducts(brandId) {
    setProductsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        const filtered = res.data.data.filter(
          (product) => product.brand._id === brandId,
        );
        setBrandProducts(filtered);
      })
      .finally(() => setProductsLoading(false));
  }

  function handleBrandClick(brand) {
    setSelectedBrand(brand);
    getBrandProducts(brand._id);
  }

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      getBrandProducts(selectedBrand._id);
    }
  }, [selectedBrand]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">
          Brands
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Browse products by brand
        </p>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 max-h-[50vh] overflow-y-scroll">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">All Brands</h2>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {brands.map((brand) => (
                      <button
                        key={brand._id}
                        onClick={() => handleBrandClick(brand)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                          selectedBrand?._id === brand._id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        <span className="truncate">{brand.name}</span>
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
            {selectedBrand && (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  {selectedBrand.name}
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
                ) : brandProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {brandProducts.map((product) => (
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
                      No products found for this brand
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
