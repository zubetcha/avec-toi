"use client";

import { useState } from "react";
import Image from "next/image";
import CustomizationCard from "./CustomizationCard";
import { Input, Typography, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useInvitationStore } from "@/stores/invitation-store";

const { Text } = Typography;
const { TextArea } = Input;

export default function KakaoShareCard() {
  const { data, setField } = useInvitationStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (info: any) => {
    if (info.file.status === "uploading") {
      setIsUploading(true);
      return;
    }

    if (info.file.status === "done") {
      // 실제 구현에서는 파일 업로드 로직이 필요합니다
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setField("kakaoShareThumbnail", imageUrl);
      setIsUploading(false);
    }
  };

  // 이 부분은 서버에 실제로 업로드하지 않고 클라이언트에서 미리보기를 보여주기 위한 임시 처리입니다
  const customRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  return (
    <CustomizationCard title="카카오톡 공유 설정">
      <div className="space-y-4">
        <Text className="text-sm text-gray-600">카카오톡 공유 시 표시될 정보를 설정하세요.</Text>

        <div>
          <Text className="mb-1 block text-sm font-medium text-gray-700">제목</Text>
          <Input
            id="kakao-title"
            value={data.kakaoShareTitle}
            onChange={(e) => setField("kakaoShareTitle", e.target.value)}
            placeholder="예: OO♥OO 결혼식에 초대합니다"
            maxLength={40}
            className="w-full"
          />
          <Text className="mt-1 text-xs text-gray-500">
            {data.kakaoShareTitle.length}/40자 (최대 40자)
          </Text>
        </div>

        <div>
          <Text className="mb-1 block text-sm font-medium text-gray-700">설명</Text>
          <TextArea
            id="kakao-description"
            value={data.kakaoShareDescription}
            onChange={(e) => setField("kakaoShareDescription", e.target.value)}
            placeholder="예: 2023년 5월 20일 토요일 오후 2시, OO웨딩홀"
            maxLength={80}
            rows={3}
            className="w-full"
          />
          <Text className="mt-1 text-xs text-gray-500">
            {data.kakaoShareDescription.length}/80자 (최대 80자)
          </Text>
        </div>

        <div>
          <Text className="mb-1 block text-sm font-medium text-gray-700">썸네일 이미지</Text>

          {/* 현재 썸네일 미리보기 */}
          {data.kakaoShareThumbnail && (
            <div className="mb-3 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={data.kakaoShareThumbnail}
                alt="썸네일 미리보기"
                className="h-32 w-full object-cover"
                width={800}
                height={400}
              />
            </div>
          )}

          {/* 이미지 업로드 버튼 */}
          <Upload
            accept="image/*"
            customRequest={customRequest}
            showUploadList={false}
            onChange={handleUpload}
            disabled={isUploading}
          >
            <Button
              icon={<UploadOutlined />}
              className={`flex h-auto w-full items-center justify-center border-dashed bg-gray-50 py-3 hover:bg-gray-100 ${
                isUploading ? "opacity-50" : ""
              }`}
              disabled={isUploading}
            >
              {isUploading ? "업로드 중..." : "썸네일 이미지 업로드"}
            </Button>
          </Upload>
          <Text className="mt-1 text-xs text-gray-500">
            권장 크기: 800x400 픽셀, 최대 용량: 2MB
          </Text>
        </div>

        {/* 카카오톡 공유 미리보기 */}
        <div>
          <Text className="mb-2 text-sm font-medium text-gray-700">카카오톡 공유 미리보기</Text>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-[#FFEB3B] p-4">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-10 w-10 rounded-full bg-yellow-400"></div>
                <div>
                  <Text className="text-sm font-medium">모바일 청첩장</Text>
                  <Text className="text-xs text-gray-500">친구에게 전달</Text>
                </div>
              </div>

              <div className="mb-3 overflow-hidden rounded-md border border-gray-200">
                {data.kakaoShareThumbnail ? (
                  <Image
                    src={data.kakaoShareThumbnail}
                    alt="카카오톡 썸네일"
                    className="h-32 w-full object-cover"
                    width={800}
                    height={400}
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center bg-gray-100">
                    <Text className="text-sm text-gray-400">썸네일 없음</Text>
                  </div>
                )}
              </div>

              <div>
                <Text className="text-sm font-medium">
                  {data.kakaoShareTitle || "제목이 표시됩니다"}
                </Text>
                <Text className="text-xs text-gray-500">
                  {data.kakaoShareDescription || "설명이 표시됩니다"}
                </Text>
                <Text className="mt-2 text-xs text-blue-500">https://example.com/invite/1234</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
