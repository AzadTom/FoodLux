import { ReactNode, useId, useState, type ChangeEvent } from "react";

/* =========================================================
   Common Types
========================================================= */

export type FilterOption = {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
};

/* =========================================================
   Filter Config Types
========================================================= */

export type CheckboxFilter = {
  id: string;
  label: string;
  type: "checkbox";
  defaultOpen?: boolean;
  options: FilterOption[];
  render?: (props: CheckboxFilterProps) => ReactNode;
};

export type RadioFilter = {
  id: string;
  label: string;
  type: "radio";
  defaultOpen?: boolean;
  options: FilterOption[];
};

export type RangeFilter = {
  id: string;
  label: string;
  type: "range";
  defaultOpen?: boolean;
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];

  formatValue?: (value: number) => string;
};

/* =========================================================
   Filter Config Union
========================================================= */

export type FilterConfig = CheckboxFilter | RadioFilter | RangeFilter;

/* =========================================================
   Props
========================================================= */

/*
 * This is the important part.
 *
 * Each filter type has its own:
 *
 * filter
 * value
 * onChange
 *
 * TypeScript keeps them connected.
 */

export type CheckboxFilterProps = {
  filter: CheckboxFilter;
  value?: string[];
  onChange?: (value: string[]) => void;
};

type RadioFilterProps = {
  filter: RadioFilter;
  value?: string;
  onChange?: (value: string) => void;
};

type RangeFilterProps = {
  filter: RangeFilter;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
};

export type ProductFilterItemProps =
  | CheckboxFilterProps
  | RadioFilterProps
  | RangeFilterProps;

const isCheckboxFilterProps = (
  props: ProductFilterItemProps,
): props is CheckboxFilterProps => props.filter.type === "checkbox";

const isRadioFilterProps = (
  props: ProductFilterItemProps,
): props is RadioFilterProps => props.filter.type === "radio";

const isRangeFilterProps = (
  props: ProductFilterItemProps,
): props is RangeFilterProps => props.filter.type === "range";

/* =========================================================
   Component
========================================================= */

