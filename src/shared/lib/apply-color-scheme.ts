import type { AppSettingsColorScheme } from '@/shared/lib/app-settings-storage'

/** Синхронизация класса `dark` на `<html>` с сохранённой темой. */
export function applyColorScheme(scheme: AppSettingsColorScheme): void {
  if (typeof document === 'undefined') {
    return
  }
  const root = document.documentElement

  if (scheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}
