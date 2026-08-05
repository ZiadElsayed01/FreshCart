import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContenxt";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function Cart() {
  const {
    getUserCart,
    updateCartProduct,
    deleteCartItem,
    clearCart,
    cartItems,
    setCartItems,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [clearingCart, setClearingCart] = useState(false);

  async function updateProduct(id, count) {
    if (count < 1) return;
    setUpdatingProductId(id);
    try {
      const response = await updateCartProduct(id, count);
      if (response?.data?.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Product Updated Successfully");
      } else {
        toast.error("Product Not Updated");
      }
    } catch {
      toast.error("An error occurred while updating the product.");
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function deleteItem(productId) {
    try {
      const response = await deleteCartItem(productId);
      if (response?.data?.status === "success") {
        setCartItems(cartItems - 1);
        setCartDetails(response.data.data);
        toast.success("Product Removed Successfully");
      } else {
        toast.error("Product Not Removed");
      }
    } catch {
      toast.error("An error occurred while removing the product.");
    }
  }

  async function handleClearCart() {
    setClearingCart(true);
    try {
      const response = await clearCart();
      if (response?.data?.message === "success") {
        setCartDetails(response.data.data);
        setCartItems(0);
        toast.success("Cart Cleared Successfully");
      } else {
        toast.error("Failed to Clear Cart");
      }
    } catch {
      toast.error("An error occurred while clearing the cart.");
    }
    setClearingCart(false);
  }

  useEffect(() => {
    async function getCartItems() {
      setLoading(true);
      try {
        const response = await getUserCart();
        if (response?.data?.status === "success") {
          setCartDetails(response.data.data);
        } else {
          toast.error("Failed to load cart items.");
        }
      } catch {
        toast.error("An error occurred while loading cart items.");
      } finally {
        setLoading(false);
      }
    }

    getCartItems();
  }, [getUserCart]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cartDetails?.products?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Shopping Cart ({cartDetails.products.length} items)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartDetails.products.map((product) => (
                    <div key={product.product.id}>
                      <div className="flex gap-4">
                        <Link
                          to={`/productdetails/${product.product.id}/${product.product.category.name}`}
                        >
                          <img
                            src={product.product.imageCover}
                            className="w-24 h-24 object-cover rounded-lg"
                            alt={product.product.title}
                          />
                        </Link>
                        <div className="flex-1 space-y-2">
                          <Link
                            to={`/productdetails/${product.product.id}/${product.product.category.name}`}
                          >
                            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                              {product.product.title}
                            </h3>
                          </Link>
                          <Badge variant="secondary" className="text-xs">
                            {product.product.category.name}
                          </Badge>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                {product.price} EGP
                              </span>
                              <span className="text-muted-foreground text-sm">
                                x {product.count}
                              </span>
                            </div>
                            <span className="font-bold">
                              {product.price * product.count} EGP
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateProduct(
                                    product.product.id,
                                    product.count - 1,
                                  )
                                }
                                disabled={
                                  updatingProductId === product.product.id ||
                                  product.count <= 1
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {updatingProductId === product.product.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                                ) : (
                                  product.count
                                )}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateProduct(
                                    product.product.id,
                                    product.count + 1,
                                  )
                                }
                                disabled={
                                  updatingProductId === product.product.id
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteItem(product.product.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {cartDetails?.totalCartPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {cartDetails?.totalCartPrice} EGP
                    </span>
                  </div>
                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    className="w-full"
                    disabled={clearingCart}
                  >
                    {clearingCart ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Cart
                      </>
                    )}
                  </Button>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6 pb-6">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
