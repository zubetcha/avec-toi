"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface EndingCardProps {
  endingMessage: string;
  onEndingMessageChange: (message: string) => void;
}

export default function EndingCard({ endingMessage, onEndingMessageChange }: EndingCardProps) {
  const presetMessages = [
    "소중한 분들을 초대합니다.\n함께해 주신다면 더없는 기쁨이겠습니다.",
    "귀한 발걸음 해주셔서 감사합니다.\n행복하게 잘 살겠습니다.",
    "저희의 결혼을 축복해 주셔서 감사합니다.\n늘 건강하시고 행복하세요.",
    "여러분의 축복 속에 새로운 시작을 하려 합니다.\n함께해 주셔서 감사합니다.",
  ];

  const handlePresetSelect = (preset: string) => {
    onEndingMessageChange(preset);
  };

  return (
    <CustomizationCard title="엔딩 메시지">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장 마지막에 표시할 메시지를 작성하세요.</p>

        <div>
          <label htmlFor="ending-message" className="mb-1 block text-sm font-medium text-gray-700">
            엔딩 메시지
          </label>
          <textarea
            id="ending-message"
            value={endingMessage}
            onChange={(e) => onEndingMessageChange(e.target.value)}
            className="h-28 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="엔딩 메시지를 입력하세요"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">또는 엔딩 메시지 템플릿 선택</p>
          <div className="space-y-2">
            {presetMessages.map((preset, index) => (
              <button
                key={index}
                onClick={() => handlePresetSelect(preset)}
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-left text-sm hover:bg-gray-100"
              >
                {preset.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </button>
            ))}
          </div>
        </div>

        {/* 애니메이션 효과 선택 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="mb-2 text-sm font-medium text-gray-700">메시지 표시 효과</p>
          <div className="flex flex-wrap gap-2">
            {["페이드인", "슬라이드", "타이핑", "반짝임"].map((option) => (
              <button
                key={option}
                className="rounded-md bg-white px-3 py-1 text-sm shadow-sm hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
