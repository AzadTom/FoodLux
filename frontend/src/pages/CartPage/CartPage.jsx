import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useNavigate } from "react-router-dom";
import { getCart } from "@/reducers/cartSlice";
import { useEffect } from "react";
import { ServicegetOrderByUser } from "@/services/service";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {

    ServicegetOrderByUser();
    
    if (cart.length > 0) return;
    dispatch(getCart());
  }, []);

  if (cart.length === 0) {
    return (
      <div className="w-full h-[80vh] text-center flex flex-col  gap-2 justify-center items-center ">
        {" "}
        <h1 className="text-3xl font-semibold">FoodLux</h1>
        <h2>Cart is empty!</h2>{" "}
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
    <section className="flex justify-center items-center">
      <div className="max-w-[1200px] w-full flex flex-col gap-8 sm:flex-row">
        <Cart />
        <div className="md:sticky md:top-20 md:left-0 md:right-0   md:max-w-[360px] w-full md:self-start">
          <OrderSummary />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
