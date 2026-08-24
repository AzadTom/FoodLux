import { cn } from "@/lib/utils";
import React from "react";

const NewProductItem2 = ({
  id,
  name,
  heading,
  subheading,
  description,
  image,
  price,
  rating,
  stock,
  status,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className=""
}) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (stock <= 0 || status !== "ACTIVE") return;

    onAddToCart?.({
      id,
      name,
      price,
      image,
      stock,
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    onToggleWishlist?.({
      id,
      name,
      image,
    });
  };

  const isOutOfStock = stock <= 0 || status !== "ACTIVE";

  return (
    <article className="group w-full min-w-0">
      {/* Image Card */}
      <div className={cn("relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]",className)}>
        {/* Food Image */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="
            absolute inset-0
            h-full w-full
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />

        {/* Dark overlay on hover */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Wishlist - hidden until hover */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-sm
            backdrop-blur-sm

            opacity-0
            translate-y-[-6px]
            pointer-events-none

            transition-all
            duration-300

            group-hover:translate-y-0
            group-hover:opacity-100
            group-hover:pointer-events-auto

            hover:scale-110
            hover:bg-white
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className={`h-5 w-5 ${
              isWishlisted ? "text-red-500" : "text-gray-700"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>

        {/* Add to Cart - hidden until hover */}
        {!isOutOfStock && (
          <div
            className="
              absolute
              bottom-4
              left-4
              right-4
              z-10

              translate-y-4
              opacity-0
              pointer-events-none

              transition-all
              duration-300

              group-hover:translate-y-0
              group-hover:opacity-100
              group-hover:pointer-events-auto
            "
          >
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-900
                shadow-lg
                transition-all
                duration-200
                hover:bg-gray-50
                active:scale-[0.98]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              Add to Cart
            </button>
          </div>
        )}

        {/* Out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-center">
            <span className="text-sm font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="px-1 pt-3">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate text-lg font-semibold leading-6 text-gray-900 dark:text-white">
            {heading || name}
          </h3>

          <span className="shrink-0 text-base font-semibold text-gray-900 dark:text-white">
            ${Number(price).toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path d="M12 2l2.8 6.2 6.7.7-5 4.5 1.5 6.6L12 16.7 6 20l1.5-6.6-5-4.5 6.7-.7L12 2z" />
              </svg>
            </span>

            {rating}
          </span>

          {subheading && (
            <>
              <span className="text-gray-300">•</span>

              <span className="truncate text-sm text-gray-500">
                {subheading}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default NewProductItem2;