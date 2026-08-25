import SlideCard from "./SlideCard";
import HeroVideo from "./HeroVideo";
import SwiperUtils2 from "../Products/SwiperUtils/SwiperUtils2";
import { SwiperSlide } from "swiper/react";
import TopHeading from "../Category/TopHeading";

const images = [
  "https://images.unsplash.com/photo-1605926637412-b0cd5a3e3543?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1510195429239-8a5c0222144a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1605926637412-b0cd5a3e3543?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1510195429239-8a5c0222144a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
];

const HeroSection = () => {
  return (
    <section>
      <HeroVideo />
      <TopHeading
        heading={`Popular Food Item`}
        subHeading={`This month`}
        className="px-4"
      />
      <SwiperUtils2
        showDots={false}
        rows={1}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
            centeredSlides: false,
            centeredSlidesBounds: false,
          },
        }}
      >
        <div className="w-full">
          {images.map((item) => (
            <SwiperSlide>
              <SlideCard
                item={item}
              />
            </SwiperSlide>
          ))}
        </div>
      </SwiperUtils2>
    </section>
  );
};

export default HeroSection;
