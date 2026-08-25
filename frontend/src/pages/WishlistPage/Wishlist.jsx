import { useDispatch, useSelector } from "react-redux";
import { addTOfav, getfavs, removeTofav } from "../../reducers/favSlice.js";
import { addTocart } from "../../reducers/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NewProductItem2 from "@/components/Products/NewProductItem2";

const Wishlist = () => {
  const { wishData } = useSelector((state) => state.favData);
  const { token } = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishData?.length > 0) return;
    dispatch(getfavs(token.token));
  }, [wishData]);

  if (wishData.length == 0) {
    return (
      <div className="w-full h-[80vh] text-center flex flex-col  gap-2 justify-center items-center ">
        {" "}
        <h1 className="text-3xl font-semibold">FoodLux</h1>
        <h2>Wishlist is empty!</h2>{" "}
        <button
          className="px-4 py-2 bg-black text-white"
          onClick={() => navigate("/")}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-4 justify-center items-center p-2">
        <div className="grid grid-cols-1   sm:grid-cols-2  md:grid-cols-4  gap-2 sm:gap-4 justify-between   items-center px-5">
          {wishData.map((item) => (
            <NewProductItem2
              {...item}
              {...item.product}
              onAddToCart={({ id }) => dispatch(addTocart({ id }))}
              onToggleWishlist={({ id, isWishlisted }) =>
                isWishlisted
                  ? dispatch(removeTofav({ id }))
                  : dispatch(addTOfav({ id }))
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Wishlist;
