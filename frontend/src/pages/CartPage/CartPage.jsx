import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useNavigate } from "react-router-dom";
import { getCart } from "@/reducers/cartSlice";
import { useEffect } from "react";
import { ServicegetOrderByUser } from "@/services/service";


import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from "@tanstack/react-query";

export default function CartOrderTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const contentSwiper = useRef(null);

  const changeTab = (index) => {
    setActiveTab(index);
    contentSwiper.current?.slideTo(index);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => changeTab(0)}
          className={`flex-1 py-3 text-center ${
            activeTab === 0
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-500'
          }`}
        >
          Cart
        </button>

        <button
          onClick={() => changeTab(1)}
          className={`flex-1 py-3 text-center ${
            activeTab === 1
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-500'
          }`}
        >
          Orders
        </button>
      </div>

      {/* Swipeable Content */}
      <Swiper
        onSwiper={(swiper) => {
          contentSwiper.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveTab(swiper.activeIndex);
        }}
        spaceBetween={20}
        slidesPerView={1}
      >
        <SwiperSlide>
          <CartPage />
        </SwiperSlide>

        <SwiperSlide>
          <OrderPage />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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




function OrderPage() {

  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey:["order"],
    queryFn:()=> ServicegetOrderByUser(),
    refetchOnWindowFocus:false,
  })


  return <div className="p-6">Orders content</div>;
}
