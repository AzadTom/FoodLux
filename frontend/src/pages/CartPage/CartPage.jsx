import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import OrderSummary from "../../components/Cart/OrderSummary";
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
import OrderItemCard from "./OrderItemCard";
import { formatOrderDateTime } from "@/lib/utils";
import SingleOrderSummary from "./SingleOrderSummary";
import OrderFooter from "./OrderFooter";

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
              ? "border-b-2 border-black dark:border-white font-semibold"
              : "text-gray-500"
          }`}
        >
          Cart
        </button>

        <button
          onClick={() => changeTab(1)}
          className={`flex-1 py-3 text-center ${
            activeTab === 1
              ? "border-b-2 border-black dark:border-white font-semibold"
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
    <section className="max-w-[1200px] mx-auto w-full p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">Your Orders</h2>
          <p className="text-base font-normal">
            Track and manage all your orders
          </p>
        </div>
        {/* <button className="border rounded-xl px-4 py-2">All Orders</button> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {data?.data?.map((item, index) => (
          <SingleOrderCard key={item.id} {...item} orderId={index + 1} />
        ))}
      </div>
    </section>
  );
}

const SingleOrderCard = (props) => {
  const { status, totalAmount, orderId, id, image, createdAt, _count } = props;
  const { date, time } = formatOrderDateTime(createdAt);

  const [open, setOpen] = useState(false);

  return (
    <>
      <OrderModals isOpen={open} onClose={() => setOpen(false)}>
        <CompleteOrderDetails id={id} onClose={()=>setOpen((prev)=>!prev)} />
      </OrderModals>
      <OrderItemCard
        image={image}
        orderId={orderId}
        price={totalAmount}
        date={date}
        time={time}
        status={status}
        items={_count.items}
        onViewDetails={() => setOpen((prev) => !prev)}
      />
    </>
  );
};

const CompleteOrderDetails = ({ id,onClose }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["completeOrderDetail", id],
    queryFn: () => ServicegetOrderDetailsByUser(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (data?.orderdetails.length === 0)
    return <Empty heading="There is no detail" />;

  return (
    <div className="h-full p-4 pt-14 text-white flex  flex-col gap-4 mt-5">
      <h3 className="text-xl font-semibold text-black dark:text-white">
        Order Details
      </h3>
      <SingleOrderSummary
        createdAt={formatOrderDateTime(data?.orderdetails[0].createdAt)}
        image={data?.orderdetails[0].order.image}
        orderId={data?.orderdetails[0].orderId}
        totalAmount={data?.orderdetails[0].order.totalAmount}
        status={data?.orderdetails[0].order.status}
      />
      <p className="text-black dark:text-white text-xl font-semibold">
        Items({data?.orderdetails.length})
      </p>
      {data?.orderdetails?.map((item) => (
        <div
          key={item.id}
          className="border flex text-black dark:text-white p-2 rounded-xl"
        >
          <img
            src={item.product.image}
            width={120}
            height={120}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/300X300?text=Food+Image`;
            }}
            className="aspect-square object-cover shrink-0 rounded-xl"
            alt="image"
          />
          <div className="flex-1 p-4 flex justify-between items-start">
            <p className="flex flex-col justify-between items-start mt-2 px-2">
              <span className="text-base font-medium">{item.product.name}</span>
              <span className="flex justify-end text-sm pr-2 pb-2">
                QTY - {item.quantity}
              </span>
              <span className="flex  text-base justify-end pr-2 pb-2 md:hidden">
                ${item.product.price}
              </span>
            </p>
            <p className="justify-end pr-2 pb-2 text-base hidden md:flex">
              ${item.product.price}
            </p>
          </div>
        </div>
      ))}
      <OrderFooter
        totalAmount={data?.orderdetails[0].order.totalAmount}
        onClose={onClose}
      />
    </div>
  );
};
