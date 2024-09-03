import axios from "axios";
import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setproducts] = useState([]);
  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      setproducts(res.data.data);
    });
  }
  useEffect(() => {
    getProducts();
  }, []);

  return products;
}
