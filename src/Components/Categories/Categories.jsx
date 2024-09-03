import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryModal from "./../CategoryModal/CategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedCategory(null);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="catogries my-40 md:mt-14">
        <h1 className="text-5xl text-center text-emerald-600 font-semibold mb-5">
          Our Categories
        </h1>
        {categories.length > 0 ? (
          <div className="flex flex-wrap">
            {categories.map((category) => (
              <div key={category._id} className="w-full md:w-1/4 p-3">
                <div
                  className="category border border-emerald-600 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <img
                    className="w-full h-[280px] object-cover"
                    src={category.image}
                    alt={category.name}
                  />
                  <h2 className="m-3 text-emerald-600 text-2xl font-bold">
                    {category.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="loader my-40 block mx-auto"></span>
        )}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={closeModal}
      />
    </>
  );
}
