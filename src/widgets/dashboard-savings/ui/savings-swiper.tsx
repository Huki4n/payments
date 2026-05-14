import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { savingsSlidesMock } from "../model/savings-mock";

import { SavingGoalDetailCard } from "./saving-goal-detail-card";

import "swiper/css";
import "swiper/css/pagination";

interface SavingsSwiperProps {
  showConfigureSavingsLink?: boolean;
}

export const SavingsSwiper = ({
  showConfigureSavingsLink = true,
}: SavingsSwiperProps) => {
  return (
    <>
      <style>
        {`
          .dashboard-savings-swiper .swiper-wrapper {
            align-items: stretch;
          }
          .dashboard-savings-swiper .swiper-slide {
            display: flex;
            box-sizing: border-box;
            height: auto;
            align-self: stretch;
          }
          .dashboard-savings-swiper .swiper-slide > .savings-slide-card {
            flex: 1 1 auto;
            width: 100%;
            min-height: 0;
          }
          .dashboard-savings-swiper .swiper-pagination-bullet {
            background: var(--dashboard-swiper-bullet-inactive);
            opacity: 1;
          }
          .dashboard-savings-swiper .swiper-pagination-bullet-active {
            background: var(--scrollbar-thumb);
          }
        `}
      </style>
      <section className="dashboard-savings-swiper w-full min-w-0">
        <Swiper
          modules={[Pagination]}
          centeredSlides
          loop
          loopAdditionalSlides={0}
          spaceBetween={16}
          slidesPerView={1.09}
          pagination={{ clickable: true }}
          className="pb-8! w-full min-w-0"
          breakpoints={{
            480: { slidesPerView: 1.09, spaceBetween: 16 },
            768: { slidesPerView: 1.09, spaceBetween: 20 },
          }}
        >
          {savingsSlidesMock.map((slide) => (
            <SwiperSlide key={slide.id}>
              <SavingGoalDetailCard
                slide={slide}
                showConfigureSavingsLink={showConfigureSavingsLink}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};
