import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { baseUrl, token } from "./useCart";

//add to whishlist
export function addToWishlist(productId) {
  return axios.post(
    `${baseUrl}/wishlist`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

//delete from Wishlist
export function deleteWishlist(id) {
  return axios.delete(`${baseUrl}/wishlist/${id}`, {
    headers: {
      token,
    },
  });
}

//get wishlist
export function getWishlist() {
  return axios.get(`${baseUrl}/wishlist`,{
    headers:{
        token,
        
    },
  });
}

export function useWishlistQuery(key,fun){
    return useQuery(key,fun)

}

export function useWishMutate(fun) {
  const queryClient = useQueryClient();
  return useMutation(fun, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries("getWishlist");
    },
    onError: (date) => {
      toast.error(date.message);
    },
  });
}
