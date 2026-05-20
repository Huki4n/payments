import { useTranslation } from 'react-i18next'

import { PageFrame as OnboardingFrame } from '@/shared/ui'

import bg from '../../assets/bg.png'
import tradingIll from '../../assets/trading_ill.png'

export const TradingPage = () => {
  const { t } = useTranslation('onboarding')

  return (
    <OnboardingFrame
      background={bg}
      title={t('trading.title')}
      description={t('trading.description')}
      step={0}
      primaryLabel={t('common.next')}
      primaryTo={'/onboarding/savings'}
      secondaryLabel={t('common.skip')}
      secondaryTo={'/auth'}
      illustration={<img src={tradingIll} alt={'Trading'} className={'w-120 object-cover'} />}
    />
  )
}
