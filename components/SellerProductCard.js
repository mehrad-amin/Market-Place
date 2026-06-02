"use client";

// کامپوننت کارت محصول فروشنده
export default function SellerProductCard({ product, onDelete, onEdit }) {
  const formatPrice = (price) => price.toLocaleString("fa-IR") + " تومان";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-blue-600 font-bold mb-3">
          {formatPrice(product.price)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg text-sm hover:bg-yellow-600 transition"
          >
            ویرایش
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
