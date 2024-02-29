import React from "react";
import Loading from "../Loading";
import { featuredProducts, useProducts } from "../../useProducts";
import { Product } from "../Product";
import MainSlide from "../../MainSlide";
import CategorySlider from "../../CategorySlider";
import { Helmet } from "react-helmet";
export default function Home() {

 let { data, isError, error, isLoading } = useProducts(
    "products",
    featuredProducts
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <MainSlide></MainSlide>
      <CategorySlider></CategorySlider>
      <div className="row gy-5">
        {data?.map((prod) => (
          <Product prod={prod} key={prod._id}></Product>
        ))}
      </div>
    </>
  );
}



