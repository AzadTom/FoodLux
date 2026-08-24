import {
  SeriviceCategoryList,
  SeriviceEachCategoryList,
} from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import TopHeading from "../Category/TopHeading";
import { useInView } from "react-intersection-observer";
import NewProductItem from "./NewProductItem";
import ProductItemSkeleton from "./ProductItemSkelton";

const ProductContainer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => SeriviceCategoryList(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <section>
      {data?.data?.map((item) => (
        <ProductItemContainer
          key={item.id}
          {...item}
          parentLoading={isLoading}
        />
      ))}
    </section>
  );
};

export default ProductContainer;

const ProductItemContainer = ({ id, name, parentLoading }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px 0px",
    triggerOnce: true,
  });

  const { data, isLoading} = useQuery({
    queryKey: [id],
    queryFn: () => SeriviceEachCategoryList(id),
    refetchOnWindowFocus: false,
    enabled: inView && !parentLoading,
  });

  const iamloading = isLoading || parentLoading;

  return (
    <div className="min-h-screen" ref={ref}>
      <TopHeading
        heading={`${name} You'll Love`}
        subHeading={`Explore our selection of ${name.toLowerCase()} dishes, carefully chosen for flavor, quality, and a great dining experience.`}
        className="px-4"
      />
      <div className="grid grid-cols-1 px-4 gap-6 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        {iamloading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, , 9].map((item) => (
              <ProductItemSkeleton key={item} />
            ))}
          </>
        ) : (
          <>
            {data?.data?.map((item) => (
              <NewProductItem key={item.id} {...item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
