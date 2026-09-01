import { SeriviceCategoryList } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ErrorContainer from "./ErrorContainer";
import { Marquee } from "../shadcn-space/animations/marquee";
import TopHeading from "./TopHeading";
import CategoryItemSkeleton from "./CategoryItemSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/reducers/cartSlice";
import { getfavs } from "@/reducers/favSlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishData } = useSelector((state) => state.favData);

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => SeriviceCategoryList(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (cart.length > 0) return;
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (wishData.length > 0) return;
    dispatch(getfavs());
  }, []);

  if (error) {
    return <ErrorContainer />;
  }

  return (
    <>
      <TopHeading
        className="px-4"
        heading="Discover Your Cravings"
        subHeading="Explore delicious dishes across every category."
      />
      <Marquee className="[--duration:20s]" pauseOnHover>
        {isLoading ? (
          <div className="flex">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CategoryItemSkeleton key={item} />
            ))}
          </div>
        ) : (
          <div className="flex">
            {data?.data?.map((item) => (
              <CategoryItem key={item.id} {...item} />
            ))}
          </div>
        )}
      </Marquee>
    </>
  );
};

export default CategoryList;

export const CategoryItem = ({
  id,
  name,
  image = "https://images.pexels.com/photos/33987719/pexels-photo-33987719.jpeg?width=1280&height=720",
  heading="Category"
}) => {
  return (
    <div id={id} className="shrink-0 w-[350px] p-2">
      <div className="group relative overflow-hidden rounded-2xl aspect-[9/16] bg-gray-200">
        {/* Image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
          {/* Category name */}
          <div>
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
              {heading}
            </p>

            <h3 className="text-white text-xl font-semibold capitalize">
              {name}
            </h3>
          </div>

          {/* Arrow button */}
          <button
            type="button"
            className="shrink-0 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:translate-x-1"
            aria-label={`View ${name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
