import { type ReactNode } from 'react'

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@/shared/ui'
import { cn } from '@/shared/ui/utils'

const fieldShellClass =
  'flex min-h-14 items-center justify-between gap-3 rounded-xl bg-data-action-bg px-4 py-3 shadow-sm sm:rounded-2xl sm:px-5'

const inputInFieldClass =
  'h-auto min-h-0 rounded-none border-0 bg-transparent px-0 py-0 font-display text-sm text-brand-purple shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent dark:disabled:bg-transparent md:text-base'

interface SettingsTextFieldProps {
  label: string
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  dimValue?: boolean
  trailing?: ReactNode
  inputType?: React.HTMLInputTypeAttribute
}

export const SettingsTextField = ({
  label,
  value,
  onChange,
  readOnly = false,
  dimValue = false,
  trailing,
  inputType = 'text',
}: SettingsTextFieldProps) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <span className={'font-display text-sm font-medium text-brand-purple sm:text-base'}>
        {label}
      </span>
      <div className={fieldShellClass}>
        {readOnly ? (
          <>
            <span
              className={cn(
                'min-w-0 flex-1 font-display text-sm sm:text-base',
                dimValue ? 'text-brand-purple/50' : 'text-brand-purple'
              )}
            >
              {value}
            </span>
            {trailing}
          </>
        ) : (
          <>
            <Input
              type={inputType}
              value={value}
              onChange={e => onChange?.(e.target.value)}
              className={cn(inputInFieldClass, 'min-w-0 flex-1')}
            />
            {trailing}
          </>
        )}
      </div>
    </div>
  )
}

interface SelectOption {
  value: string
  label: string
}

interface SettingsSelectFieldProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
}

export const SettingsSelectField = ({
  label,
  value,
  onValueChange,
  options,
}: SettingsSelectFieldProps) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <span className={'font-display text-sm font-medium text-brand-purple sm:text-base'}>
        {label}
      </span>
      <div className={cn(fieldShellClass, 'py-2 sm:py-2.5')}>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            size={'default'}
            className={cn(
              'h-auto min-h-0 w-full max-w-none flex-1 rounded-none border-0 bg-transparent py-1 pr-1 pl-0 font-display text-sm text-brand-purple shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent data-[size=default]:h-auto sm:text-base [&_svg]:text-brand-purple'
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

interface SettingsThemeToggleProps {
  label: string
  modeLabel: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export const SettingsThemeToggle = ({
  label,
  modeLabel,
  checked,
  onCheckedChange,
}: SettingsThemeToggleProps) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <span className={'font-display text-sm font-medium text-brand-purple sm:text-base'}>
        {label}
      </span>
      <div className={cn(fieldShellClass, 'justify-between gap-4')}>
        <span className={'min-w-0 flex-1 font-display text-sm text-brand-purple/80 sm:text-base'}>
          {modeLabel}
        </span>
        <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
      </div>
    </div>
  )
}
