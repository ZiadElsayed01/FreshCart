import React from "react";

export default function Modal({ isOpen, category, onClose }) {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg max-w-lg w-full relative m-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-600 hover:text-gray-800 text-4xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-emerald-600">
          {category.name}
        </h2>
        <img
          className="w-full h-[400px] object-cover mb-4"
          src={category.image}
          alt={category.name}
        />
      </div>
    </div>
  );
}
