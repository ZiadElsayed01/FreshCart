import React, { useState, useEffect, useContext } from "react";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContenxt";

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
      (item) => item.id !== productId
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
    <div className="wishlist my-40 md:my-14 flex flex-wrap justify-between">
      {loading ? (
        <span className="loader my-40 block mx-auto"></span>
      ) : wishDetails.length > 0 ? (
        wishDetails.map((item) => (
          <div
            key={item.id}
            className="wishlistItem bg-white shadow-lg rounded-lg p-6 mb-6 w-full"
          >
            <div className="details flex flex-col md:flex-row justify-between items-center gap-5">
              <div className="image">
                <Link
                  to={`/productdetails/${item?.id}/${item?.category?.name}`}
                >
                  <img
                    className="w-[250px]"
                    src={item.imageCover}
                    alt={item.title}
                  />
                </Link>
              </div>
              <div className="w-full">
                <h2 className="text-emerald-600 text-3xl mb-3 font-bold">
                  {item.title}
                </h2>
                <p className="text-lg mt-3">{item.description}</p>
                <img
                  src={item?.brand?.image}
                  alt={item?.brand?.name}
                  className="w-[100px]"
                />
                <p className="font-semibold text-xl mt-3">${item.price}</p>
                <div className="mt-3">
                  <button
                    className="deleteButton text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
                    onClick={() => deleteItem(item.id)}
                    disabled={deletingProductId === item.id}
                  >
                    {deletingProductId === item.id ? (
                      <i className="fa fa-spinner fa-spin fa-xl"></i>
                    ) : (
                      "Remove"
                    )}
                  </button>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center block my-3"
                    disabled={isAddingToCart && currentId === item.id}
                  >
                    {isAddingToCart && currentId === item.id ? (
                      <i className="fa fa-spinner fa-spin fa-xl"></i>
                    ) : (
                      "Add to cart"
                    )}
                    <i className="fa-solid fa-cart-shopping ml-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-emerald-600 font-semibold text-3xl md:text-4xl my-24 md:my-32 w-11/12 md:w-3/4 mx-auto text-center p-5">
          Your wishlist is empty
        </h1>
      )}
    </div>
  );
}
