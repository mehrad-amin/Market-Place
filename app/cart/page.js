"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          سبد خرید خالی است
        </h1>
        <p className="text-gray-600 mb-8">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید.
        </p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">سبد خرید</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* لیست محصولات */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mt-1">
                  فروشنده: {item.seller}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-red-500 text-sm hover:text-red-700 mt-1"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-700 transition"
          >
            خالی کردن سبد خرید
          </button>
        </div>

        {/* خلاصه سبد خرید */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              خلاصه سبد خرید
            </h3>

            <div className="space-y-2 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span>تعداد محصولات:</span>
                <span className="font-semibold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} عدد
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>جمع کل:</span>
                <span className="text-blue-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              ثبت سفارش
            </button>

            <p className="text-gray-500 text-xs text-center mt-4">
              هزینه ارسال در مرحله بعد محاسبه می‌شود
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
