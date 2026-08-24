const ProductItemSkeleton = () => {
  return (
    <div className="w-full">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        {/* Wishlist skeleton */}
        <div className="absolute right-3 top-3 h-12 w-12 rounded-full bg-gray-300" />
      </div>

      {/* Content */}
      <div className="mt-3">
        {/* Name + price */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-6 w-40 rounded-md bg-gray-200" />
          <div className="h-5 w-16 rounded-md bg-gray-200" />
        </div>

        {/* Rating + subtitle */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="h-4 w-8 rounded bg-gray-200" />
          <div className="h-4 w-2 rounded bg-gray-200" />
          <div className="h-4 w-36 rounded bg-gray-200" />
        </div>

        {/* Description */}
        <div className="mt-2 space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;