"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Button, ColorPicker, Select } from "antd";
import { useInvitationStore } from "../stores/invitation-store";
import React from "react";

export default function ThemeCard() {
  const { data, setField, setNested } = useInvitationStore();

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
    { id: "Pretendard", name: "프리텐다드", sample: "가나다라마바사 ABC" },
  ];

  const predefinedColors = [
    "#FFFFFF", // 흰색
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

  // 컴포넌트가 마운트될 때 기본 배경색 설정
  React.useEffect(() => {
    if (!data.backgroundColor) {
      handleBackgroundColorChange("#FFFFFF");
    }
  }, []);

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

  return (
    <CustomizationCard title="테마 설정">
      <div className="space-y-6">
        {/* 테마 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">테마 선택</p>
          <Select
            value={data.selectedThemeId}
            onChange={handleThemeSelect}
            className="w-64"
            options={themes.map((theme) => ({
              value: theme.id,
              label: theme.name,
            }))}
          />
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
              <ColorPicker
                value={data.backgroundColor}
                onChange={(color) => handleBackgroundColorChange(color.toHexString())}
                className="!h-8 !w-8"
                presets={[
                  {
                    label: "추천 색상",
                    colors: predefinedColors,
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* 배경 패턴 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 패턴</p>
          <Select
            value={data.backgroundPattern}
            onChange={handleBackgroundPatternChange}
            className="w-64"
            options={backgroundPatterns.map((pattern) => ({
              value: pattern.id,
              label: pattern.name,
            }))}
          />
        </div>

        {/* 배경 이펙트 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">배경 이펙트</p>
          <Select
            value={data.backgroundEffect}
            onChange={handleBackgroundEffectChange}
            className="w-64"
            options={backgroundEffects.map((effect) => ({
              value: effect.id,
              label: effect.name,
            }))}
          />
        </div>

        {/* 글꼴 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">글꼴 선택</p>
          <Select
            value={data.theme.selectedFont}
            onChange={handleFontChange}
            className="w-64"
            options={fonts.map((font) => ({
              value: font.id,
              label: (
                <span className={`font-${font.id}`}>
                  {font.name} - {font.sample}
                </span>
              ),
            }))}
          />
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
      </div>
    </CustomizationCard>
  );
}
