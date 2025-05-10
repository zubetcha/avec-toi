"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface ThemeCardProps {
  onThemeChange?: (themeId: number) => void;
  currentThemeId?: number;
}

export default function ThemeCard({ onThemeChange, currentThemeId = 1 }: ThemeCardProps) {
  const themes = [
    { id: 1, name: "클래식", color: "bg-rose-100" },
    { id: 2, name: "모던", color: "bg-blue-100" },
    { id: 3, name: "미니멀", color: "bg-gray-100" },
    { id: 4, name: "로맨틱", color: "bg-pink-100" },
  ];

  const handleThemeSelect = (id: number) => {
    if (onThemeChange) {
      onThemeChange(id);
    }
  };

  return (
    <CustomizationCard title="테마 선택">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 적용할 테마를 선택하세요.</p>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`flex h-20 items-center justify-center rounded-lg border-2 p-4 transition-all ${
                theme.color
              } ${
                currentThemeId === theme.id
                  ? "border-rose-500 shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <span className="font-medium">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </CustomizationCard>
  );
}
