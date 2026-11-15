import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { format, isAfter, isBefore, isValid, parse, parseISO, startOfToday } from 'date-fns'

type SingleDatePickerProps = {
  value: string
  onChange: (date: string) => void
  minDate?: string
  maxDate?: string
  label?: string
  placeholder?: string
  className?: string
}

export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

function toDisplay(dateStr: string): string {
  if (!dateStr) return ''
  const d = parseISO(dateStr)
  return isValid(d) ? format(d, 'MM/dd/yyyy') : ''
}

function parseDisplay(text: string): Date | undefined {
  const d = parse(text, 'MM/dd/yyyy', new Date())
  return isValid(d) && format(d, 'MM/dd/yyyy') === text ? d : undefined
}

function clamp(date: Date, min?: Date, max?: Date): Date {
  let d = date
  if (min && isBefore(d, min)) d = min
  if (max && isAfter(d, max)) d = max
  return d
}

function clampMonth(date: Date, min?: Date, max?: Date): Date {
  let d = new Date(date.getFullYear(), date.getMonth(), 1)
  if (min && isBefore(d, new Date(min.getFullYear(), min.getMonth(), 1)))
    d = new Date(min.getFullYear(), min.getMonth(), 1)
  if (max && isAfter(d, new Date(max.getFullYear(), max.getMonth(), 1)))
    d = new Date(max.getFullYear(), max.getMonth(), 1)
  return d
}

function YearInput({
  date,
  onYearChange,
  minYear,
  maxYear,
}: {
  date: Date
  onYearChange: (year: number) => void
  minYear: number
  maxYear: number
}) {
  const [yearText, setYearText] = useState(String(date.getFullYear()))

  const commit = () => {
    if (/^\d{4}$/.test(yearText)) {
      onYearChange(Math.min(Math.max(Number(yearText), minYear), maxYear))
    }
    setYearText(String(date.getFullYear()))
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={4}
      aria-label="Enter year"
      value={yearText}
      onChange={(e) => setYearText(e.target.value.replace(/[^\d]/g, ''))}
      onBlur={commit}
      onKeyDown={(e) => e.key === 'Enter' && (commit(), (e.target as HTMLInputElement).blur())}
      className="w-14 border-0 border-b border-transparent bg-transparent p-0 text-center text-sm font-medium text-light focus:border-primary focus:outline-none"
    />
  )
}

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13 2h-2V1h-1v1H6V1H5v1H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 11H3V6h10v7zm0-8H3V3h2v1h1V3h4v1h1V3h2v2z" />
    </svg>
  )
}

