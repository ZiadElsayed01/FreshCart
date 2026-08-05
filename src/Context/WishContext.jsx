import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  const [wishItems, setwishItems] = useState(0);

  const headers = useMemo(
    () => ({
      token: localStorage.getItem("userToken"),
    }),
    [],
  );

  function addProductToWish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers,
        },
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteWishItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  const getUserWish = useCallback(() => {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((res) => {
        setwishItems(res.data.count);
        return res;
      })
      .catch((err) => err);
  }, [headers]);

  useEffect(() => {
    getUserWish();
  }, [getUserWish]);

  return (
    <WishContext.Provider
      value={{
        addProductToWish,
        deleteWishItem,
        getUserWish,
        wishItems,
        setwishItems,
      }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
