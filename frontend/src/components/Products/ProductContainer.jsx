import {
  SeriviceCategoryList,
  SeriviceEachCategoryList,
} from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import TopHeading from "../Category/TopHeading";
import { useInView } from "react-intersection-observer";
import NewProductItem from "./NewProductItem";
import ProductItemSkeleton from "./ProductItemSkelton";
import SwiperUtils from "./SwiperUtils/SwiperUtils";
import { SwiperSlide } from "swiper/react";
import NewProductItem2 from "./NewProductItem2";

const CarasouelArr = [0, 1, 2, 5, 7, 8, 9];
const ColumnArr = [2, 7, 8];

const ProductContainer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => SeriviceCategoryList(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  function getCarasouel(index) {
    if (CarasouelArr.includes(index)) {
      return true;
    }
    return false;
  }

  function getColumn(index) {
    if (ColumnArr.includes(index)) {
      return 5;
    }
    return 4;
  }

  return (
    <section>
      {data?.data?.map((item, index) => (
        <ProductItemContainer
          key={item.id}
          {...item}
          parentLoading={isLoading}
          carasouel={getCarasouel(index)}
          coloum={getColumn(index)}
        />
      ))}
    </section>
  );
};

export default ProductContainer;

const ProductItemContainer = ({
  id,
  name,
  parentLoading,
  carasouel = false,
  coloum = -1,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px 0px",
    triggerOnce: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => SeriviceEachCategoryList(id),
    refetchOnWindowFocus: false,
    enabled: inView && !parentLoading,
  });

  const iamloading = isLoading || parentLoading;

  if (carasouel) {
    return (
      <div className="min-h-max px-4" ref={ref}>
        <TopHeading
          heading={`${name} You'll Love`}
          subHeading={`Explore our selection of ${name.toLowerCase()} dishes, carefully chosen for flavor, quality, and a great dining experience.`}
        />
        <SwiperUtils
          showDots={false}
          breakpoints={{
            640: {
              slidesPerView: coloum,
              spaceBetween: 16,
              centeredSlides: false,
              centeredSlidesBounds: false,
            },
          }}
        >
          <div className="w-full">
            {iamloading ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <SwiperSlide>
                    <ProductItemSkeleton
                      key={item}
                      className={coloum === 4 ? "" : "aspect-[9/16]"}
                    />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                {data?.data?.map((item) => (
                  <SwiperSlide className="w-full">
                    <NewProductItem2
                      key={item.id}
                      {...item}
                      className={coloum === 4 ? "" : "aspect-[9/16]"}
                    />
                  </SwiperSlide>
                ))}
              </>
            )}
          </div>
        </SwiperUtils>
      </div>
    );
  }

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
              <NewProductItem2 key={item.id} {...item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
