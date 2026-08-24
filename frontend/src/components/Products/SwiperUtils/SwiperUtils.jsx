import "./style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useId } from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, Navigation } from "swiper/modules";

const SwiperUtils = ({
  children,
  className = "",
  slidePerView = 1.2,
  showDots = true,
  enableAutoplay = false,
  enableNavigation = true,
  breakpoints = {
    640: {
      slidesPerView: 4,
      spaceBetween: 16,
      centeredSlides: false,
      centeredSlidesBounds: false,
    },
  },
}) => {
  const paginationId = useId().replace(/:/g, "");

  return (
    <>
      <Swiper
        spaceBetween={16}
        slidesPerView={slidePerView}
        centeredSlides={true}
        centeredSlidesBounds={true}
        watchOverflow={false}
        pagination={
          showDots
            ? { el: `#${paginationId}`, clickable: true }
            : false
        }
        autoplay={
          enableAutoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        breakpoints={breakpoints}
        navigation={enableNavigation}
        modules={[Pagination, Mousewheel, Navigation, Autoplay]}
        mousewheel={{ forceToAxis: true }}
        className={`swiper-mobile-peek ${className}`.trim()}
      >
        {children}
      </Swiper>

      {showDots && (
        <div
          id={paginationId}
          className="swiper-mobile-peek-pagination mt-4 flex justify-center"
        />
      )}

      <style jsx global>{`
        @media (max-width: 639px) {
          .swiper-mobile-peek .swiper-slide {
            width: calc(100% - 28px);
            height: auto;
            display: flex;
          }
        }

        .swiper-mobile-peek {
          position: relative;
          padding-bottom: 22px;
        }

        .swiper-mobile-peek .swiper-wrapper {
          align-items: stretch;
        }

        .swiper-mobile-peek-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #367e8a;
          opacity: 0.55;
          margin: 0 4px !important;
        }

        .swiper-mobile-peek-pagination .swiper-pagination-bullet-active {
          background: #367e8a;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default SwiperUtils;