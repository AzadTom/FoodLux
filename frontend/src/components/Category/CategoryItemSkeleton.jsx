const CategoryItemSkeleton = () => {
  return (
    <div className="shrink-0 w-[350px] p-2">
      <div className="relative overflow-hidden rounded-2xl aspect-[9/16] bg-gray-200">
        
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* Bottom content skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="h-3 w-20 rounded bg-gray-300 mb-3" />
          <div className="h-6 w-32 rounded bg-gray-300" />
        </div>

        {/* Arrow skeleton */}
        <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default CategoryItemSkeleton;