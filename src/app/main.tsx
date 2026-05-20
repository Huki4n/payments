import { createRoot } from 'react-dom/client'

import '@/shared/styles/index.css'
import '@/shared/i18n'
import { readAppSettings } from '@/shared/lib/app-settings-storage'
import { applyColorScheme } from '@/shared/lib/apply-color-scheme'

import { App } from './App'

applyColorScheme(readAppSettings().colorScheme)

createRoot(document.getElementById('root')!).render(<App />)
