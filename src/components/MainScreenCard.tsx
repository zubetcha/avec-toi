"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface MainScreenCardProps {
  mainImage?: string;
  onImageChange?: (imageUrl: string) => void;
}

export default function MainScreenCard({ mainImage, onImageChange }: MainScreenCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(mainImage || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 실제 구현에서는 이미지 업로드 로직이 필요합니다
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      if (onImageChange) {
        onImageChange(imageUrl);
      }
    }
  };

  const presetImages = [
    "/images/preset1.jpg",
    "/images/preset2.jpg",
    "/images/preset3.jpg",
    "/images/preset4.jpg",
  ];

  const handlePresetSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    if (onImageChange) {
      onImageChange(imageUrl);
    }
  };

  return (
    <CustomizationCard title="메인 화면">
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">메인 화면에 표시할 이미지를 선택하세요.</p>

          {/* 현재 선택된 이미지 미리보기 */}
          {selectedImage && (
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={selectedImage}
                alt="메인 이미지 미리보기"
                className="h-48 w-full object-cover"
              />
            </div>
          )}

          {/* 이미지 업로드 버튼 */}
          <div className="mb-4">
            <label
              htmlFor="main-image-upload"
              className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span>내 이미지 업로드</span>
              <input
                id="main-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* 프리셋 이미지 선택 */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">또는 프리셋 이미지 선택</p>
            <div className="grid grid-cols-2 gap-2">
              {presetImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(image)}
                  className={`overflow-hidden rounded-md border-2 transition-all ${
                    selectedImage === image
                      ? "border-rose-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`프리셋 이미지 ${index + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
