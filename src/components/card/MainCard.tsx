"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useInvitationStore } from "@/stores/invitation-store";
import React from "react";
import Image from "next/image";

export default function MainCard() {
  const { data, setField } = useInvitationStore();

  const themes = [
    { id: 1, name: "포스터", color: "bg-rose-100" },
    { id: 2, name: "폴라로이드", color: "bg-blue-100" },
    { id: 3, name: "아치형", color: "bg-gray-100" },
    { id: 4, name: "심플", color: "bg-pink-100" },
  ];

  const handleThemeSelect = (id: number) => {
    setField("selectedThemeId", id);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setField("mainImage", imageUrl);
    return false; // prevent upload
  };

  return (
    <CustomizationCard title="메인 설정">
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

        {/* 메인 이미지 선택 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">메인 이미지</p>
          <div className="space-y-4">
            {/* 현재 선택된 이미지 미리보기 */}
            {data.mainImage && (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={data.mainImage}
                  alt="메인 이미지 미리보기"
                  width={64}
                  height={100}
                  className="h-full w-64 object-contain"
                />
              </div>
            )}

            {/* 이미지 업로드 버튼 */}
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
        </div>
      </div>
    </CustomizationCard>
  );
}
