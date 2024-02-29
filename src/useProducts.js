import axios from "axios";
import { useQuery } from "react-query";

export function featuredProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}
export function featuredSingleProduct(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

export function useProducts(key, fun) {
  return useQuery(key, fun, {
    select: (data) => data.data.data,
  });
}
export function useProductDetalils(key, fun) {
  return useQuery(key, fun, {
    select: (data) => data.data.data,
    cacheTime:500,
  });
}
