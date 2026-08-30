import ProductFilterItem, {
  CheckboxFilter,
  CheckboxFilterProps,
  RadioFilter,
  RangeFilter,
} from "./ProductFilterItem";
import RatingFilter from "./RatingFilter";
import useSearchParam from "./useSearchParams";

export const categoryFilter: CheckboxFilter = {
  id: "category",
  label: "Categories",
  type: "checkbox" as const,
  defaultOpen: true,
  options: [
    {
      value: "pizza",
      label: "Pizza",
    },
    {
      value: "burger",
      label: "Burger",
    },
  ],
};

export const priceFilter: RangeFilter = {
  id: "price",
  label: "Price",
  type: "range",
  defaultOpen: true,
  min: 10,
  max: 100,
  step: 5,
  defaultValue: [10, 100],
  formatValue: (value) => `$${value}`,
};

export const ratingFilter: CheckboxFilter = {
  id: "rating",
  label: "Ratings",
  type: "checkbox",
  defaultOpen: true,
  options: [
    {
      value: "5",
      label: "5 stars",
    },
    {
      value: "4",
      label: "4 stars",
    },
    {
      value: "3",
      label: "3 stars",
    },
    {
      value: "2",
      label: "2 stars",
    },
    {
      value: "1",
      label: "1 star",
    },
  ],
  render: (props:CheckboxFilterProps) => <RatingFilter {...props}/>,
};

export const sortFilter: RadioFilter = {
  id: "sort",
  label: "Sort By",
  type: "radio",
  defaultOpen: true,

  options: [
    {
      value: "price-desc",
      label: "Price: High to Low",
    },
    {
      value: "price-asc",
      label: "Price: Low to High",
    },
    {
      value: "category-asc",
      label: "Category: A to Z",
    },
    {
      value: "category-desc",
      label: "Category: Z to A",
    },
  ],
};

const ProductFilter = () => {
  const { getParam, setParam, clearParams } = useSearchParam();

  const categoryValue = getParam(categoryFilter.id);
  const pricevalue = getParam(priceFilter.id);
  const ratingValue = getParam(ratingFilter.id);
  const sortFilterValue = getParam(sortFilter.id);

  return (
    <section className="px-4 fixed top-20 left-0 max-w-[280px] w-full border p-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Filters</p>
        <button className="border p-2 rounded text-base" onClick={clearParams}>
          Clear Filters
        </button>
      </div>
      <ProductFilterItem
        filter={sortFilter}
        value={sortFilterValue[0]}
        onChange={(value: string) => setParam(sortFilter.id, [value])}
      />
      <ProductFilterItem
        filter={categoryFilter}
        value={categoryValue}
        onChange={(value: string[]) => setParam(categoryFilter.id, value)}
      />
      <ProductFilterItem
        filter={priceFilter}
        value={[Number(pricevalue[0] ?? 0), Number(pricevalue[1] ?? 100)]}
        onChange={(value: [number, number]) =>
          setParam(priceFilter.id, value.map(String))
        }
      />
      <ProductFilterItem
        filter={ratingFilter}
        value={ratingValue}
        onChange={(value: string[]) => setParam(ratingFilter.id, value)}
      />
    </section>
  );
};

export default ProductFilter;
