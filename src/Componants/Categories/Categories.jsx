import React from "react";
import { Helmet } from "react-helmet";
import { getCategory, useCategories } from "../../useCategories";
import MainSlide from "../../MainSlide";

export default function Categories() {
  let { data } = useCategories("categories", getCategory);
  return (
    <div className="row gy-3">
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <MainSlide></MainSlide>
      <h5 className="mb-2">Shop Popular Categories</h5>
      {data?.map((cat) => (
        <div className="col-md-3 text-center" key={cat?._id}>
          <img
            src={cat?.image}
            alt={cat?.name}
            height={300}
            className="w-100 mb-3"
          />
          <h5>{cat?.name}</h5>
        </div>
      ))}
    </div>
  );
}
