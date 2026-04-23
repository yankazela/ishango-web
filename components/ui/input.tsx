import * as React from 'react'

import { cn } from '@/lib/utils'

const sanitizeNumericValue = (value: string) => {
  const trimmed = value.trim()

  if (!trimmed) return ''

  const isNegative = trimmed.startsWith('-')
  const unsigned = trimmed.replace(/[^\d.]/g, '')
  const [integerPart, ...decimalParts] = unsigned.split('.')
  const normalizedInteger = integerPart || '0'
  const normalizedDecimal = decimalParts.join('')
  const normalized = normalizedDecimal
    ? `${normalizedInteger}.${normalizedDecimal}`
    : unsigned.endsWith('.')
      ? `${normalizedInteger}.`
      : normalizedInteger

  return isNegative ? `-${normalized}` : normalized
}

const formatNumericValue = (value: string | number | readonly string[] | undefined) => {
  if (value === undefined || value === null || value === '') {
    return ''
  }

  const rawValue = Array.isArray(value) ? value[0] : String(value)
  const sanitized = sanitizeNumericValue(rawValue)

  if (!sanitized) {
    return ''
  }

  const isNegative = sanitized.startsWith('-')
  const unsigned = isNegative ? sanitized.slice(1) : sanitized
  const [integerPart, decimalPart] = unsigned.split('.')
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const formatted = decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger

  return isNegative ? `-${formatted}` : formatted
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, value, onChange, inputMode, ...props }, ref) => {
    const isNumericInput = type === 'number'

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNumericInput) {
        onChange?.(event)
        return
      }

      const sanitizedValue = sanitizeNumericValue(event.target.value)
      const clonedEvent = {
        ...event,
        target: {
          ...event.target,
          value: sanitizedValue,
        },
        currentTarget: {
          ...event.currentTarget,
          value: sanitizedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>

      onChange?.(clonedEvent)
    }

    return (
      <input
        ref={ref}
        type={isNumericInput ? 'text' : type}
        inputMode={isNumericInput ? inputMode ?? 'decimal' : inputMode}
        value={isNumericInput ? formatNumericValue(value) : value}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        onChange={handleChange}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
