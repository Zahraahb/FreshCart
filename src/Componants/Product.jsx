import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartCrud } from "../useCart";
import { addToWishlist } from "../useWishlist";
import { deleteWishlist, useWishMutate } from "../useWishlist";

export function Product({ prod }) {
  let [heart, setHeart] = useState(false);
  let { mutate } = useCartCrud(addToCart);
  let { mutate: mutateAddWishlist, data: dataWishlist } =
    useWishMutate(addToWishlist);
  let { mutate: mutateDelWish, data: dataWish } = useWishMutate(deleteWishlist);

  function changeHeart() {
    setHeart((current) => !current);
  }
  return (
    <div className="col-md-2">
      <div className="product cursor-pointer p-1">
        <i
          className={` fa-heart fa-lx main-color ${
            heart ? "fa-solid" : "fa-regular"
          }`}
          onClick={() => {
            changeHeart();
            !heart ? mutateAddWishlist(prod._id) : mutateDelWish(prod._id);
           
          }}
        ></i>
        <Link to={`/productDetails/${prod._id}`}>
          <img src={prod.imageCover} alt={prod.title} className="w-100 " />
          <div className="ps-1">
            <h2 className="h5 main-color">{prod.category.name}</h2>
            <p className="">{prod.title.split(" ", 2).join(" ")}</p>
          </div>
          <div className="d-flex justify-content-between mx-1">
            <span>{prod.price} EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color"> </i>{" "}
              {prod.ratingsAverage}
            </span>
          </div>
        </Link>
        <button
          className="btn btn-brdr my-2 mx-1"
          onClick={() => {
            mutate(prod._id);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
