const Rating = ({ rating, maxRating = 5, size = 18 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const fillPercentage = Math.min(
          Math.max(rating - index, 0),
          1
        ) * 100;

        return (
          <svg
            key={index}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="shrink-0"
          >
            {/* Empty star */}
            <path
              d="M12 2.5l2.93 5.94 6.57.96-4.75 4.63 1.12 6.55L12 17.49l-5.87 3.09 1.12-6.55L2.5 9.4l6.57-.96L12 2.5z"
              fill="#E5E7EB"
            />

            {/* Filled portion */}
            {fillPercentage > 0 && (
              <defs>
                <linearGradient
                  id={`rating-${index}-${rating}`}
                  x1="0%"
                  x2="100%"
                >
                  <stop
                    offset={`${fillPercentage}%`}
                    stopColor="#F59E0B"
                  />
                  <stop
                    offset={`${fillPercentage}%`}
                    stopColor="transparent"
                  />
                </linearGradient>
              </defs>
            )}

            {fillPercentage > 0 && (
              <path
                d="M12 2.5l2.93 5.94 6.57.96-4.75 4.63 1.12 6.55L12 17.49l-5.87 3.09 1.12-6.55L2.5 9.4l6.57-.96L12 2.5z"
                fill={`url(#rating-${index}-${rating})`}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
};

export default Rating;