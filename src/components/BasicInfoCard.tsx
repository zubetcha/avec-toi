"use client";

import CustomizationCard from "./CustomizationCard";

interface BasicInfoCardProps {
  title: string;
  groomName: string;
  brideName: string;
  onInfoChange: (field: string, value: string) => void;
}

export default function BasicInfoCard({
  title,
  groomName,
  brideName,
  onInfoChange,
}: BasicInfoCardProps) {
  return (
    <CustomizationCard title="기본 정보">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            청첩장 제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => onInfoChange("title", e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="청첩장 제목을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="groomName" className="mb-1 block text-sm font-medium text-gray-700">
            신랑 이름
          </label>
          <input
            type="text"
            id="groomName"
            value={groomName}
            onChange={(e) => onInfoChange("groomName", e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="신랑 이름을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="brideName" className="mb-1 block text-sm font-medium text-gray-700">
            신부 이름
          </label>
          <input
            type="text"
            id="brideName"
            value={brideName}
            onChange={(e) => onInfoChange("brideName", e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="신부 이름을 입력하세요"
          />
        </div>
      </div>
    </CustomizationCard>
  );
}
