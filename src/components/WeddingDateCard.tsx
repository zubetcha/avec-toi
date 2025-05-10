"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface WeddingDateCardProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function WeddingDateCard({
  date,
  time,
  onDateChange,
  onTimeChange,
}: WeddingDateCardProps) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    onDateChange(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    onTimeChange(e.target.value);
  };

  const timeOptions = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeChange(time);
  };

  return (
    <CustomizationCard title="예식 일시">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">예식 날짜와 시간을 선택하세요.</p>

        <div>
          <label htmlFor="wedding-date" className="mb-1 block text-sm font-medium text-gray-700">
            예식 날짜
          </label>
          <input
            type="date"
            id="wedding-date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="wedding-time" className="mb-1 block text-sm font-medium text-gray-700">
            예식 시간
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="time"
              id="wedding-time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">시간 빠른 선택</p>
          <div className="flex flex-wrap gap-2">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`rounded-md px-3 py-1 text-sm transition-all ${
                  selectedTime === time
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
