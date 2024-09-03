import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 770,
      settings: {
        dots: false,
      },
    },
  ],
};

export default function MainSlider() {
  return (
    <>
      <div className="slider mt-40 md:mt-20 px-3 flex flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img
              className="w-full h-[200px] md:h-[400px]"
              src={slide1}
              alt=""
            />
            <img
              className="w-full h-[200px] md:h-[400px]"
              src={slide2}
              alt=""
            />
            <img
              className="w-full h-[200px] md:h-[400px]"
              src={slide3}
              alt=""
            />
          </Slider>
        </div>
        <div className="w-full md:w-1/4">
          <img className="w-full h-[200px] " src={slide4} alt="" />
          <img className="w-full h-[200px] " src={slide5} alt="" />
        </div>
      </div>
    </>
  );
}
