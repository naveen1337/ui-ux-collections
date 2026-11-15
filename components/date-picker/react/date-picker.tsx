import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker, type DateRange as RDPRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import {
  format,
  isAfter,
  isBefore,
  isValid,
  parse,
  parseISO,
  startOfToday,
  subDays,
  subMonths,
  subYears,
} from 'date-fns'

export type DateRange = {
  start: string
  end: string
}

export type DateRangePreset = {
  key: string
  label: string
  getRange: (today?: Date) => DateRange
}

type DateRangePickerProps = {
  value: DateRange
  onChange: (range: DateRange) => void
  minDate?: string
  maxDate?: string
  presets?: DateRangePreset[]
  startLabel?: string
  endLabel?: string
  submitLabel?: string
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

export function getDefaultDateRangePresets(): DateRangePreset[] {
  return [
    { key: 'last7', label: 'Last 7 days', getRange: (today = startOfToday()) => ({ start: toISODate(subDays(today, 6)), end: toISODate(today) }) },
    { key: 'last14', label: '2 weeks', getRange: (today = startOfToday()) => ({ start: toISODate(subDays(today, 13)), end: toISODate(today) }) },
    { key: 'last1m', label: '1 month', getRange: (today = startOfToday()) => ({ start: toISODate(subMonths(today, 1)), end: toISODate(today) }) },
    { key: 'last3m', label: '3 months', getRange: (today = startOfToday()) => ({ start: toISODate(subMonths(today, 3)), end: toISODate(today) }) },
    { key: 'last6m', label: '6 months', getRange: (today = startOfToday()) => ({ start: toISODate(subMonths(today, 6)), end: toISODate(today) }) },
    { key: 'last1y', label: '1 year', getRange: (today = startOfToday()) => ({ start: toISODate(subYears(today, 1)), end: toISODate(today) }) },
  ]
}

function clamp(date: Date, min?: Date, max?: Date) {
  let d = date
  if (min && isBefore(d, min)) d = min
  if (max && isAfter(d, max)) d = max
  return d
}

function normalize(startD: Date, endD: Date, min?: Date, max?: Date): DateRange {
  let s = startD
  let e = endD
  if (isAfter(s, e)) [s, e] = [e, s]
  s = clamp(s, min, max)
  e = clamp(e, min, max)
  if (isAfter(s, e)) [s, e] = [e, s]
  return { start: toISODate(s), end: toISODate(e) }
}

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13 2h-2V1h-1v1H6V1H5v1H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 11H3V6h10v7zm0-8H3V3h2v1h1V3h4v1h1V3h2v2z" />
    </svg>
  )
}

