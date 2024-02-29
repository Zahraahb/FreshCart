import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading";
import { Product } from "../Product";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data, isLoading, isError, error } = useQuery("brands", getBrands, {
    select: (data) => data?.data?.data,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="row gy-4">
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {data?.map((ele) => (
        <div className="col-md-3 text-center" key={ele._id}>
          <div className="item">
            <img
              src={ele.image}
              alt={ele.name}
              className="w-100 border border-2 mb-3"
            />
            <h3>{ele.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
