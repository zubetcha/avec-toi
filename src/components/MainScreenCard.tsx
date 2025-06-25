"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useInvitationStore } from "../stores/invitation-store";

export default function MainScreenCard() {
  const { data, setField } = useInvitationStore();

  const handleImageUpload = (file: File) => {
    // 실제 구현에서는 이미지 업로드 로직이 필요합니다
    const imageUrl = URL.createObjectURL(file);
    setField("mainImage", imageUrl);
    return false; // prevent upload
  };

  const presetImages = [
    "/images/preset1.jpg",
    "/images/preset2.jpg",
    "/images/preset3.jpg",
    "/images/preset4.jpg",
  ];

  const handlePresetSelect = (imageUrl: string) => {
    setField("mainImage", imageUrl);
  };

  return (
    <CustomizationCard title="메인 화면">
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-600">메인 화면에 표시할 이미지를 선택하세요.</p>

          {/* 현재 선택된 이미지 미리보기 */}
          {data.mainImage && (
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={data.mainImage}
                alt="메인 이미지 미리보기"
                className="h-48 w-full object-cover"
              />
            </div>
          )}

          {/* 이미지 업로드 버튼 */}
          <div className="mb-4">
            <Upload
              beforeUpload={handleImageUpload}
              accept="image/*"
              showUploadList={false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} className="w-full" type="dashed" size="large">
                내 이미지 업로드
              </Button>
            </Upload>
          </div>

          {/* 프리셋 이미지 선택 */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">또는 프리셋 이미지 선택</p>
            <div className="grid grid-cols-2 gap-2">
              {presetImages.map((image, index) => (
                <Button
                  key={index}
                  onClick={() => handlePresetSelect(image)}
                  type={data.mainImage === image ? "primary" : "default"}
                  className="h-20 overflow-hidden p-0"
                  style={{
                    border:
                      data.mainImage === image ? "2px solid #f43f5e" : "2px solid transparent",
                  }}
                >
                  <img
                    src={image}
                    alt={`프리셋 이미지 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
