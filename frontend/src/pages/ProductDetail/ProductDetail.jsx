import Loading from "@/components/Others/Loading";
import Rating from "@/components/Others/Rating";
import TopHeading from "@/components/Others/TopHeading";
import ProductContainer from "@/components/Products/ProductContainer";
import { Spinner } from "@/components/ui/spinner";
import { addTocart } from "@/reducers/cartSlice";
import { addTOfav, removeTofav } from "@/reducers/favSlice";
import { setModelOpen } from "@/reducers/userSlice";
import { SeriviceEachProductDetails } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => SeriviceEachProductDetails(id),
    enabled: id ? true : false,
    refetchOnWindowFocus: false,
  });

  const { name, slug, rating, heading, subheading, image, price, description } =
    data?.data || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="p-4 pt-0">
      {isLoading ? (
        <Loading />
      ) : (
        <Details
          name={name}
          heading={heading}
          subheading={subheading}
          price={price}
          image={image}
          id={id}
          description={description}
          rating={rating}
        />
      )}
      <div className="-mx-4">
        <ProductContainer />
      </div>
    </div>
  );
};

export default ProductDetail;

const Details = ({
  name,
  heading,
  subheading,
  price,
  image,
  description,
  rating,
  id,
}) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  const { cart, addToCartId } = useSelector((state) => state.cart);
  const { wishData, id: currentFavId } = useSelector((state) => state.favData);
  const isWishlisted =
    wishData && wishData.find((item) => item.productId === id);
  const isMatch = cart && cart.find((item) => item.productId === id);

  const handleAddToCart = (id) => {
    if (!isLogin) {
      dispatch(setModelOpen(true));
      return;
    }
    if (isMatch) {
      router("/cart");
      return;
    }
    dispatch(addTocart({ id }));
  };

  const handleToggleWishlist = (id, isWishlisted) => {
    if (!isLogin) {
      dispatch(setModelOpen(true));
      return;
    }
    isWishlisted ? dispatch(removeTofav({ id })) : dispatch(addTOfav({ id }));
  };

  return (
    <div>
      <TopHeading title="Details" />
      <section className="flex flex-col md:flex-row gap-5  md:gap-12">
        <div className="flex-1 w-full h-full aspect-square">
          <img
            width={300}
            height={300}
            src={image}
            alt={name}
            className="w-full h-full  object-cover rounded-lg aspect-square"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x600?text=Food+Image`;
            }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 relative">
          <button
            type="button"
            disabled={currentFavId === id}
            onClick={() => handleToggleWishlist(id, isWishlisted)}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className="
            absolute
            right-4
            top-0
            z-10
            flex
            h-10
            border
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-sm
            backdrop-blur-sm

            opacity-100
            translate-y-0

            transition-all
            duration-300

            hover:scale-110
            hover:bg-white
          "
          >
            {currentFavId === id ? (
              <div className="flex">
                <Spinner className="size-3 text-black" />
              </div>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-5 w-5 ${
                  isWishlisted ? "text-red-500" : "text-gray-700"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                />
              </svg>
            )}
          </button>
          <p className="bg-green-600 text-white text-sm px-2 py-1 rounded w-max">
            {subheading}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-5">{heading}</h2>
          <p className="text-gray-600 mt-4 max-w-sm w-full">{description}</p>
          <p className="text-2xl font-bold">${price}</p>
          <Rating rating={rating} />
          <div className="w-full flex gap-5 justify-between items-center">
            <button
              onClick={() => handleAddToCart(id)}
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 mt-4 w-full"
            >
              Add to cart
            </button>
            <button
              onClick={() => router("/cart")}
              className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 mt-4 w-full"
            >
              Go to cart
            </button>
          </div>
          <section className="max-w-6xl">
            <h3 className="text-2xl font-bold mt-10 mb-5">Description</h3>
            <p className="text-gray-600">
              {description}
              {description}
              {description}
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};
