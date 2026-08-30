import { Star } from "lucide-react";
import type { CheckboxFilterProps } from "./ProductFilterItem";

const RatingFilter = ({
  filter,
  value = [],
  onChange,
}: CheckboxFilterProps) => {
  const handleRatingChange = (rating: string) => {
    const isSelected = value.includes(rating);

    if (isSelected) {
      onChange?.(
        value.filter((item) => item !== rating)
      );

      return;
    }

    onChange?.([...value, rating]);
  };

  return (
    <div>
      {filter.options.map((option) => {
        const isSelected = value.includes(
          option.value
        );

        const rating = Number(option.value);

        return (
          <label
            key={option.value}
            className={`
              flex
              min-h-10
              items-center
              gap-3
              rounded-lg
              px-2
              py-2
              transition-colors

              ${
                option.disabled
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer"
              }
            `}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              disabled={option.disabled}
              onChange={() =>
                handleRatingChange(
                  option.value
                )
              }
              className="
                h-4
                w-4
                shrink-0
                rounded
                border-gray-300
                accent-blue-600
                focus:ring-2
                focus:ring-blue-500
              "
            />

            {/* Stars */}
            {option.value !== "0" ? (
              <div
                className="flex items-center gap-0.5"
                aria-label={`${rating} stars`}
              >
                {Array.from({
                  length: 5,
                }).map((_, index) => {
                  const starNumber = index + 1;

                  return (
                    <span
                      key={starNumber}
                      className={`
                        text-[20px]
                        leading-none
                        ${
                          starNumber <= rating
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }
                      `}
                    >
                      <Star fill="currentcolor" className="w-5 h-5"/>
                    </span>
                  );
                })}
              </div>
            ) : (
              /* No reviews */
              <span className="text-sm text-gray-700">
                No reviews
              </span>
            )}

            {/* Count */}
            {option.count !== undefined && (
              <span
                className={`
                  ml-1
                  text-sm
                  tabular-nums
                  ${
                    option.count === 0
                      ? "text-gray-300"
                      : "text-gray-500"
                  }
                `}
              >
                {option.count}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default RatingFilter;