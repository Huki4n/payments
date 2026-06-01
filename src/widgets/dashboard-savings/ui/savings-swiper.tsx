import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { SavingsSlide } from '@/entities/goal'

import { savingsSlidesMock } from '../model/savings-mock'
import { SavingGoalDetailCard } from './saving-goal-detail-card'

import 'swiper/css'
import 'swiper/css/pagination'

interface SavingsSwiperProps {
  showConfigureSavingsLink?: boolean
  showEditMenu?: boolean
  onEditGoal?: (goalId: number) => void
  slides?: SavingsSlide[]
  isLoading?: boolean
  loadingMessage?: string
  emptyMessage?: string
  editMenuAria?: string
}

export const SavingsSwiper = ({
  showConfigureSavingsLink = true,
  showEditMenu = false,
  onEditGoal,
  slides,
  isLoading = false,
  loadingMessage = 'Loading…',
  emptyMessage = 'No savings goals yet',
  editMenuAria,
}: SavingsSwiperProps) => {
  const items = slides ?? savingsSlidesMock

  if (isLoading) {
    return (
      <section
        className={
          'flex min-h-64 items-center justify-center rounded-4xl bg-dashboard-card px-6 py-10'
        }
      >
        <p className={'font-display text-lg text-brand-purple/70'}>{loadingMessage}</p>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section
        className={
          'flex min-h-64 items-center justify-center rounded-4xl bg-dashboard-card px-6 py-10'
        }
      >
        <p className={'text-center font-display text-lg text-brand-purple/70'}>{emptyMessage}</p>
      </section>
    )
  }

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
      <section className={'dashboard-savings-swiper w-full min-w-0'}>
        <Swiper
          modules={[Pagination]}
          centeredSlides
          loop={items.length > 1}
          loopAdditionalSlides={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className={'pb-8! w-full min-w-0'}
          spaceBetween={16}
          breakpoints={{
            640: { spaceBetween: 20 },
          }}
        >
          {items.map(slide => (
            <SwiperSlide key={slide.id}>
              <SavingGoalDetailCard
                slide={slide}
                showConfigureSavingsLink={showConfigureSavingsLink}
                showEditMenu={showEditMenu}
                onEditGoal={onEditGoal}
                editMenuAria={editMenuAria}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}
