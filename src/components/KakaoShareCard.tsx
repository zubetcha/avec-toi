"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface KakaoShareCardProps {
  title: string;
  description: string;
  thumbnailUrl?: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onThumbnailChange: (url: string) => void;
}

export default function KakaoShareCard({
  title,
  description,
  thumbnailUrl,
  onTitleChange,
  onDescriptionChange,
  onThumbnailChange,
}: KakaoShareCardProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // 실제 구현에서는 파일 업로드 로직이 필요합니다
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        onThumbnailChange(imageUrl);
        setIsUploading(false);
      }, 1000);
    }
  };

  return (
    <CustomizationCard title="카카오톡 공유 설정">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">카카오톡 공유 시 표시될 정보를 설정하세요.</p>

        <div>
          <label htmlFor="kakao-title" className="mb-1 block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="kakao-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="예: OO♥OO 결혼식에 초대합니다"
            maxLength={40}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">{title.length}/40자 (최대 40자)</p>
        </div>

        <div>
          <label
            htmlFor="kakao-description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <textarea
            id="kakao-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="예: 2023년 5월 20일 토요일 오후 2시, OO웨딩홀"
            maxLength={80}
            rows={3}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">{description.length}/80자 (최대 80자)</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">썸네일 이미지</label>

          {/* 현재 썸네일 미리보기 */}
          {thumbnailUrl && (
            <div className="mb-3 overflow-hidden rounded-md border border-gray-200">
              <img src={thumbnailUrl} alt="썸네일 미리보기" className="h-32 w-full object-cover" />
            </div>
          )}

          {/* 이미지 업로드 버튼 */}
          <label
            htmlFor="thumbnail-upload"
            className={`flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
              isUploading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isUploading ? "업로드 중..." : "썸네일 이미지 업로드"}
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">권장 크기: 800x400 픽셀, 최대 용량: 2MB</p>
        </div>

        {/* 카카오톡 공유 미리보기 */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">카카오톡 공유 미리보기</p>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-[#FFEB3B] p-4">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-10 w-10 rounded-full bg-yellow-400"></div>
                <div>
                  <p className="text-sm font-medium">모바일 청첩장</p>
                  <p className="text-xs text-gray-500">친구에게 전달</p>
                </div>
              </div>

              <div className="mb-3 overflow-hidden rounded-md border border-gray-200">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="카카오톡 썸네일"
                    className="h-32 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center bg-gray-100">
                    <p className="text-sm text-gray-400">썸네일 없음</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium">{title || "제목이 표시됩니다"}</p>
                <p className="text-xs text-gray-500">{description || "설명이 표시됩니다"}</p>
                <p className="mt-2 text-xs text-blue-500">https://example.com/invite/1234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
