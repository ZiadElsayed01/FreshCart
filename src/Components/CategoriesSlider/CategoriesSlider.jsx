import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="slider mt-14 px-3">
        <h2 className="text-emerald-600 text-2xl mb-3 font-bold">
          Shop Popular Categories
        </h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img
                src={category.image}
                className="w-full h-[420px] md:h-[250px] object-cover"
                alt={category.name}
              />
              <h2 className="text-lg">{category.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
