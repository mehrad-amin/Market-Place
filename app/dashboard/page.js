"use client";
import RecentOrderCard from "@/components/RecentOrderCard";
import StatCard from "@/components/StatCard";
import { selectCartItems } from "@/store/slices/cartSlice";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const cartItems = useSelector(selectCartItems);
  const [activeTab, setActiveTab] = useState("overview");

  // دیتای ساختگی برای سفارشات قبلی
  const [orders] = useState([
    {
      id: 1,
      productTitle: "قالب فروشگاهی حرفه‌ای",
      quantity: 1,
      totalPrice: 350000,
      status: "delivered",
      date: "۱۴۰۳/۰۲/۱۵",
    },
    {
      id: 2,
      productTitle: "دوره آموزش Next.js",
      quantity: 2,
      totalPrice: 1780000,
      status: "processing",
      date: "۱۴۰۳/۰۲/۱۸",
    },
    {
      id: 3,
      productTitle: "کامپوننت‌های Tailwind",
      quantity: 1,
      totalPrice: 180000,
      status: "delivered",
      date: "۱۴۰۳/۰۲/۱۰",
    },
  ]);

  // دیتای ساختگی برای علاقه‌مندی‌ها
  const [wishlist] = useState([
    {
      id: 4,
      title: "اسکریپت فروشگاهی",
      price: 1250000,
      image: "/api/placeholder/600x400/9333EA/white?text=ecommerce+script",
    },
    {
      id: 6,
      title: "پلاگین سئو حرفه‌ای",
      price: 290000,
      image: "/api/placeholder/600x400/0891B2/white?text=SEO+Plugin",
    },
  ]);

  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  // آمار کاربر
  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    wishlistCount: wishlist.length,
    cartCount: cartItems.length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* عنوان صفحه */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">داشبورد کاربری</h1>

      {/* تب‌ها */}
      <div className="flex gap-4 border-b mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-4 transition ${
            activeTab === "overview"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          نمای کلی
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-4 transition ${
            activeTab === "orders"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          سفارشات من
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`pb-3 px-4 transition ${
            activeTab === "wishlist"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          علاقه‌مندی‌ها
        </button>
        <Link
          href="/dashboard/seller"
          className="pb-3 px-4 text-gray-500 hover:text-gray-700 transition"
        >
          پنل فروشنده
        </Link>
      </div>

      {/* تب نمای کلی */}
      {activeTab === "overview" && (
        <div>
          {/* کارت‌های آماری */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="تعداد سفارشات"
              value={stats.totalOrders}
              icon="📦"
              color="blue"
            />
            <StatCard
              title="کل خرید"
              value={formatPrice(stats.totalSpent)}
              icon="💰"
              color="green"
            />
            <StatCard
              title="علاقه‌مندی‌ها"
              value={stats.wishlistCount}
              icon="❤️"
              color="red"
            />
            <StatCard
              title="سبد خرید"
              value={stats.cartCount}
              icon="🛒"
              color="purple"
            />
          </div>

          {/* سفارشات اخیر */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              سفارشات اخیر
            </h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <RecentOrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                هنوز سفارشی ثبت نکرده‌اید
              </p>
            )}

            {orders.length > 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-blue-600 hover:underline text-sm"
                >
                  مشاهده همه سفارشات →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* تب سفارشات */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">همه سفارشات</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <RecentOrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              هنوز سفارشی ثبت نکرده‌اید
            </p>
          )}
        </div>
      )}

      {/* تب علاقه‌مندی‌ها */}
      {activeTab === "wishlist" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            محصولات مورد علاقه
          </h2>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">
                        {formatPrice(item.price)}
                      </span>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید
            </p>
          )}
        </div>
      )}
    </div>
  );
}
