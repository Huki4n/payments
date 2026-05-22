import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import { ArrowLeftRight, BarChart3, Home, Menu, PiggyBank, Settings, UserRound } from 'lucide-react'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { cn } from '@/shared/ui/utils'

const navLinkClass =
  'flex rounded-full px-4 py-1.5 font-display text-sm font-normal whitespace-nowrap transition-colors sm:px-4.5 sm:py-1.5 sm:text-base lg:text-lg'

const navItemInactive =
  'border border-white/30 text-white/50 hover:border-white/50 hover:text-white/80'

const navItemActive = 'bg-brand-blue text-white shadow-sm'

const mobileNavLinkClass =
  'flex items-center gap-3 rounded-2xl px-4 py-3 font-display text-base transition-colors'

const mobileNavItemInactive = 'text-foreground/70 hover:bg-muted hover:text-foreground'

const mobileNavItemActive = 'bg-brand-blue text-white'

const iconButtonClass =
  'rounded-full p-2 text-white outline-offset-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white lg:p-2.5'

type NavItemConfig = {
  to: string
  label: string
  icon: typeof Home
  end?: boolean
}

export const HomeNavigation = () => {
  const { t } = useTranslation('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems: NavItemConfig[] = [
    { to: '/', label: t('nav.home'), icon: Home, end: true },
    { to: '/transactions', label: t('nav.transactions'), icon: ArrowLeftRight },
    { to: '/saves', label: t('nav.savings'), icon: PiggyBank },
    { to: '/analytics', label: t('nav.analytics'), icon: BarChart3 },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={
        'relative z-20 flex w-full items-center justify-between gap-3 px-4 pt-2 sm:gap-4 sm:px-6 sm:pt-3'
      }
    >
      <div className={'flex items-center gap-2 lg:hidden'}>
        <NavLink
          to={'/settings'}
          className={({ isActive }) => cn(iconButtonClass, isActive && mobileNavItemActive)}
          aria-label={t('settingsAria')}
        >
          <Settings className={'size-8 stroke-[1.5]'} />
        </NavLink>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <button
            type={'button'}
            className={cn(iconButtonClass, 'lg:hidden')}
            aria-label={t('menuAria')}
          >
            <Menu className={'size-8 stroke-[1.5]'} />
          </button>
        </SheetTrigger>

        <SheetContent side={'right'} className={'w-[min(100%,20rem)] gap-0 p-0'}>
          <SheetTitle className={'sr-only'}>{t('menuAria')}</SheetTitle>

          <div className={'flex flex-col gap-1 p-4 pt-14'}>
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(mobileNavLinkClass, isActive ? mobileNavItemActive : mobileNavItemInactive)
                }
              >
                <Icon className={'size-5 shrink-0'} />
                {label}
              </NavLink>
            ))}

            <NavLink
              to={'/profile'}
              onClick={closeMenu}
              className={({ isActive }) =>
                cn(
                  mobileNavLinkClass,
                  'mt-2 border',
                  isActive ? mobileNavItemActive : mobileNavItemInactive
                )
              }
            >
              <UserRound className={'size-5 shrink-0'} strokeWidth={1.5} />
              {t('profileAria')}
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>

      <div className={'hidden flex-1 items-center justify-between lg:flex'}>
        <div className={'flex items-center gap-3'}>
          <Link to={'/settings'} className={iconButtonClass} aria-label={t('settingsAria')}>
            <Settings className={'size-8 stroke-[1.5]'} />
          </Link>

          <div className={'flex items-center gap-3'}>
            {navItems.slice(0, 2).map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(navLinkClass, isActive ? navItemActive : navItemInactive)
                }
              >
                <span className={'inline-flex items-center gap-1.5'}>
                  <Icon className={'size-6'} />
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className={'flex items-center gap-3'}>
          {navItems.slice(2).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(navLinkClass, isActive ? navItemActive : navItemInactive)
              }
            >
              <span className={'inline-flex items-center gap-1.5'}>
                <Icon className={'size-6'} />
                {label}
              </span>
            </NavLink>
          ))}

          <Link
            to={'/profile'}
            className={
              'rounded-full border border-white/30 p-2.5 text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            }
            aria-label={t('profileAria')}
          >
            <UserRound className={'size-7'} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
