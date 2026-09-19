import Loading from "@/components/Others/Loading";
import Rating from "@/components/Others/Rating";
import TopHeading from "@/components/Others/TopHeading";
import ProductContainer from "@/components/Products/ProductContainer";
import { addTocart } from "@/reducers/cartSlice";
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
}) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  const handleAddToCart = (id) => {
    if (!isLogin) {
      dispatch(setModelOpen(true));
      return;
    }
    dispatch(addTocart({ id }));
  };

  return (
    <div>
      <TopHeading title="Details" />
      <section className="flex flex-col md:flex-row gap-5  md:gap-12  items-center justify-between">
        <div className="flex-1">
          <img
            width={600}
            height={600}
            src={image}
            alt={name}
            className="w-full h-full  object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x600?text=Food+Image`;
            }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
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
        </div>
      </section>
      <section className="max-w-6xl">
        <h3 className="text-2xl font-bold mt-10 mb-5">Description</h3>
        <p className="text-gray-600">
          {description}
          {description}
          {description}
        </p>
      </section>
    </div>
  );
};
