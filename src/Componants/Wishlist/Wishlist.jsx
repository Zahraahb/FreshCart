import React from "react";
import {
  getWishlist,
  useWishlistQuery,
  useWishMutate,
  deleteWishlist,
} from "../../useWishlist";
import Loading from "../Loading";
import { useCartCrud, addToCart } from "../../useCart";

export default function Wishlist() {
  let { data, isLoading, isError } = useWishlistQuery(
    "getWishlist",
    getWishlist
  );
  console.log(data);
  let { mutate: mutateDelWish, data: dataWish } = useWishMutate(deleteWishlist);
  let { mutate } = useCartCrud(addToCart);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h3 className="main-color mt-5">Nothing in wishlist</h3>;
  }
  return (
    <>
      {data?.data.count ? (
        <>
          {data?.data?.data.map((prod) => (
            <div className="row gy-1 my-2 border-bottom py-2" key={prod._id}>
              <div className="col-md-1">
                <img src={prod?.imageCover} alt="" className="w-100" />
              </div>
              <div className="col-md-4 mt-4">
                <p className="my-1">{prod?.title}</p>
                <p className="my-1">price: {prod?.price} EGP</p>
                <span
                  className="cursor-pointer main-color"
                  onClick={() => mutateDelWish(prod?._id)}
                >
                  <i className="fa-regular fa-trash-can me-2 main-color"></i>
                  Remove from wishlist
                </span>
              </div>
              <div className="col-md-7 d-flex justify-content-end align-items-center">
                <button
                  className="btn green-btn text-white"
                  onClick={() => {
                    mutate(prod._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h3 className="main-color mt-5">Nothing in wishlist</h3>
      )}
    </>
  );
}
