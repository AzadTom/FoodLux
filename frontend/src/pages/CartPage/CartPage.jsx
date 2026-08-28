import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useNavigate } from "react-router-dom";
import { getCart } from "@/reducers/cartSlice";
import { useEffect } from "react";
import {
  ServicegetOrderByUser,
  ServicegetOrderDetailsByUser,
} from "@/services/service";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import OrderModals from "./OrderModals";
import Loading from "@/components/Utils/Loading";
import Empty from "@/components/Utils/Empty";

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
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
        >
          Cart
        </button>

        <button
          onClick={() => changeTab(1)}
          className={`flex-1 py-3 text-center ${
            activeTab === 1
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
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

  useEffect(() => {
    if (cart.length > 0) return;
    dispatch(getCart());
  }, []);

  if (cart.length === 0) return <Empty heading="Cart is empty" />;

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
  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => ServicegetOrderByUser(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (data?.data?.length === 0) return <Empty />;

  return (
    <div className="p-6 max-w-[1200px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data?.data?.map((item, index) => (
        <OrderDetails key={item.id} {...item} orderId={index + 1} />
      ))}
    </div>
  );
}

const OrderDetails = (props) => {
  const { status, totalAmount, orderId, id } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <OrderModals isOpen={open} onClose={() => setOpen(false)}>
        <div>
          <CompleteOrderDetails id={id} />
        </div>
      </OrderModals>
      <div
        className="flex justify-between items-start border p-4 rounded"
        onClick={() => setOpen(true)}
      >
        <p className="flex flex-col gap-1">
          <span className="text-xl font-semibold">Order #{orderId}</span>
          <span className="text-sm font-medium">${totalAmount}</span>
        </p>
        <button className="text-white bg-black rounded px-2 py-1 text-xs">
          {status}
        </button>
      </div>
    </div>
  );
};

const CompleteOrderDetails = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["completeOrderDetail", id],
    queryFn: () => ServicegetOrderDetailsByUser(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (data?.orderdetails.length === 0)
    return <Empty heading="There is no detail" />;

  return (
    <div className="h-full p-6 pt-14 text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
      {data?.orderdetails?.map((item) => (
        <div key={item.id} className="border">
          <img
            src={item.product.image}
            width={1280}
            height={720}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/1280X720?text=Food+Image`;
            }}
            className="aspect-video object-cover"
            alt="image"
          />
          <p className="flex gap-4 justify-between items-start mt-2 px-2">
            <span>{item.product.name}</span>
            <span>${item.product.price}</span>
          </p>
          <p className="flex justify-end pr-2 pb-2">QTY - {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};
