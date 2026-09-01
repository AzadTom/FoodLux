import React from "react";
import { CalendarDays } from "lucide-react";

const statusStyles = {
  PENDING: {
    wrapper:
      "bg-amber-50 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400",
  },
  DELIVERED: {
    wrapper:
      "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-400",
  },
  CANCELLED: {
    wrapper: "bg-red-50 text-red-500 dark:bg-red-500/15 dark:text-red-400",
  },
};

const OrderItemCard = ({
  orderId = "1",
  date = "May 24, 2025",
  time = "2:30 PM",
  items = 3,
  price = 398,
  status = "PENDING",
  image,
  onViewDetails,
}) => {
  const statusStyle = statusStyles[status] || statusStyles.PENDING;

  return (
    <article
      className="
        group
        flex
        w-full
        min-h-[112px]
        items-center
        gap-4
        rounded-lg
        border
        border-gray-200
        bg-white
        p-3.5
        transition-all
        duration-200

        hover:-translate-y-[1px]
        hover:shadow-md

        dark:border-neutral-800
        dark:bg-neutral-900
        dark:hover:border-neutral-700
        dark:hover:shadow-black/20
      "
    >
      {/* Image */}
      <div
        className="
          h-[76px]
          w-[76px]
          shrink-0
          overflow-hidden
          rounded-lg
          bg-gray-100
          dark:bg-neutral-800
        "
      >
        <img
          src={image}
          alt={`Order #${orderId}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/600X600?text=Food+Image`;
          }}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Order Content */}
      <div className="min-w-0 flex-1">
        <h3
          className="
            mb-1.5
            text-[16px]
            font-semibold
            leading-tight
            text-gray-900
            dark:text-white
          "
        >
          Order #{orderId}
        </h3>

        {/* Date */}
        <div
          className="
            mb-2
            flex
            whitespace-nowrap
            items-center
            gap-1.5
            text-xs
            text-gray-500
            dark:text-neutral-400
          "
        >
          <CalendarDays className="shrink-0" size={13} strokeWidth={1.8} />
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>

        {/* Items */}
        <p
          className="
            mb-1
            text-xs
            text-gray-500
            dark:text-neutral-400
          "
        >
          {items} {items === 1 ? "item" : "items"}
        </p>

        {/* Price */}
        <p
          className="
            text-sm
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          ${price}
        </p>
      </div>

      {/* Right Side */}
      <div
        className="
          flex
          h-full
          min-w-[105px]
          flex-col
          items-end
          justify-between
          gap-3
          self-stretch
        "
      >
        {/* Status */}
        <span
          className={`
            inline-flex
            items-center
            justify-center
            rounded-full
            px-2.5
            py-1
            text-[10px]
            font-semibold
            tracking-wide
            ${statusStyle.wrapper}
          `}
        >
          {status}
        </span>

        {/* Details */}
        <button
          type="button"
          onClick={() => onViewDetails?.(orderId)}
          className="
            rounded-md
            border
            border-gray-200
            bg-white
            px-3
            py-1.5
            text-[11px]
            font-medium
            text-gray-600
            transition-colors

            hover:border-gray-300
            hover:bg-gray-50
            hover:text-gray-900

            dark:border-neutral-700
            dark:bg-neutral-900
            dark:text-neutral-300
            dark:hover:border-neutral-600
            dark:hover:bg-neutral-800
            dark:hover:text-white
          "
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default OrderItemCard;
