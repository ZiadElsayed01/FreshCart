import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllOrders() {
  const [userID, setuserID] = useState("");
  const [orders, setorders] = useState([]);

  async function getId() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      setuserID(res.data.decoded.id);
    } catch (err) {
      console.error(err);
    }
  }

  async function getOrders(userID) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`
      );
      setorders(res.data);
    } catch (err) {
      console.log(err);
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
    <>
      {orders && orders.length > 0 ? (
        <div className="orders my-40 md:my-14">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order bg-white shadow-lg rounded-lg p-6 mb-6"
            >
              <div className="details flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h2 className="text-emerald-600 text-3xl mb-3 font-bold">
                    {order.shippingAddress.details}
                  </h2>
                  <p className="font-semibold text-xl mt-3">
                    City: {order.shippingAddress.city}
                  </p>
                  <p className="font-semibold text-xl mt-3">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
              <div className="cartItems mt-3">
                <h3 className="text-lg text-gray-600 mb-3">
                  Items in this order: {order.cartItems.length}
                </h3>
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="cartItem flex items-center flex-col md:flex-row gap-8 border-t border-gray-200 pt-3"
                  >
                    <div className="image">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-[250px]"
                      />
                    </div>
                    <div className="content w-full">
                      <p className="font-semibold text-2xl text-emerald-600">
                        {item.product.title}
                      </p>
                      <p className="font-semibold text-2xl mt-3">
                        {item.product.category.name}
                      </p>
                      <img
                        src={item.product.brand.image}
                        alt={item.product.brand.name}
                        className="w-[80px] mt-3"
                      />
                      <p className="text-emerald-600 text-xl mb-3">
                        <span className="text-black font-semibold">
                          Quantity:{" "}
                        </span>
                        {item.count}
                      </p>
                      <p className="text-emerald-600 text-xl mb-3">
                        <span className="text-black font-semibold">
                          Price:{" "}
                        </span>
                        ${item.price * item.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : orders ? (
        <span className="loader my-40 block mx-auto"></span>
      ) : (
        <h1 className="text-emerald-600 font-semibold text-3xl md:text-4xl my-24 md:my-32 w-11/12 md:w-3/4 mx-auto text-center p-5">
          No Orders
        </h1>
      )}
    </>
  );
}
