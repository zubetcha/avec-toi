"use client";

import { useState } from "react";
import { Input, Button, Upload, Divider } from "antd";
import { UploadOutlined, CloseOutlined, VideoCameraOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import CustomizationCard from "./CustomizationCard";
import { useInvitationStore } from "@/stores/invitation-store";

interface VideoInfo {
  type: "youtube" | "custom";
  url: string;
  title?: string;
}

export default function VideoCard() {
  const { data, setField } = useInvitationStore();
  const [youtubeUrl, setYoutubeUrl] = useState(
    data.video?.type === "youtube" ? data.video.url : ""
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl.trim()) return;

    // YouTube 링크에서 ID 추출
    let videoId = "";
    try {
      const url = new URL(youtubeUrl);
      if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      } else if (url.hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v") || "";
      }
    } catch (error) {
      // URL 파싱 실패
      console.error("Invalid URL:", error);
      return;
    }

    if (!videoId) {
      alert("유효한 YouTube URL을 입력해주세요.");
      return;
    }

    const video: VideoInfo = {
      type: "youtube",
      url: `https://www.youtube.com/embed/${videoId}`,
      title: "YouTube 영상",
    };

    setField("video", video);
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);

    // 실제 구현에서는 파일 업로드 로직이 필요합니다
    setTimeout(() => {
      const video: VideoInfo = {
        type: "custom",
        url: URL.createObjectURL(file),
        title: file.name,
      };

      setField("video", video);
      setIsUploading(false);
    }, 1500);

    return false;
  };

  const uploadProps: UploadProps = {
    beforeUpload: handleFileUpload,
    showUploadList: false,
    accept: "video/mp4,video/quicktime",
    disabled: isUploading,
  };

  const handleClearVideo = () => {
    setField("video", null);
    setYoutubeUrl("");
  };

  return (
    <CustomizationCard title="동영상">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 동영상을 추가하세요.</p>

        {/* 현재 선택된 동영상 */}
        {data.video && (
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                {data.video.title ||
                  (data.video.type === "youtube" ? "YouTube 영상" : "업로드된 동영상")}
              </div>
              <Button
                onClick={handleClearVideo}
                icon={<CloseOutlined />}
                type="text"
                size="small"
              />
            </div>

            <div className="aspect-video overflow-hidden rounded-md bg-black">
              {data.video.type === "youtube" ? (
                <iframe
                  src={data.video.url}
                  title="YouTube video player"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video src={data.video.url} controls className="h-full w-full"></video>
              )}
            </div>
          </div>
        )}

        {/* YouTube 링크 입력 */}
        <div>
          <label htmlFor="youtube-url" className="mb-1 block text-sm font-medium text-gray-700">
            YouTube 링크
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=abcdefg"
              prefix={<VideoCameraOutlined />}
              className="flex-1"
            />
            <Button onClick={handleYoutubeSubmit} type="primary">
              추가
            </Button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            YouTube 영상 주소를 입력하세요. (예: https://www.youtube.com/watch?v=abcdefg)
          </p>
        </div>

        {/* 또는 구분선 */}
        <Divider>또는</Divider>

        {/* 파일 업로드 */}
        <div>
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              loading={isUploading}
              className="h-16 w-full border-dashed"
              type="dashed"
              block
            >
              {isUploading ? "동영상 업로드 중..." : "동영상 파일 업로드 (MP4, MOV, 최대 100MB)"}
            </Button>
          </Upload>
          <p className="mt-1 text-xs text-gray-500">
            실제 구현에서는 동영상 파일 용량 제한 및 압축 처리가 필요합니다.
          </p>
        </div>
      </div>
    </CustomizationCard>
  );
}
