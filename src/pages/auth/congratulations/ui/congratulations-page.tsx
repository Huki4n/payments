import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AUTH_PAGE_SHELL_CLASSNAME } from '@/pages/auth/lib/auth-page-shell'
import { Button } from '@/shared/ui'

const CongratulationsIllustration = () => (
  <svg
    width={'574'}
    height={'489'}
    viewBox={'0 0 574 489'}
    fill={'none'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <foreignObject x={'-19.2'} y={'151.8'} width={'389.4'} height={'389.4'}>
      <div
        style={{
          backdropFilter: 'blur(26.1px)',
          clipPath: 'url(#bgblur_0_86_2_clip_path)',
          height: '100%',
          width: '100%',
        }}
      />
    </foreignObject>
    <circle
      data-figma-bg-blur-radius={'52.2'}
      cx={'175.5'}
      cy={'346.5'}
      r={'141.5'}
      fill={'url(#paint0_linear_86_2)'}
      stroke={'url(#paint1_linear_86_2)'}
      strokeWidth={'2'}
    />
    <foreignObject x={'131.906'} y={'-3.19974'} width={'437.188'} height={'421.72'}>
      <div
        style={{
          backdropFilter: 'blur(18.25px)',
          clipPath: 'url(#bgblur_1_86_2_clip_path)',
          height: '100%',
          width: '100%',
        }}
      />
    </foreignObject>
    <path
      data-figma-bg-blur-radius={'36.5'}
      d={
        'M329.614 47.667C337.835 29.8449 363.165 29.8449 371.386 47.667L407.022 124.929C410.664 132.824 418.146 138.259 426.78 139.283L511.273 149.302C530.763 151.613 538.591 175.702 524.182 189.027L461.714 246.796C455.331 252.699 452.473 261.495 454.167 270.022L470.749 353.476C474.574 372.726 454.082 387.614 436.956 378.028L362.711 336.469C355.124 332.222 345.876 332.222 338.289 336.469L264.044 378.028C246.918 387.614 226.426 372.726 230.251 353.476L246.833 270.022C248.527 261.495 245.669 252.699 239.286 246.796L176.818 189.027C162.409 175.702 170.237 151.613 189.727 149.302L274.22 139.283C282.854 138.259 290.336 132.824 293.978 124.929L329.614 47.667Z'
      }
      fill={'url(#paint2_linear_86_2)'}
      stroke={'url(#paint3_linear_86_2)'}
      strokeWidth={'2'}
    />
    <circle cx={'33'} cy={'171'} r={'33'} fill={'#0147FF'} fillOpacity={'0.37'} />
    <defs>
      <clipPath id={'bgblur_0_86_2_clip_path'} transform={'translate(19.2 -151.8)'}>
        <circle cx={'175.5'} cy={'346.5'} r={'141.5'} />
      </clipPath>
      <clipPath id={'bgblur_1_86_2_clip_path'} transform={'translate(-131.906 3.19974)'}>
        <path
          d={
            'M329.614 47.667C337.835 29.8449 363.165 29.8449 371.386 47.667L407.022 124.929C410.664 132.824 418.146 138.259 426.78 139.283L511.273 149.302C530.763 151.613 538.591 175.702 524.182 189.027L461.714 246.796C455.331 252.699 452.473 261.495 454.167 270.022L470.749 353.476C474.574 372.726 454.082 387.614 436.956 378.028L362.711 336.469C355.124 332.222 345.876 332.222 338.289 336.469L264.044 378.028C246.918 387.614 226.426 372.726 230.251 353.476L246.833 270.022C248.527 261.495 245.669 252.699 239.286 246.796L176.818 189.027C162.409 175.702 170.237 151.613 189.727 149.302L274.22 139.283C282.854 138.259 290.336 132.824 293.978 124.929L329.614 47.667Z'
          }
        />
      </clipPath>
      <linearGradient
        id={'paint0_linear_86_2'}
        x1={'51.5526'}
        y1={'235.974'}
        x2={'274.974'}
        y2={'512.289'}
        gradientUnits={'userSpaceOnUse'}
      >
        <stop stopColor={'#0147FF'} stopOpacity={'0.48'} />
        <stop offset={'1'} stopColor={'#012072'} stopOpacity={'0.98'} />
      </linearGradient>
      <linearGradient
        id={'paint1_linear_86_2'}
        x1={'83.1316'}
        y1={'190.184'}
        x2={'267.868'}
        y2={'489'}
        gradientUnits={'userSpaceOnUse'}
      >
        <stop stopColor={'white'} />
        <stop offset={'1'} stopColor={'#000001'} stopOpacity={'0.24'} />
      </linearGradient>
      <linearGradient
        id={'paint2_linear_86_2'}
        x1={'248'}
        y1={'-5.76912e-07'}
        x2={'454'}
        y2={'404.5'}
        gradientUnits={'userSpaceOnUse'}
      >
        <stop stopColor={'#ECF2FF'} stopOpacity={'0.36'} />
        <stop offset={'1'} stopColor={'#A7BFFF'} stopOpacity={'0.52'} />
      </linearGradient>
      <linearGradient
        id={'paint3_linear_86_2'}
        x1={'265'}
        y1={'21'}
        x2={'574'}
        y2={'493.5'}
        gradientUnits={'userSpaceOnUse'}
      >
        <stop offset={'0.341346'} stopColor={'white'} />
        <stop offset={'1'} stopColor={'#12033A'} stopOpacity={'0.3'} />
      </linearGradient>
    </defs>
  </svg>
)

export const CongratulationsPage = () => {
  const { t } = useTranslation('onboarding')
  const navigate = useNavigate()

  return (
    <div className={AUTH_PAGE_SHELL_CLASSNAME}>
      <header className={'px-6 pt-12 sm:pt-16 lg:pt-20'}>
        <h1
          className={
            'text-center font-display text-3xl font-bold leading-tight text-brand-purple sm:text-4xl md:text-5xl'
          }
        >
          {t('congratulations.title')}
        </h1>
      </header>

      <main className={'flex flex-1 flex-col items-center justify-center px-4 py-8'}>
        <CongratulationsIllustration />
      </main>

      <footer className={'flex flex-col items-center px-6 pb-12 sm:pb-14'}>
        <Button
          type={'button'}
          onClick={() => navigate('/')}
          className={
            'h-14 w-72 max-w-full rounded-[11px] bg-brand-purple-bg font-display text-xl font-bold text-white hover:bg-brand-purple-bg/90 sm:h-16'
          }
        >
          {t('congratulations.proceed')}
        </Button>
      </footer>
    </div>
  )
}
