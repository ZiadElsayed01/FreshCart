import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContenxt";
import { WishContext } from "../../Context/WishContext";

import toast from "react-hot-toast";

export default function RecentProducts() {
  let products = useProducts();
  let { addProductToCart, cartItems, setCartItems } = useContext(CartContext);
  let { addProductToWish, wishItems, setwishItems, deleteWishItem } =
    useContext(WishContext);

  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
    <>
      <div className="recentproducts my-40 md:my-14">
        <h1 className="text-5xl text-center text-emerald-600 font-semibold mb-5">
          Our Products
        </h1>
        {currentProducts.length > 0 ? (
          <>
            <div className="flex flex-wrap shadow-gray-300">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
                >
                  <div className="product border border-emerald-600 rounded-lg overflow-hidden">
                    <Link
                      to={`/productdetails/${product.id}/${product.category.name}`}
                    >
                      <img
                        className="w-full"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className="text p-3">
                        <h2 className="text-emerald-600 text-2xl mb-3">
                          {product.category.name}
                        </h2>
                        <h3 className="text-lg font-semibold mb-3">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {product.price} EGP
                          </span>
                          <span className="font-semibold">
                            <i className="fa fa-star text-yellow-400 mr-3"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="btns flex items-center justify-between">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center block m-3"
                      >
                        {loading && currentId === product.id ? (
                          <i className="fa fa-spinner fa-spin fa-xl"></i>
                        ) : (
                          "Add to cart"
                        )}
                        <i className="fa-solid fa-cart-shopping ml-3"></i>
                      </button>
                      <i
                        onClick={() => toggleWish(product.id)}
                        className={`fa-heart mr-4 fa-xl cursor-pointer ${
                          wishlist.includes(product.id)
                            ? "fa-solid text-red-700"
                            : "fa-regular text-red-700"
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination flex justify-center mt-6 items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center block"
              >
                Previous
              </button>
              <span className="mx-4 font-medium text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center block"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <span className="loader my-40 block mx-auto"></span>
        )}
      </div>
    </>
  );
}
