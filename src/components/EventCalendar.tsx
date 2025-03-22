"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  // Function to check if a date is Sunday
  const isSunday = (date: Date) => {
    return date.getDay() === 0; // 0 corresponds to Sunday
  };

  return (
    <Calendar
      onChange={onChange}
      value={value}
      calendarType="gregory"
      tileDisabled={({ date }) => isSunday(date)} // Disable Sundays
      className="border rounded-md p-2"
    />
  );
};

export default EventCalendar;