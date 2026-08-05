import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { MapPin, Package, ShoppingBag } from "lucide-react";

export default function AllOrders() {
  const [userID, setuserID] = useState("");
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getId() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      );

      setuserID(res.data.decoded.id);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function getOrders(userID) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`,
      );
      setorders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (userID) {
      getOrders(userID);
    }
  }, [userID]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your order history
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {order.cartItems.length} items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Shipping Info */}
                  <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Address</p>
                        <p className="font-medium">
                          {order.shippingAddress.details}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">City</p>
                        <p className="font-medium">
                          {order.shippingAddress.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">
                          {order.shippingAddress.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Order Items
                    </h3>
                    <div className="space-y-4">
                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-full md:w-32 h-32 flex-shrink-0">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg truncate">
                              {item.product.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.product.category.name}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Qty: {item.count}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-primary">
                                  ${item.price * item.count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven&apos;t placed any orders yet. Start shopping to see
                your orders here.
              </p>
              <Link to="/products">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors">
                  Browse Products
                </button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
