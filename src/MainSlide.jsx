import React from "react";
import Slider from "react-slick";
import slider1 from "../src/assets/slider-image-1.jpeg";
import slider2 from "../src/assets/slider-image-2.jpeg";
import slider3 from "../src/assets/slider-image-3.jpeg";
import blog1 from "../src/assets/blog-img-1.jpeg";
import blog2 from "../src/assets/blog-img-2.jpeg";

export default function MainSlide() {
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
  return (
    <header>
      <div className="row gx-0 mb-5">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={slider1} alt="" height={400} />
            <img src={slider2} alt="" height={400} />
            <img src={slider3} alt="" height={400} />
          </Slider>
        </div>
        <div className="col-md-3">
          <img src={blog1} alt="" className="w-100 h-50" />
          <img src={blog2} alt="" className="w-100 h-50" />
        </div>
      </div>
    </header>
  );
}
