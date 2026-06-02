"use client";

import SellerProductCard from "@/components/SellerProductCard";
import Link from "next/link";
import ProductModal from "@/components/ProductModal";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "قالب فروشگاهی حرفه‌ای",
      price: 350000,
      category: "قالب‌های وب",
      description: "قالب فروشگاهی مدرن",
      stock: 15,
      image: "/api/placeholder/600x400/DC2626/white?text=UI+Components",
    },
    {
      id: 2,
      title: "دوره آموزش Next.js",
      price: 890000,
      category: "دوره‌های آموزشی",
      description: "دوره جامع Next.js",
      stock: 50,
      image: "/api/placeholder/600x400/2563EB/white?text=Next.js+Course",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  const formatPrice = (price) => price.toLocaleString("fa-IR") + " تومان";

  // آمار فروشنده
  const stats = {
    totalProducts: products.length,
    totalSales: 124,
    totalRevenue: 45200000,
    averageRating: 4.7,
  };

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      image: "/api/placeholder/600x400/2563EB/white?text=NEW",
    };
    setProducts([...products, productWithId]);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setIsModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleDeleteProduct = (productId) => {
    if (confirm("آیا از حذف این محصول مطمئن هستید؟")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      handleUpdateProduct({ ...productData, id: editingProduct.id });
    } else {
      handleAddProduct(productData);
    }
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* عنوان صفحه */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">پنل فروشنده</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          ← بازگشت به داشبورد
        </Link>
      </div>

      {/* تب‌ها */}
      <div className="flex gap-4 border-b mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 px-4 transition ${
            activeTab === "products"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          محصولات من
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 px-4 transition ${
            activeTab === "analytics"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          آمار و گزارشات
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-4 transition ${
            activeTab === "orders"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          سفارشات
        </button>
      </div>

      {/* تب محصولات */}
      {activeTab === "products" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">مدیریت محصولات</h2>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + افزودن محصول جدید
            </button>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <SellerProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500">هنوز محصولی اضافه نکرده‌اید</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-blue-600 hover:underline"
              >
                اولین محصول را اضافه کنید
              </button>
            </div>
          )}
        </div>
      )}

      {/* تب آمار */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-gray-500 text-sm">تعداد محصولات</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalProducts}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-gray-500 text-sm">فروش کل</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatPrice(stats.totalRevenue)}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-gray-500 text-sm">تعداد فروش</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalSales}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-gray-500 text-sm">میانگین امتیاز</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.averageRating}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4">نمودار فروش ماهانه</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Rechart
            </div>
          </div>
        </div>
      )}

      {/* تب سفارشات */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            سفارشات دریافتی
          </h2>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p>هنوز سفارشی دریافت نکرده‌اید</p>
          </div>
        </div>
      )}

      {/* مودال افزودن/ویرایش محصول */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
