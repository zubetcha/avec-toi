"use client";

import { useState } from "react";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import CustomizationCard from "./CustomizationCard";
import { useInvitationStore } from "../stores/invitation-store";

interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export default function GalleryCard() {
  const { data, setField } = useInvitationStore();

  const handleImageUpload = (file: File) => {
    if (data.galleryImages.length >= 10) {
      message.error("최대 10장까지만 업로드할 수 있습니다.");
      return false;
    }

    // 실제 구현에서는 이미지 업로드 로직이 필요합니다
    const imageUrl = URL.createObjectURL(file);
    const newImage: GalleryImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: imageUrl,
    };

    const newImages = [...data.galleryImages, newImage];
    setField("galleryImages", newImages);
    return false;
  };

  const handleRemoveImage = (id: string) => {
    const updatedImages = data.galleryImages.filter((image) => image.id !== id);
    setField("galleryImages", updatedImages);
  };

  const handleCaptionChange = (id: string, caption: string) => {
    const updatedImages = data.galleryImages.map((image) => {
      if (image.id === id) {
        return { ...image, caption };
      }
      return image;
    });

    setField("galleryImages", updatedImages);
  };

  const handleReorder = (dragIndex: number, dropIndex: number) => {
    const updatedImages = [...data.galleryImages];
    const draggedImage = updatedImages[dragIndex];

    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, draggedImage);

    setField("galleryImages", updatedImages);
  };

  const handleDisplayModeChange = (mode: "그리드" | "슬라이더" | "모자이크") => {
    setField("galleryDisplayMode", mode);
  };

  const uploadProps: UploadProps = {
    beforeUpload: handleImageUpload,
    showUploadList: false,
    accept: "image/*",
    multiple: true,
    disabled: data.galleryImages.length >= 10,
  };

  return (
    <CustomizationCard title="갤러리">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 사진을 업로드하세요.</p>

        {/* 이미지 업로드 버튼 */}
        <div>
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              disabled={data.galleryImages.length >= 10}
              className="h-16 w-full border-dashed"
              type="dashed"
            >
              사진 업로드 (최대 10장)
            </Button>
          </Upload>
          {data.galleryImages.length >= 10 && (
            <p className="mt-1 text-xs text-rose-500">최대 10장까지만 업로드할 수 있습니다.</p>
          )}
        </div>

        {/* 업로드된 이미지 목록 */}
        {data.galleryImages.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              업로드된 사진 ({data.galleryImages.length}/10)
            </p>

            <div className="grid grid-cols-2 gap-3">
              {data.galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200"
                >
                  <img
                    src={image.url}
                    alt={image.caption || `갤러리 이미지 ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />

                  {/* 이미지 캡션 */}
                  <Input
                    value={image.caption || ""}
                    onChange={(e) => handleCaptionChange(image.id, e.target.value)}
                    placeholder="사진 설명 입력"
                    className="rounded-none border-t border-gray-200 text-xs"
                    size="small"
                  />

                  {/* 삭제 버튼 */}
                  <Button
                    onClick={() => handleRemoveImage(image.id)}
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                    size="small"
                    className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 갤러리 표시 옵션 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="mb-2 text-sm font-medium text-gray-700">갤러리 표시 방식</p>
          <div className="flex flex-wrap gap-2">
            {(["그리드", "슬라이더", "모자이크"] as const).map((option) => (
              <Button
                key={option}
                size="small"
                className={`${
                  data.galleryDisplayMode === option
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleDisplayModeChange(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
