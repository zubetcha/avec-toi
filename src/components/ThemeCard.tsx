"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Button, Input, Switch } from "antd";
import { useInvitationStore } from "../stores/invitation-store";

interface ThemeOptions {
  useAnimation: boolean;
  useParallaxEffect: boolean;
  useAutoScroll: boolean;
  useHighContrast: boolean;
}

export default function ThemeCard() {
  const { data, setField, setNested } = useInvitationStore();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

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
    setField("selectedThemeId", id);
  };

  const handleBackgroundColorChange = (color: string) => {
    setField("backgroundColor", color);
  };

  const handleBackgroundPatternChange = (pattern: string) => {
    setField("backgroundPattern", pattern);
  };

  const handleBackgroundEffectChange = (effect: string) => {
    setField("backgroundEffect", effect);
  };

  const handleFontChange = (font: string) => {
    setNested("theme", "selectedFont", font);
  };

  const handleFontSizeChange = (fontSize: string) => {
    setNested("theme", "selectedFontSize", fontSize);
  };

  const handleOptionChange = (option: keyof ThemeOptions) => {
    setNested("theme", option, !data.theme[option]);
  };

  return (
    <CustomizationCard title="테마 설정">
      <div className="space-y-6">
        {/* 테마 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">테마 선택</p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                type={data.selectedThemeId === theme.id ? "primary" : "default"}
                className={`flex h-20 items-center justify-center rounded-lg p-4 ${theme.color}`}
                block
              >
                <span className="font-medium">{theme.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* 배경 색상 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 색상</p>
          <div className="relative">
            <div className="flex flex-wrap gap-2">
              {predefinedColors.map((color) => (
                <Button
                  key={color}
                  onClick={() => handleBackgroundColorChange(color)}
                  className={`h-8 w-8 rounded-full border p-0 ${
                    data.backgroundColor === color
                      ? "border-rose-500 ring-2 ring-rose-300"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color, minWidth: "32px" }}
                />
              ))}
              <Button
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-xs"
                style={{ minWidth: "32px" }}
              >
                +
              </Button>
            </div>

            {isColorPickerOpen && (
              <div className="mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-md">
                <Input
                  type="color"
                  value={data.backgroundColor}
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
              <Button
                key={pattern.id}
                onClick={() => handleBackgroundPatternChange(pattern.id)}
                type={data.backgroundPattern === pattern.id ? "primary" : "default"}
                size="small"
              >
                {pattern.name}
              </Button>
            ))}
          </div>
        </div>

        {/* 배경 이펙트 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 이펙트</p>
          <div className="flex flex-wrap gap-2">
            {backgroundEffects.map((effect) => (
              <Button
                key={effect.id}
                onClick={() => handleBackgroundEffectChange(effect.id)}
                type={data.backgroundEffect === effect.id ? "primary" : "default"}
                size="small"
              >
                {effect.name}
              </Button>
            ))}
          </div>
        </div>

        {/* 글꼴 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">글꼴 선택</p>
          <div className="grid grid-cols-3 gap-2">
            {fonts.map((font) => (
              <Button
                key={font.id}
                onClick={() => handleFontChange(font.id)}
                type={data.theme.selectedFont === font.id ? "primary" : "default"}
                className="flex h-auto flex-col items-center justify-center p-2 text-center"
              >
                <span className="mb-1 block text-xs font-medium">{font.name}</span>
                <span className="text-xs text-gray-500" style={{ fontFamily: font.id }}>
                  가나다
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* 글꼴 크기 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">글꼴 크기</p>
          <div className="flex justify-between gap-2">
            {fontSizes.map((size) => (
              <Button
                key={size.id}
                onClick={() => handleFontSizeChange(size.id)}
                type={data.theme.selectedFontSize === size.id ? "primary" : "default"}
                className="flex-1"
              >
                <span
                  className={`font-medium ${
                    size.id === "small" ? "text-xs" : size.id === "medium" ? "text-sm" : "text-base"
                  }`}
                >
                  {size.name}
                </span>
              </Button>
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
              <Switch
                id="animation-option"
                checked={data.theme.useAnimation}
                onChange={() => handleOptionChange("useAnimation")}
                size="small"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="parallax-option" className="text-sm text-gray-700">
                패럴랙스 스크롤 효과
              </label>
              <Switch
                id="parallax-option"
                checked={data.theme.useParallaxEffect}
                onChange={() => handleOptionChange("useParallaxEffect")}
                size="small"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="autoscroll-option" className="text-sm text-gray-700">
                자동 스크롤 사용
              </label>
              <Switch
                id="autoscroll-option"
                checked={data.theme.useAutoScroll}
                onChange={() => handleOptionChange("useAutoScroll")}
                size="small"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="highcontrast-option" className="text-sm text-gray-700">
                고대비 모드 사용
              </label>
              <Switch
                id="highcontrast-option"
                checked={data.theme.useHighContrast}
                onChange={() => handleOptionChange("useHighContrast")}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
