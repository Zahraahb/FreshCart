import React from "react";
import Loading from "../Loading";
import { featuredProducts, useProducts } from "../../useProducts";
import { Product } from "../Product";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function Products() {
  let { data, isError, error, isLoading } = useProducts(
    "products",
    featuredProducts
  );

  const [searchedArr, setSearchedArr] = useState([]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  function search(e) {
    let term = e.target.value;
    let arr = data?.filter((ele) =>
      ele.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArr(arr);
  }

  return (
    <>
      <div className=" my-5 w-50 m-auto">
        <label htmlFor="product" className="d-block mb-3 main-color h5">
          Search for product:
        </label>
        <input
          id="product"
          type="text"
          className="form-control  bg-light "
          onChange={search}
        />
      </div>
      <div className="row gy-5">
        <Helmet>
          <title>Products</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        {searchedArr.length
          ? searchedArr?.map((prod) => (
              <Product prod={prod} key={prod._id}></Product>
            ))
          : data?.map((prod) => <Product prod={prod} key={prod._id}></Product>)}
      </div>
    </>
  );
}
