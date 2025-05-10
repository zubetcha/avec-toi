"use client";

import { useState, ReactNode } from "react";
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
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* 토글 버튼 (좌측) */}
          <button
            onClick={toggleEnabled}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-gray-200 focus:outline-none ${
              isEnabled ? "bg-rose-500" : "bg-gray-200"
            }`}
            role="switch"
            aria-checked={isEnabled}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>

        {/* 확장/축소 버튼 (우측) */}
        <button
          onClick={toggleExpand}
          className="rounded p-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label={isExpanded ? "접기" : "펼치기"}
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
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
