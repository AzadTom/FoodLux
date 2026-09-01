import React, { useId } from "react";
import { Swiper } from "swiper/react";
import {
  Autoplay,
  Mousewheel,
  Pagination,
  Navigation,
  Grid,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

const SwiperUtils2 = ({
  children,
  className = "",
  slidesPerView = 2,
  rows = 2,
  spaceBetween = 16,
  showDots = true,
  enableAutoplay = false,
  enableNavigation = true,
  breakpoints = {},
}) => {
  const paginationId = useId().replace(/:/g, "");

  return (
    <div className={`swiper-utils-2-wrapper ${className}`}>
      <Swiper
        modules={[
          Grid,
          Pagination,
          Mousewheel,
          Navigation,
          Autoplay,
        ]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        grid={{
          rows,
          fill: "row",
        }}
        breakpoints={breakpoints}
        centeredSlides={false}
        centeredSlidesBounds={false}
        watchOverflow={false}
        pagination={
          showDots
            ? {
                el: `#${paginationId}`,
                clickable: true,
              }
            : false
        }
        navigation={enableNavigation}
        mousewheel={{
          forceToAxis: true,
        }}
        autoplay={
          enableAutoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        className="swiper-utils-2"
      >
        {children}
      </Swiper>

      {showDots && (
        <div
          id={paginationId}
          className="swiper-utils-2-pagination"
        />
      )}
    </div>
  );
};

export default SwiperUtils2;