"use client";

import { useState } from "react";
import { Input, Button, message } from "antd";
import { EditOutlined, CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import CustomizationCard from "./CustomizationCard";
import { useInvitationStore } from "@/stores/invitation-store";

export default function UrlShareCard() {
  const { data, setField } = useInvitationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState(data.customUrl);
  const [errorMessage, setErrorMessage] = useState("");

  const baseUrl = "https://example.com/invite/";
  const invitationId = "12345"; // 실제 구현에서는 동적으로 생성된 ID 사용
  const defaultUrl = `${baseUrl}${invitationId}`;
  const displayUrl = data.customUrl || defaultUrl;

  const handleEditClick = () => {
    setIsEditing(true);
    setUrlInput(data.customUrl || "");
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

    setField("customUrl", urlInput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUrlInput(data.customUrl);
    setErrorMessage("");
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(displayUrl)
      .then(() => {
        message.success("URL이 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
        message.error("URL 복사에 실패했습니다.");
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
              <Button
                onClick={handleEditClick}
                icon={<EditOutlined />}
                type="text"
                size="small"
                className="text-rose-600 hover:bg-rose-50"
              >
                수정
              </Button>
            )}
          </div>

          {isEditing ? (
            <div>
              <Input.Group compact>
                <Input
                  addonBefore={baseUrl}
                  value={urlInput}
                  onChange={handleUrlChange}
                  placeholder="원하는 URL을 입력하세요"
                  status={errorMessage ? "error" : ""}
                />
              </Input.Group>

              {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}

              <div className="mt-3 flex items-center justify-end space-x-2">
                <Button onClick={handleCancel} size="small">
                  취소
                </Button>
                <Button onClick={handleSave} disabled={!!errorMessage} type="primary" size="small">
                  저장
                </Button>
              </div>
            </div>
          ) : (
            <Input.Group compact>
              <Input value={displayUrl} readOnly className="bg-gray-50" />
              <Button onClick={handleCopyClick} icon={<CopyOutlined />}>
                복사
              </Button>
            </Input.Group>
          )}
        </div>

        {/* QR 코드 섹션 */}
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">QR 코드</p>
            <Button
              icon={<DownloadOutlined />}
              type="text"
              size="small"
              className="text-rose-600 hover:bg-rose-50"
            >
              다운로드
            </Button>
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
              <Button
                key={platform}
                type="text"
                className="flex h-auto flex-col items-center bg-gray-50 p-3 hover:bg-gray-100"
                block
              >
                <div className="mb-1 h-8 w-8 rounded-full bg-gray-200"></div>
                <span className="text-xs">{platform}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
