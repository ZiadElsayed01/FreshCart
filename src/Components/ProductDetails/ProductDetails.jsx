import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContenxt";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedproducts, setrelatedproducts] = useState([]);
  let { addProductToCart } = useContext(CartContext);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  let { cartItems, setCartItems } = useContext(CartContext);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setCartItems(cartItems + 1);
      toast.success(response.data.message);
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

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
        (product) => product.category.name == category
      );
      setrelatedproducts(related);
    });
  }

  useEffect(() => {
    getProductsDetails(id);
    getProducts();
  }, [id, category]);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  var settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {product ? (
        <>
          <div className="productdetails">
            <div className="flex flex-wrap items-center py-20 md:py-8 mt-40 md:mt-24 px-8">
              <div className="w-full md:w-1/4 md:mr-5">
                <Slider {...settings}>
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <img className="w-full" src={image} alt={product.title} />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="w-full md:w-[70%] mt-3">
                <h2 className="text-emerald-600 text-2xl mb-3 font-bold">
                  {product?.title}
                </h2>
                <h3 className="text-lg font-medium mb-3">
                  {product?.description}
                </h3>
                <h4 className="text-lg mb-3 text-gray-600">
                  {product?.category.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">
                    {product.price} EGP
                  </span>
                  <span className="font-semibold text-lg">
                    <i className="fa fa-star text-yellow-400 mr-3"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm w-full px-5 py-3 text-center block my-3"
                >
                  {loading && currentId == product.id ? (
                    <i className="fa fa-spinner fa-spin fa-xl"></i>
                  ) : (
                    "Add to cart"
                  )}
                  <i className="fa-solid fa-cart-shopping ml-3"></i>
                </button>
              </div>
            </div>
            <div className="">
              <h1 className="text-emerald-600 text-2xl mb-3 font-bold ml-3">
                Related Products
              </h1>
              <div className="content shadow-gray-300 ">
                <Slider {...settings1}>
                  {relatedproducts.map((product) => (
                    <div key={product.id} className="p-4">
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
                        <button
                          onClick={() => addToCart(product.id)}
                          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center block m-3"
                        >
                          {loading && currentId == product.id ? (
                            <i className="fa fa-spinner fa-spin fa-xl"></i>
                          ) : (
                            "Add to cart"
                          )}
                          <i className="fa-solid fa-cart-shopping ml-3"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </>
      ) : (
        <span className="loader my-24 block mx-auto"></span>
      )}
    </>
  );
}
