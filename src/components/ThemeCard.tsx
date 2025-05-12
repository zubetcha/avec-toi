"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface ThemeCardProps {
  onThemeChange?: (themeId: number) => void;
  currentThemeId?: number;
  onBackgroundColorChange?: (color: string) => void;
  onBackgroundPatternChange?: (pattern: string) => void;
  onBackgroundEffectChange?: (effect: string) => void;
  onFontChange?: (font: string) => void;
  onFontSizeChange?: (fontSize: string) => void;
  onOptionsChange?: (options: ThemeOptions) => void;
  backgroundColor?: string;
  backgroundPattern?: string;
  backgroundEffect?: string;
  selectedFont?: string;
  selectedFontSize?: string;
  options?: ThemeOptions;
}

interface ThemeOptions {
  useAnimation: boolean;
  useParallaxEffect: boolean;
  useAutoScroll: boolean;
  useHighContrast: boolean;
}

export default function ThemeCard({
  onThemeChange,
  currentThemeId = 1,
  onBackgroundColorChange,
  onBackgroundPatternChange,
  onBackgroundEffectChange,
  onFontChange,
  onFontSizeChange,
  onOptionsChange,
  backgroundColor = "#FFF5F5",
  backgroundPattern = "none",
  backgroundEffect = "none",
  selectedFont = "Noto Sans KR",
  selectedFontSize = "medium",
  options = {
    useAnimation: true,
    useParallaxEffect: false,
    useAutoScroll: false,
    useHighContrast: false,
  },
}: ThemeCardProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(currentThemeId);
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>(options);

  const themes = [
    { id: 1, name: "클래식", color: "bg-rose-100" },
    { id: 2, name: "모던", color: "bg-blue-100" },
    { id: 3, name: "미니멀", color: "bg-gray-100" },
    { id: 4, name: "로맨틱", color: "bg-pink-100" },
  ];

  const backgroundPatterns = [
    { id: "none", name: "없음" },
    { id: "dots", name: "도트" },
    { id: "lines", name: "라인" },
    { id: "grid", name: "그리드" },
    { id: "floral", name: "플로럴" },
    { id: "hearts", name: "하트" },
  ];

  const backgroundEffects = [
    { id: "none", name: "없음" },
    { id: "fade", name: "페이드" },
    { id: "blur", name: "블러" },
    { id: "particles", name: "파티클" },
    { id: "confetti", name: "꽃가루" },
  ];

  const fonts = [
    { id: "Noto Sans KR", name: "노토 산스", sample: "가나다라마바사 ABC" },
    { id: "Nanum Gothic", name: "나눔 고딕", sample: "가나다라마바사 ABC" },
    { id: "Nanum Myeongjo", name: "나눔 명조", sample: "가나다라마바사 ABC" },
    { id: "Gowun Dodum", name: "고운 도담", sample: "가나다라마바사 ABC" },
    { id: "Gowun Batang", name: "고운 바탕", sample: "가나다라마바사 ABC" },
    { id: "Gaegu", name: "개구", sample: "가나다라마바사 ABC" },
  ];

  const predefinedColors = [
    "#FFF5F5", // 연한 분홍
    "#F3F4F6", // 연한 회색
    "#EFF6FF", // 연한 파랑
    "#ECFDF5", // 연한 초록
    "#FDF2F8", // 라이트 핑크
    "#FCE7F3", // 핑크
    "#FFEDD5", // 연한 오렌지
    "#FEF3C7", // 연한 노랑
  ];

  const fontSizes = [
    { id: "small", name: "작게" },
    { id: "medium", name: "보통" },
    { id: "large", name: "크게" },
  ];

  const handleThemeSelect = (id: number) => {
    setSelectedThemeId(id);
    if (onThemeChange) {
      onThemeChange(id);
    }
  };

  const handleBackgroundColorChange = (color: string) => {
    if (onBackgroundColorChange) {
      onBackgroundColorChange(color);
    }
  };

  const handleBackgroundPatternChange = (pattern: string) => {
    if (onBackgroundPatternChange) {
      onBackgroundPatternChange(pattern);
    }
  };

  const handleBackgroundEffectChange = (effect: string) => {
    if (onBackgroundEffectChange) {
      onBackgroundEffectChange(effect);
    }
  };

  const handleFontChange = (font: string) => {
    if (onFontChange) {
      onFontChange(font);
    }
  };

  const handleFontSizeChange = (fontSize: string) => {
    if (onFontSizeChange) {
      onFontSizeChange(fontSize);
    }
  };

  const handleOptionChange = (option: keyof ThemeOptions) => {
    const updatedOptions = {
      ...themeOptions,
      [option]: !themeOptions[option],
    };

    setThemeOptions(updatedOptions);

    if (onOptionsChange) {
      onOptionsChange(updatedOptions);
    }
  };

  return (
    <CustomizationCard title="테마 설정">
      <div className="space-y-6">
        {/* 테마 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">테마 선택</p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`flex h-20 items-center justify-center rounded-lg border-2 p-4 transition-all ${
                  theme.color
                } ${
                  selectedThemeId === theme.id
                    ? "border-rose-500 shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <span className="font-medium">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 배경 색상 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 색상</p>
          <div className="relative">
            <div className="flex flex-wrap gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleBackgroundColorChange(color)}
                  className={`h-8 w-8 rounded-full border ${
                    backgroundColor === color
                      ? "border-rose-500 ring-2 ring-rose-300"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <button
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-xs"
              >
                +
              </button>
            </div>

            {isColorPickerOpen && (
              <div className="mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-md">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                  className="h-8 w-full cursor-pointer rounded border-0"
                />
              </div>
            )}
          </div>
        </div>

        {/* 배경 패턴 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 패턴</p>
          <div className="flex flex-wrap gap-2">
            {backgroundPatterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => handleBackgroundPatternChange(pattern.id)}
                className={`rounded-md px-3 py-1.5 text-sm transition-all ${
                  backgroundPattern === pattern.id
                    ? "bg-rose-100 text-rose-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pattern.name}
              </button>
            ))}
          </div>
        </div>

        {/* 배경 이펙트 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 이펙트</p>
          <div className="flex flex-wrap gap-2">
            {backgroundEffects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => handleBackgroundEffectChange(effect.id)}
                className={`rounded-md px-3 py-1.5 text-sm transition-all ${
                  backgroundEffect === effect.id
                    ? "bg-rose-100 text-rose-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {effect.name}
              </button>
            ))}
          </div>
        </div>

        {/* 글꼴 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">글꼴 선택</p>
          <div className="grid grid-cols-3 gap-2">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => handleFontChange(font.id)}
                className={`flex flex-col items-center justify-center rounded-md border p-2 text-center transition-all ${
                  selectedFont === font.id
                    ? "border-rose-500 bg-rose-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="mb-1 block text-xs font-medium">{font.name}</span>
                <span className="text-xs text-gray-500" style={{ fontFamily: font.id }}>
                  가나다
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 글꼴 크기 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">글꼴 크기</p>
          <div className="flex justify-between gap-2">
            {fontSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => handleFontSizeChange(size.id)}
                className={`flex-1 rounded-md border px-3 py-2 text-center transition-all ${
                  selectedFontSize === size.id
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span
                  className={`font-medium ${
                    size.id === "small" ? "text-xs" : size.id === "medium" ? "text-sm" : "text-base"
                  }`}
                >
                  {size.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 옵션 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">추가 옵션</p>
          <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <label htmlFor="animation-option" className="text-sm text-gray-700">
                애니메이션 효과 사용
              </label>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  id="animation-option"
                  checked={themeOptions.useAnimation}
                  onChange={() => handleOptionChange("useAnimation")}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-rose-500"></span>
                <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="parallax-option" className="text-sm text-gray-700">
                패럴랙스 스크롤 효과
              </label>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  id="parallax-option"
                  checked={themeOptions.useParallaxEffect}
                  onChange={() => handleOptionChange("useParallaxEffect")}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-rose-500"></span>
                <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="autoscroll-option" className="text-sm text-gray-700">
                자동 스크롤 사용
              </label>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  id="autoscroll-option"
                  checked={themeOptions.useAutoScroll}
                  onChange={() => handleOptionChange("useAutoScroll")}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-rose-500"></span>
                <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="highcontrast-option" className="text-sm text-gray-700">
                고대비 모드 사용
              </label>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  id="highcontrast-option"
                  checked={themeOptions.useHighContrast}
                  onChange={() => handleOptionChange("useHighContrast")}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-rose-500"></span>
                <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
