"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface VideoInfo {
  type: "youtube" | "custom";
  url: string;
  title?: string;
}

interface VideoCardProps {
  video?: VideoInfo;
  onVideoChange: (video: VideoInfo | null) => void;
}

export default function VideoCard({ video, onVideoChange }: VideoCardProps) {
  const [youtubeUrl, setYoutubeUrl] = useState(video?.type === "youtube" ? video.url : "");
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

    onVideoChange({
      type: "youtube",
      url: `https://www.youtube.com/embed/${videoId}`,
      title: "YouTube 영상",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // 실제 구현에서는 파일 업로드 로직이 필요합니다
      setTimeout(() => {
        onVideoChange({
          type: "custom",
          url: URL.createObjectURL(file),
          title: file.name,
        });
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleClearVideo = () => {
    onVideoChange(null);
    setYoutubeUrl("");
  };

  return (
    <CustomizationCard title="동영상">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 동영상을 추가하세요.</p>

        {/* 현재 선택된 동영상 */}
        {video && (
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                {video.title || (video.type === "youtube" ? "YouTube 영상" : "업로드된 동영상")}
              </div>
              <button
                onClick={handleClearVideo}
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-md bg-black">
              {video.type === "youtube" ? (
                <iframe
                  src={video.url}
                  title="YouTube video player"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video src={video.url} controls className="h-full w-full"></video>
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
            <input
              type="url"
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=abcdefg"
              className="flex-1 rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            />
            <button
              onClick={handleYoutubeSubmit}
              className="rounded-md bg-rose-500 px-3 py-2 text-sm font-medium text-white hover:bg-rose-600"
            >
              추가
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            YouTube 영상 주소를 입력하세요. (예: https://www.youtube.com/watch?v=abcdefg)
          </p>
        </div>

        {/* 또는 구분선 */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 flex-shrink text-xs text-gray-500">또는</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* 파일 업로드 */}
        <div>
          <label
            htmlFor="video-upload"
            className={`flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
              isUploading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-rose-500 border-t-transparent"></div>
                <span>동영상 업로드 중...</span>
              </div>
            ) : (
              <span>동영상 파일 업로드 (MP4, MOV, 최대 100MB)</span>
            )}
            <input
              id="video-upload"
              type="file"
              accept="video/mp4,video/quicktime"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">
            실제 구현에서는 동영상 파일 용량 제한 및 압축 처리가 필요합니다.
          </p>
        </div>
      </div>
    </CustomizationCard>
  );
}
