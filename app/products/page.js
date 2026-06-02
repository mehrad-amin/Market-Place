"use client";

import ProductCard from "@/components/ProductCard";
import { useFilters } from "@/hooks/useFilters";
import { categories, products } from "@/lib/mockData";
import { useMemo, useState, Suspense } from "react"; // ۱. ایمپورت کردن Suspense
import { NumericFormat } from "react-number-format";

function ProductsContent() {
  const { filters, updateFilters, resetFilters, hasActiveFilters } =
    useFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const displayedProducts = useMemo(() => {
    let result = [...products];

    // فیلتر بر اساس دسته
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // فیلتر بر اساس جستجو
    if (filters.search) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.seller.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // فیلتر بر اساس قیمت حداقل
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    // فیلتر بر اساس قیمت حداکثر
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // فیلتر موجودی
    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // مرتب‌سازی
    if (filters.sort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* هدر صفحه با دکمه فیلتر موبایل */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">محصولات</h1>

        <div className="flex gap-3">
          {/* دکمه فیلتر موبایل */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            فیلتر
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {
                  Object.values(filters).filter(
                    (v) =>
                      v &&
                      v !== "all" &&
                      v !== "" &&
                      v !== false &&
                      v !== "default",
                  ).length
                }
              </span>
            )}
          </button>

          {/* دکمه ریست فیلتر */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-red-500 hover:text-red-700 transition text-sm"
            >
              حذف همه فیلترها
            </button>
          )}
        </div>
      </div>

      {/* بخش اصلی: دو ستونه (فیلتر + محصولات) */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* پنل فیلتر */}
        <div
          className={`
          ${isFilterOpen ? "block" : "hidden"} 
          md:block md:w-72 lg:w-80 shrink-0
          bg-white rounded-xl shadow-md p-6 h-fit sticky top-24 z-20
        `}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-gray-800">فیلترها</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* دسته‌بندی */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">دسته‌بندی</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={filters.category === cat.id}
                    onChange={(e) =>
                      updateFilters({ category: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">
                    {cat.icon} {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* محدوده قیمت */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">
              محدوده قیمت (تومان)
            </h3>
            <div className="flex gap-2">
              <NumericFormat
                placeholder="از"
                value={filters.minPrice}
                onValueChange={(values) => {
                  updateFilters({ minPrice: values.value });
                }}
                thousandSeparator=","
                allowNegative={false}
                decimalScale={0}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-left"
                dir="ltr"
              />

              <NumericFormat
                placeholder="تا"
                value={filters.maxPrice}
                onValueChange={(values) => {
                  updateFilters({ maxPrice: values.value });
                }}
                thousandSeparator=","
                allowNegative={false}
                decimalScale={0}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* موجودی */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-gray-700">فقط محصولات موجود</span>
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilters({ inStock: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded order-first"
              />
            </label>
          </div>

          {/* مرتب‌سازی */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">
              مرتب‌سازی بر اساس
            </h3>
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="default">پیش‌فرض</option>
              <option value="price_asc">ارزان‌ترین</option>
              <option value="price_desc">گران‌ترین</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
          </div>

          {/* جستجو */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">جستجو</h3>
            <input
              type="text"
              placeholder="نام محصول یا فروشنده..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            ></input>
          </div>

          {/* نمایش تعداد نتایج */}
          <div className="pt-4 border-t text-center text-gray-500 text-sm">
            {displayedProducts.length} محصول یافت شد
          </div>
        </div>

        {/* لیست محصولات */}
        <div className="flex-1">
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                محصولاتی یافت نشد
              </h3>
              <p className="text-gray-500">
                لطفاً فیلترهای دیگری را امتحان کنید
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 text-blue-600 hover:underline"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-500">
          در حال بارگذاری فیلترها و محصولات...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
