"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface WeddingVenueCardProps {
  venueName: string;
  venueAddress: string;
  onVenueChange: (field: string, value: string) => void;
}

export default function WeddingVenueCard({
  venueName,
  venueAddress,
  onVenueChange,
}: WeddingVenueCardProps) {
  const [showMapPreview, setShowMapPreview] = useState(false);

  return (
    <CustomizationCard title="예식 장소">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">예식이 진행될 장소 정보를 입력하세요.</p>

        <div>
          <label htmlFor="venue-name" className="mb-1 block text-sm font-medium text-gray-700">
            예식장 이름
          </label>
          <input
            type="text"
            id="venue-name"
            value={venueName}
            onChange={(e) => onVenueChange("venueName", e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="예식장 이름을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="venue-address" className="mb-1 block text-sm font-medium text-gray-700">
            예식장 주소
          </label>
          <input
            type="text"
            id="venue-address"
            value={venueAddress}
            onChange={(e) => onVenueChange("venueAddress", e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="예식장 주소를 입력하세요"
          />
        </div>

        {/* 지도 검색 버튼 */}
        <div>
          <button
            type="button"
            onClick={() => setShowMapPreview(!showMapPreview)}
            className="w-full rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            {showMapPreview ? "지도 미리보기 닫기" : "지도에서 위치 확인"}
          </button>
        </div>

        {/* 지도 미리보기 (실제 구현에서는 지도 API 연동 필요) */}
        {showMapPreview && venueAddress && (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <div className="h-48 w-full bg-gray-200 p-4 text-center text-sm text-gray-600">
              <p>지도 미리보기 영역</p>
              <p className="mt-2 font-medium">{venueName}</p>
              <p>{venueAddress}</p>
              <p className="mt-4 text-xs text-gray-500">
                (실제 구현 시 카카오맵 또는 네이버맵 API 연동 필요)
              </p>
            </div>
          </div>
        )}

        {/* 추천 장소 (실제 구현에서는 API 연동 필요) */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">인기 예식장</p>
          <div className="space-y-2">
            {[
              "그랜드 하얏트 서울",
              "신라호텔 다이너스티홀",
              "더 플라자 그랜드볼룸",
              "그랜드 워커힐 서울",
            ].map((venue, index) => (
              <button
                key={index}
                onClick={() => onVenueChange("venueName", venue)}
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-left text-sm hover:bg-gray-100"
              >
                {venue}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
