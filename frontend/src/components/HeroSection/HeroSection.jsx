import SlideCard from "./SlideCard";
import HeroVideo from "./HeroVideo";
import SwiperUtils2 from "../Products/SwiperUtils/SwiperUtils2";
import { SwiperSlide } from "swiper/react";
import TopHeading from "../Category/TopHeading";
import { CategoryItem } from "../Category/CategoryList";

const popularFoods = [
  {
    id: 1,
    name: "Pizza",
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 2,
    name: "Sushi",
    image:
      "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 3,
    name: "Tacos",
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 4,
    name: "Burger",
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 5,
    name: "Pasta",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 6,
    name: "Ramen",
    image:
      "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 7,
    name: "Biryani",
    image:
      "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 8,
    name: "Paella",
    image:
      "https://images.pexels.com/photos/12419160/pexels-photo-12419160.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 9,
    name: "Pad Thai",
    image:
      "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 10,
    name: "Croissant",
    image:
      "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 11,
    name: "Dim Sum",
    image:
      "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    id: 12,
    name: "Peking Duck",
    image:
      "https://images.pexels.com/photos/6646077/pexels-photo-6646077.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
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
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 4.5,
            spaceBetween: 16,
            centeredSlides: false,
            centeredSlidesBounds: false,
          },
        }}
      >
        <div className="w-full">
          {popularFoods.map((item) => (
            <SwiperSlide>
              <CategoryItem {...item} heading="Popular Food" />
            </SwiperSlide>
          ))}
        </div>
      </SwiperUtils2>
    </section>
  );
};

export default HeroSection;
