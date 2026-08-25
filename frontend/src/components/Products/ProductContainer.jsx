import {
  SeriviceCategoryList,
  SeriviceEachCategoryList,
} from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import TopHeading from "../Category/TopHeading";
import { useInView } from "react-intersection-observer";
import ProductItemSkeleton from "./ProductItemSkelton";
import { SwiperSlide } from "swiper/react";
import NewProductItem2 from "./NewProductItem2";
import SwiperUtils2 from "./SwiperUtils/SwiperUtils2";
import { useDispatch } from "react-redux";
import { addTocart} from "@/reducers/cartSlice";
import { addTOfav,removeTofav } from "@/reducers/favSlice";

const ColumnArr = [2, 7, 8];
const getColumn = (index) => (ColumnArr.includes(index) ? 5 : 4);

const ProductContainer = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => SeriviceCategoryList(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const categorylist = data?.data;

  return (
    <section>
      {categorylist?.map((item, index) => (
        <ProductItemContainer
          key={item.id}
          {...item}
          parentLoading={isLoading}
          carasouel={true}
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const iamloading = parentLoading || isLoading;
  const getClass = () => (coloum === 4 ? "" : "aspect-[9/16]");
  const getRow = () => (coloum === 4 ? 2 : 1);
  const getVertical = () => (coloum === 4 ? false : true);
  const dispatch = useDispatch();

  if (carasouel) {
    return (
      <div className="min-h-max px-4" ref={ref}>
        <TopHeading
          heading={`${name} You'll Love`}
          subHeading={`Explore our selection of ${name.toLowerCase()} dishes, carefully chosen for flavor, quality, and a great dining experience.`}
        />
        <SwiperUtils2
          showDots={false}
          rows={getRow()}
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
                    <ProductItemSkeleton key={item} className={getClass()} />
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
                      vertical={getVertical()}
                      className={getClass()}
                      onAddToCart={({ id }) => dispatch(addTocart({ id }))}
                      onToggleWishlist={({ id, isWishlisted }) =>
                        isWishlisted
                          ? dispatch(removeTofav({ id }))
                          : dispatch(addTOfav({ id }))
                      }
                    />
                  </SwiperSlide>
                ))}
              </>
            )}
          </div>
        </SwiperUtils2>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <ProductItemSkeleton key={item} />
            ))}
          </>
        ) : (
          <>
            {data?.data?.map((item) => (
              <NewProductItem2
                key={item.id}
                {...item}
                onAddToCart={({ id }) => dispatch(addTocart({ id }))}
                onToggleWishlist={({ id, isMatch }) =>
                  isMatch
                    ? dispatch(removeTofav({ id }))
                    : dispatch(addTOfav({ id }))
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
