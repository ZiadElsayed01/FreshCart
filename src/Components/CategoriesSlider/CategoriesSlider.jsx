import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Card, CardContent } from "../../Components/ui/card";
import { Badge } from "../../Components/ui/badge";

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div className="py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">
            Shop Popular Categories
          </h2>
          <Badge variant="secondary" className="text-sm">
            {categories.length} Categories
          </Badge>
        </div>
        {categories.length > 0 ? (
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id} className="px-2">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={category.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        alt={category.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-center truncate">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}
