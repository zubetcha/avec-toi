"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import locale from "antd/lib/date-picker/locale/ko_KR";
import { useInvitationStore } from "@/stores/invitation-store";

export default function WeddingDateCard() {
  const { data, setField } = useInvitationStore();

  // date 형식: "2024-05-11", time 형식: "14:30"
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    data.weddingDate ? dayjs(data.weddingDate) : null
  );
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(
    data.weddingTime ? dayjs(`2000-01-01T${data.weddingTime}`) : null
  );

  const handleDateChange = (value: Dayjs | null) => {
    setSelectedDate(value);
    if (value) {
      setField("weddingDate", value.format("YYYY-MM-DD"));
    }
  };

  const handleTimeChange = (value: Dayjs | null) => {
    setSelectedTime(value);
    if (value) {
      setField("weddingTime", value.format("HH:mm"));
    }
  };

  // DatePicker 스타일 커스터마이징
  const datePickerStyle = {
    width: "100%",
  };

  // TimePicker 스타일 커스터마이징
  const timePickerStyle = {
    width: "100%",
  };

  return (
    <CustomizationCard title="예식 일시">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">예식 날짜와 시간을 선택하세요.</p>

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="mb-4 sm:mb-0 sm:flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">예식 날짜</label>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              style={datePickerStyle}
              locale={locale}
              placeholder="날짜 선택"
              format="YYYY년 MM월 DD일"
            />
          </div>

          <div className="sm:flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">예식 시간</label>
            <TimePicker
              value={selectedTime}
              onChange={handleTimeChange}
              style={timePickerStyle}
              format="HH:mm"
              placeholder="시간 선택"
              minuteStep={30}
              showNow={false}
              hideDisabledOptions
              use12Hours={false}
            />
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
