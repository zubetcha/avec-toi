"use client";

import React from "react";

interface WeddingCalendarProps {
  weddingDate: string;
  weddingTime?: string;
}

export default function WeddingCalendar({ weddingDate, weddingTime }: WeddingCalendarProps) {
  if (!weddingDate) return null;

  const date = new Date(weddingDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const selectedDay = date.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push(i);
  }

  const formattedTime = weddingTime
    ? `${weddingTime.split(":")[0]}시 ${weddingTime.split(":")[1]}분`
    : "";

  return (
    <div className="rounded-lg bg-white/50 p-4">
      <div className="mb-3 text-center">
        <p className="text-lg font-medium text-gray-800">
          {year}년 {monthNames[month]}
        </p>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`py-1 text-center text-xs font-medium ${
              index === 0 ? "text-red-400" : index === 6 ? "text-blue-400" : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const isSelected = day === selectedDay;
          const dayOfWeek = index % 7;
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;

          return (
            <div
              key={index}
              className={`flex aspect-square items-center justify-center text-sm ${
                day === null
                  ? ""
                  : isSelected
                    ? "rounded-full bg-primary font-bold text-white"
                    : isSunday
                      ? "text-red-400"
                      : isSaturday
                        ? "text-blue-400"
                        : "text-gray-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {formattedTime && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">{formattedTime}</p>
        </div>
      )}
    </div>
  );
}
