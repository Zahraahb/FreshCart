import React from "react";
import { useParams } from "react-router-dom";
import { featuredSingleProduct, useProductDetalils } from "../useProducts";
import Loading from "./Loading";
import { addToCart, useCartCrud } from "../useCart";
import Slider from "react-slick";

export default function ProductDetails() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
    };
  let { mutate } = useCartCrud(addToCart);

  let { id } = useParams();
  let { data, isError, error, isLoading } = useProductDetalils(
    "productDetails",
    () => {
      return featuredSingleProduct(id);
    }
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="row">
      <div className="col-md-4 mb-4">
        {data?.images?.length > 1 ? (
          <Slider {...settings}>
            {data?.images?.map((img) => (
              <img key={img} src={img}></img>
            ))}
          </Slider>
        ) : (
          <img src={data?.imageCover} alt={data?.name} className="w-100" />
        )}
      </div>
      <div className="col-md-8 mt-5 pt-5">
        <p>{data?.title}</p>
        <span className="text-thin">{data?.slug}</span>
        <p className="mt-4 font-small ">{data?.category?.name}</p>
        <div className="row">
          <div className="col-md-6 font-small">
            <p>{data?.price} EGP</p>
          </div>
          <div className="col-md-6 justify-content-end d-flex">
            <span className="font-small">
              <i className="fa-solid fa-star rating-color"> </i>{" "}
              {data?.ratingsAverage}
            </span>
          </div>
          <button
            className=" btn green-btn btn-brdr text-white "
            onClick={() => {
              mutate(data?._id);
            }}
          >
            +Add to cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
