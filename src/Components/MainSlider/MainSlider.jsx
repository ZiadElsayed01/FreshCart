import Slider from "react-slick";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";
import { Card } from "../ui/card";

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
};

export default function MainSlider() {
  return (
    <div className="slider-container pb-0 pt-6 lg:py-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Slider */}
        <div className="w-full lg:w-3/4">
          <Card className="overflow-hidden border-0 shadow-lg">
            <Slider {...settings}>
              <div className="relative">
                <img
                  className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                  src={slide1}
                  alt="Promotion 1"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                    Shop Everything You Need
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-center max-w-lg">
                    Discover amazing products at unbeatable prices.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                    I&apos;m buying!
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                  src={slide2}
                  alt="Promotion 2"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                    Shop Everything You Need
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-center max-w-lg">
                    Discover amazing products at unbeatable prices.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                    I&apos;m buying!
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                  src={slide3}
                  alt="Promotion 3"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                    Shop Everything You Need
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-center max-w-lg">
                    Discover amazing products at unbeatable prices.
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                    I&apos;m buying!
                  </button>
                </div>
              </div>
            </Slider>
          </Card>
        </div>

        {/* Side Banners */}
        <div className="w-full flex lg:w-1/4 flex-col gap-4">
          <Card className="overflow-hidden border-0 shadow-lg flex-1 relative">
            <img
              className="w-full h-full min-h-[120px] md:min-h-[170px] lg:min-h-[215px] object-cover hover:scale-105 transition-transform duration-300"
              src={slide4}
              alt="Grocery Banner"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-center text-white px-4">
              <h3 className="text-lg md:text-xl font-bold mb-1">
                Fresh Groceries
              </h3>
              <p className="text-sm md:text-base">
                Quality products for your home
              </p>
            </div>
          </Card>
          <Card className="overflow-hidden border-0 shadow-lg flex-1 relative">
            <img
              className="w-full h-full min-h-[120px] md:min-h-[170px] lg:min-h-[215px] object-cover hover:scale-105 transition-transform duration-300"
              src={slide5}
              alt="Ecommerce Banner 2"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-center text-white p-4">
              <h3 className="text-lg md:text-xl font-bold mb-1">Flash Sale</h3>
              <p className="text-sm md:text-base">Limited time offers</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