export function SingleDatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  label = 'Date',
  placeholder = 'mm/dd/yyyy',
  className = '',
}: SingleDatePickerProps) {
  const min = minDate ? parseISO(minDate) : undefined
  const max = maxDate ? parseISO(maxDate) : undefined

  const [open, setOpen] = useState(false)
  const [text, setText] = useState(toDisplay(value))
  const [month, setMonth] = useState<Date>(value ? parseISO(value) : startOfToday())
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setText(toDisplay(value))
  }, [value])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setText(toDisplay(value))
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open, value])

  const commit = () => {
    const d = parseDisplay(text)
    if (d) onChange(toISODate(clamp(d, min, max)))
    else setText(toDisplay(value))
  }

  const selected = value ? parseISO(value) : undefined
  const disabled = [...(min ? [{ before: min }] : []), ...(max ? [{ after: max }] : [])]
  const startMonth = min ? clampMonth(min, min, max) : undefined
  const endMonth = max ? clampMonth(max, min, max) : undefined
  const minYear = min?.getFullYear() ?? 1900
  const maxYear = max?.getFullYear() ?? 2100

  const handleYearChange = (year: number) => {
    setMonth(clampMonth(new Date(year, month.getMonth(), 1), min, max))
  }

  const MonthCaption = ({
    calendarMonth,
    className = '',
  }: {
    calendarMonth: { date: Date }
    className?: string
  }) => (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
      {format(calendarMonth.date, 'MMMM')}
      <YearInput
        key={format(calendarMonth.date, 'yyyy-MM')}
        date={calendarMonth.date}
        onYearChange={handleYearChange}
        minYear={minYear}
        maxYear={maxYear}
      />
    </div>
  )

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <label className="flex flex-col gap-1">
        <span className="text-xs text-muted">{label}</span>
        <div className="relative w-full">
          <input
            value={text}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === 'Enter' && (commit(), (e.target as HTMLInputElement).blur())}
            className="py-2 w-full border-0 border-b border-border bg-surface px-3 pr-8 text-sm text-light placeholder:text-muted focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-light hover:bg-surface-hover"
            aria-label="Open calendar"
          >
            <CalendarIcon className="h-4 w-4" />
          </button>
        </div>
      </label>

      {open && (
        <div className="absolute left-0 z-50 mt-1 border border-border bg-surface p-3 shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (!date) return
              onChange(toISODate(clamp(date, min, max)))
              setOpen(false)
            }}
            defaultMonth={month}
            month={month}
            onMonthChange={setMonth}
            startMonth={startMonth}
            endMonth={endMonth}
            disabled={disabled}
            showOutsideDays
            navLayout="around"
            components={{ MonthCaption }}
            classNames={{
              root: 'rdp-root rdp-carbon text-light',
              months: 'rdp-months flex flex-col gap-4 sm:flex-row',
              month: 'rdp-month',
              month_caption: 'rdp-month_caption flex items-center justify-center text-sm font-medium',
              caption_label: 'rdp-caption_label text-sm font-medium',
              button_previous:
                'rdp-button_previous flex h-8 w-8 items-center justify-center text-light hover:bg-surface-hover disabled:opacity-30',
              button_next:
                'rdp-button_next flex h-8 w-8 items-center justify-center text-light hover:bg-surface-hover disabled:opacity-30',
              month_grid: 'rdp-month_grid w-full border-collapse',
              weekdays: 'rdp-weekdays flex',
              weekday: 'rdp-weekday flex h-8 w-8 items-center justify-center text-xs font-normal text-muted',
              week: 'rdp-week flex',
              day: 'rdp-day flex h-8 w-8 items-center justify-center p-0 text-sm',
              day_button:
                'rdp-day_button h-8 w-8 text-sm text-light hover:bg-surface-hover hover:text-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary disabled:text-muted/40 disabled:hover:bg-transparent',
              selected: 'bg-primary',
              today: 'text-primary font-bold',
              outside: '[&>button]:text-muted/50',
              disabled: 'opacity-40',
            }}
          />
        </div>
      )}
      <style>{`
        .rdp-carbon { --rdp-accent-color: var(--color-primary); --rdp-accent-background-color: var(--color-primary); --rdp-range_middle-background-color: color-mix(in srgb, var(--color-primary) 20%, transparent); --rdp-range_middle-color: var(--color-light); --rdp-day_button-border-radius: 0; --rdp-day_button-height: 2rem; --rdp-day_button-width: 2rem; --rdp-day-height: 2rem; --rdp-day-width: 2rem; --rdp-selected-border: 0; --rdp-today-color: var(--color-primary); }
        .rdp-carbon .rdp-chevron { width: 16px; height: 16px; }
        .rdp-carbon .rdp-selected { font-weight: 500; font-size: inherit; }
        .rdp-carbon .rdp-selected .rdp-day_button { background-color: var(--color-primary); color: #ffffff; }
        .rdp-carbon .rdp-selected .rdp-day_button:hover { background-color: #0353e9; }
        .rdp-carbon .rdp-today:not(.rdp-outside) .rdp-day_button { position: relative; font-weight: 600; color: var(--color-primary); }
        .rdp-carbon .rdp-today:not(.rdp-outside) .rdp-day_button::after { content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 3px; height: 3px; background: currentColor; }
        .rdp-carbon .rdp-selected.rdp-today .rdp-day_button { color: #ffffff; }
`}</style>
    </div>
  )
}
