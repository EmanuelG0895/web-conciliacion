import {
  ArrowBigLeft,
  ArrowBigRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { Props } from "./types";
import "./CalendarioCustom.css";

export default function Calendario({
  maxDate,
  minDate,
  className,
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  disabled = false,
  label,
}: Readonly<Props>) {
  const [newValue, setNewValue] = useState<CalendarProps["value"]>(
    value ? new Date(value.toString()) : null
  );
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const formatDate = (date: CalendarProps["value"]): string => {
    if (date instanceof Date) return date.toLocaleDateString("es-ES");
    return "";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleDateChange = (value: CalendarProps["value"]) => {
    setNewValue(value);
    setIsOpen(false);
    if (onChange && value instanceof Date) {
      const syntheticEvent = {
        target: { value: value.toISOString().split("T")[0] },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={`relative max-w-sm ${className}`} ref={containerRef}>
      {/* BOTÓN DISPARADOR */}
      <label
        htmlFor=""
        className="block text-sm font-medium text-gs-black dark:text-gs-surface-light mb-2"
      >
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg border transition-all min-w-48
        bg-gs-surface-light border-gs-tonal-medium text-gs-text-dark
          dark:bg-gs-surface-dark dark:border-gs-tonal-dark dark:text-gs-text-light
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-gs-primary-medium focus:ring-2 focus:ring-gs-primary-light"}
        `}
      >
        <span className={newValue ? "font-medium" : "opacity-50"}>
          {newValue ? formatDate(newValue) : placeholder}
        </span>
        <CalendarIcon className="w-5 h-5 text-gs-primary-medium" />
      </button>

      {/* CONTENEDOR DEL CALENDARIO */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 z-50 p-4 rounded-xl shadow-2xl border bg-gs-surface-light border-gs-tonal-medium dark:bg-gs-surface-dark dark:border-gs-tonal-dark min-w-[320px]">
          <Calendar
            className={`custom-calendar`}
            onChange={handleDateChange}
            value={newValue}
            maxDate={dateMax}
            minDate={dateMin}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            nextLabel={
              <ArrowBigRight
                className={`w-6 h-6 ${isNextDisabled ? "opacity-20 cursor-not-allowed dark:text-gs-text-light" : "text-gs-text-dark"}`}
              />
            }
            prevLabel={
              <ArrowBigLeft
                className={`w-6 h-6 ${isPrevDisabled ? "opacity-20 cursor-not-allowed dark:text-gs-text-light" : "text-gs-primary-medium"}`}
              />
            }
            next2Label={null}
            prev2Label={null}
          />
        </div>
      )}
    </div>
  );
}
