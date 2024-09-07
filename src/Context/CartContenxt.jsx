import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState("");
  const [cartItems, setCartItems] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setCartId(res.data.data._id);
        setCartItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProduct(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        updateCartProduct,
        deleteCartItem,
        clearCart,
        checkout,
        cartId,
        cartItems,
        setCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