export function DateRangePicker({
  value,
  onChange,
  minDate,
  maxDate,
  presets,
  startLabel = 'Start date',
  endLabel = 'End date',
  submitLabel = 'Apply',
  className = '',
}: DateRangePickerProps) {
  const items = useMemo(() => presets ?? getDefaultDateRangePresets(), [presets])
  const min = minDate ? parseISO(minDate) : undefined
  const max = maxDate ? parseISO(maxDate) : undefined

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DateRange>(value)
  const [startText, setStartText] = useState(toDisplay(value.start))
  const [endText, setEndText] = useState(toDisplay(value.end))
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDraft(value)
    setStartText(toDisplay(value.start))
    setEndText(toDisplay(value.end))
  }, [value.start, value.end])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setDraft(value)
        setStartText(toDisplay(value.start))
        setEndText(toDisplay(value.end))
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open, value])

  const setDraftRange = (startD?: Date, endD?: Date) => {
    if (!startD && !endD) return
    const r = normalize(startD ?? endD!, endD ?? startD!, min, max)
    setDraft(r)
    setStartText(toDisplay(r.start))
    setEndText(toDisplay(r.end))
  }

  const selected: RDPRange | undefined =
    draft.start || draft.end
      ? { from: draft.start ? parseISO(draft.start) : undefined, to: draft.end ? parseISO(draft.end) : undefined }
      : undefined

  const commitStart = () => {
    const d = parseDisplay(startText)
    if (d) setDraftRange(d, draft.end ? parseISO(draft.end) : d)
    else setStartText(toDisplay(draft.start))
  }

  const commitEnd = () => {
    const d = parseDisplay(endText)
    if (d) setDraftRange(draft.start ? parseISO(draft.start) : d, d)
    else setEndText(toDisplay(draft.end))
  }

  const submit = () => {
    if (!draft.start || !draft.end) return
    onChange(draft)
    setOpen(false)
  }

  const activeKey = items.find((p) => {
    const r = p.getRange()
    return r.start === draft.start && r.end === draft.end
  })?.key

  const disabled = [...(min ? [{ before: min }] : []), ...(max ? [{ after: max }] : [])]
  const defaultMonth = draft.start ? parseISO(draft.start) : startOfToday()

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">{startLabel}</span>
          <div className="relative w-36">
            <input
              value={startText}
              placeholder="mm/dd/yyyy"
              onFocus={() => setOpen(true)}
              onChange={(e) => setStartText(e.target.value)}
              onBlur={commitStart}
              onKeyDown={(e) => e.key === 'Enter' && (commitStart(), (e.target as HTMLInputElement).blur())}
              className="h-9 w-full border-0 border-b border-border bg-surface px-3 pr-8 text-sm text-light placeholder:text-muted focus:border-primary focus:outline-none"
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
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">{endLabel}</span>
          <div className="relative w-36">
            <input
              value={endText}
              placeholder="mm/dd/yyyy"
              onFocus={() => setOpen(true)}
              onChange={(e) => setEndText(e.target.value)}
              onBlur={commitEnd}
              onKeyDown={(e) => e.key === 'Enter' && (commitEnd(), (e.target as HTMLInputElement).blur())}
              className="h-9 w-full border-0 border-b border-border bg-surface px-3 pr-8 text-sm text-light placeholder:text-muted focus:border-primary focus:outline-none"
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
        <button
          type="button"
          onClick={submit}
          disabled={!draft.start || !draft.end}
          className="h-9 bg-primary px-4 text-sm font-medium text-white hover:bg-[#0353e9] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 z-50 mt-1 flex max-w-[calc(100vw-2rem)] border border-border bg-surface shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col lg:flex-row">
            <div className="border-b border-border p-2 lg:w-40 lg:border-b-0 lg:border-r">
              <ul className="flex flex-row flex-wrap gap-1 lg:flex-col lg:flex-nowrap">
                {items.map((preset) => {
                  const active = preset.key === activeKey
                  return (
                    <li key={preset.key}>
                      <button
                        type="button"
                        onClick={() => {
                          const r = preset.getRange()
                          setDraftRange(parseISO(r.start), parseISO(r.end))
                        }}
                        className={`w-full px-3 py-2 text-left text-sm ${
                          active ? 'bg-primary text-white' : 'text-light hover:bg-surface-hover'
                        }`}
                      >
                        {preset.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="p-3">
              <DayPicker
                mode="range"
                numberOfMonths={2}
                selected={selected}
                onSelect={(range) => {
                  if (!range) return
                  setDraftRange(range.from, range.to)
                }}
                defaultMonth={defaultMonth}
                disabled={disabled}
                showOutsideDays
                navLayout="around"
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
                  selected: '',
                  range_start:
                    'bg-primary text-white [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-[#0353e9]',
                  range_end:
                    'bg-primary text-white [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-[#0353e9]',
                  range_middle: 'bg-primary/20 [&>button]:hover:bg-primary/30',
                  today: '[&>button]:font-semibold [&>button]:text-primary',
                  outside: '[&>button]:text-muted/50',
                  disabled: 'opacity-40',
                }}
              />
            </div>
          </div>
        </div>
      )}
      <style>{`
        .rdp-carbon { --rdp-accent-color: var(--color-primary); --rdp-accent-background-color: var(--color-primary); --rdp-range_middle-background-color: color-mix(in srgb, var(--color-primary) 20%, transparent); --rdp-range_middle-color: var(--color-light); --rdp-day_button-border-radius: 0; --rdp-day_button-height: 2rem; --rdp-day_button-width: 2rem; --rdp-day-height: 2rem; --rdp-day-width: 2rem; }
        .rdp-carbon .rdp-chevron { width: 16px; height: 16px; }
`}</style>
    </div>
  )
}