const ProductFilterItem = (props: ProductFilterItemProps) => {
  const id = useId();

  const [isOpen, setIsOpen] = useState(props.filter.defaultOpen ?? true);

  const contentId = `filter-content-${id}`;

  /* =======================================================
     Toggle
  ======================================================= */

  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };

  /* =======================================================
     Content
  ======================================================= */

  const renderContent = () => {
    if (isCheckboxFilterProps(props)) {
      if (props.filter.render) {
        return props.filter.render(props);
      }
      const selectedValues = props.value ?? [];

      const handleCheckboxChange = (optionValue: string) => {
        const exists = selectedValues.includes(optionValue);

        const nextValue = exists
          ? selectedValues.filter((item) => item !== optionValue)
          : [...selectedValues, optionValue];

        props.onChange?.(nextValue);
      };

      return (
        <div className="space-y-2">
          {props.filter.options.map((option) => {
            const optionId = `${id}-${option.value}`;

            const checked = selectedValues.includes(option.value);

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={[
                  "flex min-h-10 items-center gap-3",
                  "rounded-lg px-2",
                  "transition-colors",
                  option.disabled
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer",
                ].join(" ")}
              >
                <input
                  id={optionId}
                  type="checkbox"
                  checked={checked}
                  disabled={option.disabled}
                  onChange={() => handleCheckboxChange(option.value)}
                  className="
                      h-4 w-4
                      rounded
                      border-gray-300
                      text-blue-600
                      accent-blue-600
                      focus:ring-2
                      focus:ring-blue-500
                    "
                />

                <span className="flex-1 text-base font-medium">
                  {option.label}
                </span>

                {option.count !== undefined && (
                  <span className="text-xs text-gray-400">{option.count}</span>
                )}
              </label>
            );
          })}
        </div>
      );
    }

    if (isRadioFilterProps(props)) {
      const selectedValue = props.value;

      const handleRadioChange = (optionValue: string) => {
        props.onChange?.(optionValue);
      };

      return (
        <div className="space-y-2">
          {props.filter.options.map((option) => {
            const optionId = `${id}-${option.value}`;

            const checked = selectedValue === option.value;

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={[
                  "flex min-h-10 items-center gap-4",
                  "rounded-lg px-2",
                  "transition-colors",
                  option.disabled
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer",
                ].join(" ")}
              >
                <input
                  id={optionId}
                  type="radio"
                  name={props.filter.id}
                  checked={checked}
                  disabled={option.disabled}
                  onChange={() => handleRadioChange(option.value)}
                  className="
                      h-4 w-4
                      border-gray-300
                      text-blue-600
                      accent-blue-600
                      focus:ring-2
                      focus:ring-blue-500
                    "
                />

                <span className="flex-1 text-base font-medium">
                  {option.label}
                </span>

                {option.count !== undefined && (
                  <span className="text-xs text-gray-400">{option.count}</span>
                )}
              </label>
            );
          })}
        </div>
      );
    }

    if (isRangeFilterProps(props)) {
      const min = props.filter.min;
      const max = props.filter.max;
      const step = props.filter.step ?? 1;

      const rangeValue =
        props.value ??
        props.filter.defaultValue ??
        ([min, max] as [number, number]);

      const [currentMin, currentMax] = rangeValue;

      const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextMin = Math.min(Number(event.target.value), currentMax);

        props.onChange?.([nextMin, currentMax]);
      };

      const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextMax = Math.max(Number(event.target.value), currentMin);

        props.onChange?.([currentMin, nextMax]);
      };

      const formatValue =
        props.filter.formatValue ?? ((value: number) => String(value));

      const minPercent = ((currentMin - min) / (max - min)) * 100;

      const maxPercent = ((currentMax - min) / (max - min)) * 100;

      return (
        <div className="space-y-4">
          {/* Values */}
          <div className="flex items-center justify-between">
            <span className="text-base font-medium ">
              {formatValue(currentMin)}
            </span>

            <span className="text-base font-medium">
              {formatValue(currentMax)}
            </span>
          </div>

          {/* Slider */}
          <div className="relative h-5">
            {/* Background */}
            <div
              className="
                absolute
                top-1/2
                h-1.5
                w-full
                -translate-y-1/2
                rounded-full
                bg-gray-200
              "
            />

            {/* Active range */}
            <div
              className="
                  absolute
                  top-1/2
                  h-1.5
                  -translate-y-1/2
                  rounded-full
                  bg-blue-600
                "
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />

            {/* Minimum */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={currentMin}
              onChange={handleMinChange}
              aria-label={`${props.filter.label} minimum`}
              className="
                  pointer-events-none
                  absolute
                  inset-0
                  h-5
                  w-full
                  appearance-none
                  bg-transparent

                  [&::-webkit-slider-thumb]:pointer-events-auto
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-blue-600

                  [&::-moz-range-thumb]:pointer-events-auto
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:bg-blue-600
                "
            />

            {/* Maximum */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={currentMax}
              onChange={handleMaxChange}
              aria-label={`${props.filter.label} maximum`}
              className="
                  pointer-events-none
                  absolute
                  inset-0
                  h-5
                  w-full
                  appearance-none
                  bg-transparent

                  [&::-webkit-slider-thumb]:pointer-events-auto
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-blue-600

                  [&::-moz-range-thumb]:pointer-events-auto
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:bg-blue-600
                "
            />
          </div>
        </div>
      );
    }

    return null;
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <section className="border-b border-gray-100">
      {/* Header */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          px-1
          py-4
          text-left
          outline-none
          transition-colors
        "
      >
        <span className="font-semibold">{props.filter.label}</span>

        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={[
            "h-4 w-4",
            "text-gray-400",
            "transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Content */}
      <div
        id={contentId}
        className={[
          "grid",
          "transition-[grid-template-rows]",
          "duration-200",
          "ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilterItem;
