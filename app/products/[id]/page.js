"use client";
import { getProductById, products } from "@/lib/mockData";
import { addItem } from "@/store/slices/cartSlice";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const product = getProductById(id);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          محصول یافت نشد
        </h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          بازگشت به محصولات
        </Link>
      </div>
    );
  }

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
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const ProductCard = dynamic(() => import("@/components/ProductCard"));
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* دکمه بازگشت */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-600 hover:text-blue-600 transition flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        بازگشت
      </button>

      {/* اطلاعات اصلی محصول */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-xl shadow-lg"
          />
          {discountPercent > 0 && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {discountPercent}٪ تخفیف
            </span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-700 font-semibold">
                {product.rating}
              </span>
              <span className="text-gray-400">({product.reviewCount} نظر)</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={product.sellerAvatar}
                alt={product.seller}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-600">فروشنده: {product.seller}</span>
            </div>
          </div>

          <div className="mb-6">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-lg">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <div className="text-3xl font-bold text-blue-600 mt-1">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {product.stock > 0 ? `موجود (${product.stock} عدد)` : "ناموجود"}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold transition mb-4 flex items-center justify-center gap-2 ${
              product.stock === 0
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
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
            {addedToCart ? "افزوده شد ✓" : "افزودن به سبد خرید"}
          </button>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">توضیحات محصول:</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ویژگی‌های محصول
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            محصولات مرتبط
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
