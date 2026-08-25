import { useNavigate, useSearchParams } from "react-router-dom";
import NewProductItem2 from "@/components/Products/NewProductItem2.jsx";
import axios from "axios";
import { BASE_URL3 } from "@/services/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductItemSkeleton from "@/components/Products/ProductItemSkelton";

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
      refetchOnWindowFocus:false,
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = searchParams.get("query"); 
  console.log("fil",params);
  const { isLoading, data, ref } = useInfiniteScrollBest();
  const filterData = data.filter((item)=> item?.name?.toLowerCase().includes(params?.toLowerCase()));

  console.log("fil",filterData);
  const finalState = filterData?.length > 0 ? filterData:data;

  return (
    <>
      <section className="flex flex-col gap-4 justify-center items-center p-2">
        <div className="w-full grid grid-cols-1   sm:grid-cols-2  md:grid-cols-4  gap-2 sm:gap-4 justify-between   items-center px-5">
          {finalState.map((item) => (
            <NewProductItem2 {...item} />
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
    </>
  );
};

export default SearchPage;
