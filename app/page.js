"use client";

import { products, categories } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (categoryId) => {
    if (categoryId === "all") {
      router.push("/", { scroll: false });
    } else {
      router.push(`/?category=${categoryId}`, { scroll: false });
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products.slice(0, 6) // فقط 6 محصول اول در صفحه اصلی
      : products.filter((p) => p.category === selectedCategory).slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            به مارکت‌پلیس خوش آمدید
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            بهترین محصولات دیجیتال را از بهترین فروشندگان تهیه کنید
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          دسته‌بندی محصولات
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                handleCategoryChange(cat.id);
              }}
              className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* محصولات ویژه */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">محصولات ویژه</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            مشاهده همه →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* آمار سایت */}
      <div className="bg-gray-100 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {products.length}+
              </div>
              <div className="text-gray-600 mt-2">محصولات دیجیتال</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">۵+</div>
              <div className="text-gray-600 mt-2">فروشنده حرفه‌ای</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">۱۰۰۰+</div>
              <div className="text-gray-600 mt-2">خریدار راضی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
