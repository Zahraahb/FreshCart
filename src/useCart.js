import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";

export const baseUrl = "https://ecommerce.routemisr.com/api/v1";
export const token = localStorage.getItem("userToken");

//add to cart
export function addToCart(productId) {
  return axios.post(
    `${baseUrl}/cart`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

//get from cart
export function getCart() {
  return axios.get(`${baseUrl}/cart`, {
    headers: {
      token,
    },
  });
}

//delete from cart
export function deleteCart(id) {
  return axios.delete(`${baseUrl}/cart/${id}`, {
    headers: {
      token,
    },
  });
}

//update cart
export function updateCart({ id, count }) {
  return axios.put(
    `${baseUrl}/cart/${id}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );
}

//checkout
export function checkout({ id, shippingAddress }) {
  return axios.post(
    `${baseUrl}/orders/checkout-session/${id}?url=http://localhost:3001`,
    { shippingAddress },
    {
      headers: {
        token,
      },
    }
  );
}
export function useCartCrud(fun) {
  const queryClient = useQueryClient();
  return useMutation(fun, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries("cartItems");
    },
    onError: (date) => {
      toast.error(date.message);
    },
   
  });
}

export function useCartGet(key, fun) {
  return useQuery(key, fun);
}
