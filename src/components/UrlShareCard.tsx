"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface UrlShareCardProps {
  customUrl?: string;
  onCustomUrlChange: (url: string) => void;
  invitationId: string;
}

export default function UrlShareCard({
  customUrl = "",
  onCustomUrlChange,
  invitationId,
}: UrlShareCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState(customUrl);
  const [errorMessage, setErrorMessage] = useState("");

  const baseUrl = "https://example.com/invite/";
  const defaultUrl = `${baseUrl}${invitationId}`;
  const displayUrl = customUrl || defaultUrl;

  const handleEditClick = () => {
    setIsEditing(true);
    setUrlInput(customUrl || "");
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrlInput(value);

    // URL 형식 유효성 검사
    if (value && !/^[a-zA-Z0-9-_]+$/.test(value)) {
      setErrorMessage("영문, 숫자, 하이픈(-), 언더스코어(_)만 사용 가능합니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSave = () => {
    if (errorMessage) return;

    onCustomUrlChange(urlInput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUrlInput(customUrl);
    setErrorMessage("");
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(displayUrl)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
      });
  };

  return (
    <CustomizationCard title="URL 공유 설정">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장 URL을 설정하고 공유하세요.</p>

        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">청첩장 주소</p>
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
              >
                수정
              </button>
            )}
          </div>

          {isEditing ? (
            <div>
              <div className="flex items-center">
                <span className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 p-2 text-sm text-gray-500">
                  {baseUrl}
                </span>
                <input
                  type="text"
                  value={urlInput}
                  onChange={handleUrlChange}
                  className="flex-1 rounded-r-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  placeholder="원하는 URL을 입력하세요"
                />
              </div>

              {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}

              <div className="mt-3 flex items-center justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={!!errorMessage}
                  className={`rounded-md px-3 py-1 text-xs font-medium text-white ${
                    errorMessage ? "bg-gray-400" : "bg-rose-500 hover:bg-rose-600"
                  }`}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center rounded-md border border-gray-200 bg-gray-50">
              <span className="flex-1 truncate p-2 text-sm">{displayUrl}</span>
              <button
                onClick={handleCopyClick}
                className="rounded-r-md border-l border-gray-200 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                복사
              </button>
            </div>
          )}
        </div>

        {/* QR 코드 섹션 */}
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">QR 코드</p>
            <button className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50">
              다운로드
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* QR 코드 표시 영역 - 실제 구현 시 QR 코드 생성 라이브러리 연동 필요 */}
            <div className="h-40 w-40 bg-gray-100 p-4">
              <div className="h-full w-full border-4 border-gray-300 bg-white"></div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              QR 코드를 스캔하면 청첩장 페이지로 이동합니다.
            </p>
          </div>
        </div>

        {/* 공유 링크 */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">청첩장 공유하기</p>
          <div className="grid grid-cols-4 gap-2">
            {["카카오톡", "페이스북", "인스타그램", "문자"].map((platform) => (
              <button
                key={platform}
                className="flex flex-col items-center rounded-md bg-gray-50 p-3 hover:bg-gray-100"
              >
                <div className="mb-1 h-8 w-8 rounded-full bg-gray-200"></div>
                <span className="text-xs">{platform}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
