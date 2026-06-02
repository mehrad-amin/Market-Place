"use client";
import { addItem } from "@/store/slices/cartSlice";

import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  const handleAddToCart = () => {
    dispatch(addItem(product));
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {discountPercent > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discountPercent}٪ تخفیف
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2 min-h-[56px]">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-gray-600 text-sm ml-1">{product.rating}</span>
            <span className="text-gray-400 text-sm">
              ({product.reviewCount})
            </span>
          </div>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-500 text-sm">{product.seller}</span>
        </div>

        <div className="mt-3">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {product.originalPrice.toLocaleString("fa-IR")} تومان
            </span>
          )}
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-6"
                />
              </svg>
              افزودن به سبد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
