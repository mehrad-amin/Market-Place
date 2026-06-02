function RecentOrderCard({ order }) {
  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "تحویل شده";
      case "processing":
        return "در حال پردازش";
      case "cancelled":
        return "لغو شده";
      default:
        return "نامشخص";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800">{order.productTitle}</h3>
          <p className="text-gray-500 text-sm">تعداد: {order.quantity} عدد</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
        >
          {getStatusText(order.status)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-bold">
          {formatPrice(order.totalPrice)}
        </span>
        <span className="text-gray-400 text-sm">{order.date}</span>
      </div>
    </div>
  );
}
export default RecentOrderCard;
