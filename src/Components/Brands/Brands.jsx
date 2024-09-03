import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandsModal from "../BrandsModal/BrandsModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((res) => {
      setBrands(res.data.data);
    });
  }

  function handleBrandClick(brand) {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="catogries mt-40 md:mt-14">
        <h1 className="text-5xl text-center text-emerald-600 font-semibold mb-5">
          Our Brands
        </h1>
        {brands.length > 0 ? (
          <div className="flex flex-wrap">
            {brands.map((brand) => (
              <div key={brand._id} className="w-full md:w-1/4 p-3">
                <div
                  className="brand border border-emerald-600 rounded-lg overflow-hidden p-5 cursor-pointer"
                  onClick={() => handleBrandClick(brand)}
                >
                  <img
                    className="w-full h-[200px]"
                    src={brand.image}
                    alt={brand.name}
                  />
                  <h2 className="m-3 text-emerald-600 text-2xl font-bold">
                    {brand.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="loader my-40 block mx-auto"></span>
        )}
      </div>

      <BrandsModal
        isOpen={isModalOpen}
        brand={selectedBrand}
        onClose={closeModal}
      />
    </>
  );
}
