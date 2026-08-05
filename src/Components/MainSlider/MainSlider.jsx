import Slider from "react-slick";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";
import { Card } from "../../Components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
      },
    },
  ],
};

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "white",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "white",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
}

export default function MainSlider() {
  return (
    <div className="slider-container py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Slider */}
        <div className="w-full lg:w-3/4">
          <Card className="overflow-hidden border-0 shadow-lg">
            <Slider {...settings}>
              <img
                className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                src={slide1}
                alt="Promotion 1"
              />
              <img
                className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                src={slide2}
                alt="Promotion 2"
              />
              <img
                className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                src={slide3}
                alt="Promotion 3"
              />
            </Slider>
          </Card>
        </div>

        {/* Side Banners */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <Card className="overflow-hidden border-0 shadow-lg flex-1">
            <img
              className="w-full h-full min-h-[120px] md:min-h-[170px] lg:min-h-[215px] object-cover hover:scale-105 transition-transform duration-300"
              src={slide4}
              alt="Grocery Banner"
            />
          </Card>
          <Card className="overflow-hidden border-0 shadow-lg flex-1">
            <img
              className="w-full h-full min-h-[120px] md:min-h-[170px] lg:min-h-[215px] object-cover hover:scale-105 transition-transform duration-300"
              src={slide5}
              alt="Grocery Banner 2"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
