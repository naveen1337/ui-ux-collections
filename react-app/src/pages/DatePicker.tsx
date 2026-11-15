import { useState } from "react";
import { AppDateRangePicker } from "../components/app_date-picker";
import type { DateRange } from "../../../components/date-picker/react/date-picker";

const today = new Date();
const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const minDate = `${today.getFullYear() - 2}-01-01`;

export function DatePickerPage() {
  const [range, setRange] = useState<DateRange>({ start: "", end: "" });
  const [clampedRange, setClampedRange] = useState<DateRange>({ start: "", end: "" });

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Date Picker</h1>
        <p className="text-sm text-muted">
          Date range picker variations. Manual date entry, presets, and a
          two-month calendar with range selection.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default
        </p>
        <AppDateRangePicker value={range} onChange={setRange} />
        <p className="text-sm text-muted">
          {range.start && range.end
            ? `Selected: ${range.start} → ${range.end}`
            : "No range selected."}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Bounded
        </p>
        <AppDateRangePicker
          value={clampedRange}
          onChange={setClampedRange}
          minDate={minDate}
          maxDate={maxDate}
          startLabel="From"
          endLabel="To"
        />
        <p className="text-sm text-muted">
          Dates restricted to {minDate} → {maxDate}.
        </p>
      </section>
    </main>
  );
}
