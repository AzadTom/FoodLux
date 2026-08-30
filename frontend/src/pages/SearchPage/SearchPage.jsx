import { useNavigate, useSearchParams } from "react-router-dom";
import NewProductItem2 from "@/components/Products/NewProductItem2.jsx";
import axios from "axios";
import { BASE_URL3 } from "@/services/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductItemSkeleton from "@/components/Products/ProductItemSkelton";
import ProductFilter, {
  categoryFilter,
  priceFilter,
  ratingFilter,
} from "@/components/ProductFilter/ProductFilter";
import useSearchParam from "@/components/ProductFilter/useSearchParams";
import { useDispatch } from "react-redux";
import { addTocart } from "@/reducers/cartSlice";
import { addTOfav, removeTofav } from "@/reducers/favSlice";

async function fetchList({ pageParam = 1 }) {
  const response = await axios.get(`${BASE_URL3}/product`, {
    params: {
      page: pageParam,
      limit: 10,
    },
  });
  return response.data;
}

const useInfiniteScrollBest = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinte-scrolling"],
      queryFn: ({ pageParam }) => fetchList({ pageParam }),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastpage, _, lastPageParams) =>
        lastpage.data.length > 0 ? lastPageParams + 1 : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    data: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading: hasNextPage,
    ref,
  };
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getParam } = useSearchParam();
  const categoryValue = getParam(categoryFilter.id);
  const pricevalue = getParam(priceFilter.id);
  const ratingValue = getParam(ratingFilter.id);
  const query = getParam("query");

  const { isLoading, data, ref } = useInfiniteScrollBest();

  const filterData = getFilterList(
    query,
    categoryValue,
    pricevalue,
    ratingValue,
    data,
  );

  console.log("data:", filterData);
  const finalState = filterData?.length > 0 ? filterData : data;

  return (
    <>
      <section className="flex">
        <div className="max-w-[280px] w-full">
          <ProductFilter />
        </div>
        <section className="flex flex-col gap-4 justify-center items-center p-2">
          <div className="w-full grid grid-cols-1   sm:grid-cols-2  md:grid-cols-4  gap-2 sm:gap-4 justify-between   items-center px-5">
            {finalState.map((item) => (
              <NewProductItem2
                {...item}
                onAddToCart={({ id }) => dispatch(addTocart({ id }))}
                onToggleWishlist={({ id, isWishlisted }) =>
                  isWishlisted
                    ? dispatch(removeTofav({ id }))
                    : dispatch(addTOfav({ id }))
                }
              />
            ))}
          </div>
          <div
            ref={ref}
            className="w-full grid grid-cols-1   sm:grid-cols-2  md:grid-cols-4  gap-2 sm:gap-4 justify-between   items-center px-5"
          >
            {isLoading && (
              <Fragment>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <ProductItemSkeleton key={item} />
                ))}
              </Fragment>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default SearchPage;

function getFilterList(query, categoryValue, pricevalue, ratingValue, data) {
  if (!Array.isArray(data)) {
    return [];
  }

  const searchQuery = query?.[0]?.trim().toLowerCase() || "";

  const categories = categoryValue ?? [];

  const minPrice = Number(pricevalue?.[0]);
  const maxPrice = Number(pricevalue?.[1]);

  const selectedRatings = (ratingValue ?? [])
    .map(Number)
    .filter(Number.isFinite);

  const minRating =
    selectedRatings.length > 0 ? Math.max(...selectedRatings) : null;

  return data.filter((item) => {
    const product = item;

    if (!product) {
      return false;
    }

    /* =========================
       Search
    ========================= */

    if (searchQuery) {
      const productName = String(product.name ?? "").toLowerCase();

      if (!productName.includes(searchQuery)) {
        return false;
      }
    }

    /* =========================
       Category
    ========================= */

    if (categories.length > 0) {
      const productCategory = String(product.category ?? "").toLowerCase();

      const hasCategory = categories.some(
        (category) => productCategory === String(category).toLowerCase(),
      );

      if (!hasCategory) {
        return false;
      }
    }

    /* =========================
       Price
    ========================= */

    const productPrice = Number(product.price);

    if (Number.isFinite(minPrice) && productPrice < minPrice) {
      return false;
    }

    if (Number.isFinite(maxPrice) && productPrice > maxPrice) {
      return false;
    }

    /* =========================
       Rating
    ========================= */

    if (minRating !== null) {
      const productRating = Number(product.rating);

      if (!Number.isFinite(productRating) || productRating < minRating) {
        return false;
      }
    }

    return true;
  });
}
