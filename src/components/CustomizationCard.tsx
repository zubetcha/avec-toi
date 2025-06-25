"use client";

import { useState, ReactNode } from "react";
import { Button, Switch } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CustomizationCardProps {
  title: string;
  defaultEnabled?: boolean;
  children: ReactNode;
}

export default function CustomizationCard({
  title,
  defaultEnabled = true,
  children,
}: CustomizationCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="mb-4 rounded-2xl bg-white shadow-[0_4px_16px_0px_rgba(17,17,26,0.03),0_8px_32px_0px_rgba(17,17,26,0.03)]">
      <div
        className={`flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 ${
          isExpanded ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* 토글 스위치 (좌측) */}
          <Switch checked={isEnabled} onChange={toggleEnabled} size="default" />
          <h3 className="mb-0 font-medium text-gray-800">{title}</h3>
        </div>

        {/* 확장/축소 버튼 (우측) */}
        <Button
          onClick={toggleExpand}
          type="text"
          size="middle"
          icon={
            isExpanded ? (
              <ChevronUp strokeWidth={1.5} className="h-6 w-6" />
            ) : (
              <ChevronDown strokeWidth={1.5} className="h-6 w-6" />
            )
          }
          className="text-gray-500 hover:bg-gray-100"
        />
      </div>

      {/* 카드 내용 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`p-4 ${!isEnabled && "opacity-50"}`}>{children}</div>
      </div>
    </div>
  );
}
