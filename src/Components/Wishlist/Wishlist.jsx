import { useState, useEffect, useContext } from "react";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContenxt";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Trash2, ShoppingCart, Heart, Loader2 } from "lucide-react";

export default function Wishlist() {
  const { deleteWishItem, getUserWish, wishItems, setwishItems } =
    useContext(WishContext);
  let { addProductToCart, cartItems, setCartItems } = useContext(CartContext);
  const [wishDetails, setWishDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  async function addToCart(id) {
    setCurrentId(id);
    setIsAddingToCart(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      await deleteItem(id);
    } else {
      toast.error(response.data.message);
    }
    setIsAddingToCart(false);
  }

  async function getWishItems() {
    setLoading(true);
    const response = await getUserWish();
    if (response?.data?.status === "success") {
      setWishDetails(response.data.data);
    } else {
      toast.error("Failed to load wishlist items.");
    }
    setLoading(false);
  }

  async function deleteItem(productId) {
    setDeletingProductId(productId);

    const updatedWishDetails = wishDetails.filter(
      (item) => item.id !== productId,
    );
    setWishDetails(updatedWishDetails);

    const response = await deleteWishItem(productId);
    if (response?.data?.status === "success") {
      setwishItems(wishItems - 1);
      toast.success("Product Removed Successfully");
    } else {
      setWishDetails(wishDetails);
      toast.error("Product Not Removed");
    }

    setDeletingProductId(null);
  }

  useEffect(() => {
    getWishItems();
  }, []);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            Items you&apos;ve saved for later
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        ) : wishDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishDetails.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link
                  to={`/productdetails/${item?.id}/${item?.category?.name}`}
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      className="w-full h-full object-cover"
                      src={item.imageCover}
                      alt={item.title}
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link
                    to={`/productdetails/${item?.id}/${item?.category?.name}`}
                  >
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary">
                      ${item.price}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={() => addToCart(item.id)}
                      className="w-full"
                      disabled={isAddingToCart && currentId === item.id}
                    >
                      {isAddingToCart && currentId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => deleteItem(item.id)}
                      variant="outline"
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                      disabled={deletingProductId === item.id}
                    >
                      {deletingProductId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Save items you love by clicking the heart icon on products.
              </p>
              <Button asChild>
                <Link to="/products" className="flex items-center">
                  Browse Products
                  <ShoppingCart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
