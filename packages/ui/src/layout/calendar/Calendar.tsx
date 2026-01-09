import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { Props } from "./types";
import "react-calendar/dist/Calendar.css";

export default function Calendario({
  maxDate,
  minDate,
  className,
}: Readonly<Props>) {
  const [newValue, setNewValue] = useState<CalendarProps["value"]>(null);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const dateMin = minDate ? new Date(minDate.toString()) : undefined;
  const dateMax = maxDate ? new Date(maxDate.toString()) : undefined;
  const isPrevDisabled =
    dateMin &&
    activeStartDate?.getFullYear() === dateMin.getFullYear() &&
    activeStartDate?.getMonth() === dateMin.getMonth();
  const isNextDisabled =
    dateMax &&
    activeStartDate?.getFullYear() === dateMax.getFullYear() &&
    activeStartDate?.getMonth() === dateMax.getMonth();

  return (
    <Calendar
      className={className}
      onChange={(value) => {
        setNewValue(value);
      }}
      value={newValue}
      maxDate={dateMax}
      minDate={dateMin}
      onActiveStartDateChange={({ activeStartDate }) =>
        setActiveStartDate(activeStartDate)
      }
      nextLabel={
        <ArrowBigRight
          className={isNextDisabled ? "opacity-50 cursor-not-allowed" : ""}
        />
      }
      prevLabel={
        <ArrowBigLeft
          className={isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""}
        />
      }
      next2Label={null}
      prev2Label={null}
    />
  );
}
