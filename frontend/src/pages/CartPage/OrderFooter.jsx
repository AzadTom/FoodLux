import React from "react";

const OrderFooter = ({
  totalAmount = 398,
  onClose,
}) => {
  return (
    <div className="w-full">
      {/* Total Amount */}
      <div
        className="
          flex
          items-center
          justify-between
          rounded-lg
          bg-orange-50
          px-4
          py-4
          dark:bg-orange-500/10
        "
      >
        <span
          className="
            text-base
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          Total Amount
        </span>

        <span
          className="
            text-xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          ${totalAmount}
        </span>
      </div>

      {/* Close Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="
            rounded-lg
            bg-orange-500
            px-7
            py-2.5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition-all
            duration-200

            hover:bg-orange-600
            active:scale-95

            dark:bg-orange-500
            dark:hover:bg-orange-600
          "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderFooter;