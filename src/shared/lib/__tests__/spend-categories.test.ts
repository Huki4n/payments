import { describe, expect, it } from 'vitest'

import { getSpendCategoryIcon, resolveSpendCategoryId } from '@/shared/config/spend-categories'

describe('resolveSpendCategoryId', () => {
  it('resolves internal category ids', () => {
    expect(resolveSpendCategoryId('catSubscriptions')).toBe('catSubscriptions')
  })

  it('resolves Russian display names from API', () => {
    expect(resolveSpendCategoryId('Подписки')).toBe('catSubscriptions')
    expect(resolveSpendCategoryId('Коммунальные услуги')).toBe('catUtilities')
    expect(resolveSpendCategoryId('Связь')).toBe('catTelecom')
  })

  it('resolves legacy ids', () => {
    expect(resolveSpendCategoryId('catHome')).toBe('catUtilities')
  })

  it('falls back to catOther for unknown values', () => {
    expect(resolveSpendCategoryId('Неизвестная категория')).toBe('catOther')
  })
})

describe('getSpendCategoryIcon', () => {
  it('maps API display name to category icon', () => {
    expect(getSpendCategoryIcon('Подписки')).toBe('credit-card')
    expect(getSpendCategoryIcon('Коммунальные услуги')).toBe('storefront')
    expect(getSpendCategoryIcon('Связь')).toBe('cable')
    expect(getSpendCategoryIcon('Такси')).toBe('car-taxi-front')
  })
})
