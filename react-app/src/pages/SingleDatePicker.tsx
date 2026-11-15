import { useState } from "react";
import { AppSingleDatePicker } from "../components/app_single-date-picker";

const today = new Date();
const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const minDate = `${today.getFullYear() - 2}-01-01`;

export function SingleDatePickerPage() {
  const [date, setDate] = useState("");
  const [clampedDate, setClampedDate] = useState("");

  return (
    <main className="flex flex-col gap-10 p-8">
      <section className="flex flex-col gap-1">
        <p className="text-sm text-muted">Home /</p>
        <h1 className="text-4xl font-light">Single Date Picker</h1>
        <p className="text-sm text-muted">
          Single date picker variations. Manual date entry and a one-month
          calendar with single-day selection.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Default
        </p>
        <div className="w-3/12">
          <AppSingleDatePicker value={date} onChange={setDate} />
          <p className="text-sm my-1 text-muted">
            {date ? `Selected: ${date}` : "No date selected."}
          </p>
        </div>

      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Bounded
        </p>
        <div className="w-3/12">

          <AppSingleDatePicker
            value={clampedDate}
            onChange={setClampedDate}
            minDate={minDate}
            maxDate={maxDate}
            label="Pick a date"
          />
          <p className="text-sm text-muted">
            Dates restricted to {minDate} → {maxDate}.
          </p>
        </div>
      </section>
    </main>
  );
}
