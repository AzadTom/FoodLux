import React from "react";
import {
  CalendarDays,
  ShoppingBag,
  CircleDollarSign,
  Copy,
} from "lucide-react";

const SingleOrderSummary = ({
  image,
  status = "PENDING",
  orderId,
  createdAt,
  totalAmount,
}) => {
  const copyOrderId = async () => {
    await navigator.clipboard.writeText(orderId);
  };

  return (
    <div className="flex w-full items-start gap-8 border-b border-gray-200 pb-6 dark:border-neutral-800">
      {/* Image */}
      <div className="h-[280px] w-[340px] shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
        <img
          src={image}
          alt="Order"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/600X600?text=Food+Image`;
          }}
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Status */}
        <div className="mb-4">
          <span
            className="
              inline-flex
              rounded-lg
              bg-amber-50
              px-3
              py-2
              text-sm
              font-semibold
              text-amber-500
              dark:bg-amber-500/10
              dark:text-amber-400
            "
          >
            {status}
          </span>
        </div>

        {/* Order ID */}
        <div className="mb-5">
          <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
            Order ID
          </h2>

          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-gray-700 dark:text-neutral-300">
              {orderId}
            </span>

            <button
              type="button"
              onClick={copyOrderId}
              title="Copy Order ID"
              className="
                shrink-0
                text-gray-500
                transition-colors
                hover:text-gray-900
                dark:text-neutral-400
                dark:hover:text-white
              "
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4 flex items-center gap-3 text-sm text-gray-600 dark:text-neutral-400">
          <CalendarDays size={20} strokeWidth={1.8} />

          <span>{createdAt?.date}</span>

          <span>•</span>

          <span>{createdAt?.time}</span>
        </div>

        {/* Order placed */}
        <div className="mb-4 flex items-center gap-3 text-sm text-gray-600 dark:text-neutral-400">
          <ShoppingBag size={20} strokeWidth={1.8} />

          <span>Order placed</span>
        </div>

        {/* Amount */}
        <div className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-neutral-200">
          <CircleDollarSign size={20} strokeWidth={1.8} />

          <span>${totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderSummary;
