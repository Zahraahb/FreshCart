
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { getCategory, useCategories } from "./useCategories";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

 

  let { data } = useCategories('category',getCategory)

  return (
    <div className="row text-center mb-5">
      <Slider {...settings}>
        {data?.map((ele) => (
          <>
            <img
              src={ele.image}
              key={ele._id}
              className="w-100"
              height={150}
            ></img>
            <p>{ele.name}</p>
          </>
        ))}
      </Slider>
    </div>
  );
}
