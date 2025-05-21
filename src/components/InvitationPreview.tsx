"use client";

import React from "react";

interface InvitationPreviewProps {
  title?: string;
  date?: string;
  groomName?: string;
  brideName?: string;
  location?: string;
  message?: string;
  templateId?: number;
}

export default function InvitationPreview({
  title = "민수와 지연의 결혼식에 초대합니다",
  date = "2024-10-10",
  groomName = "김민수",
  brideName = "이지연",
  location = "서울 강남구 테헤란로 123 웨딩홀",
  message = "저희 두 사람이 사랑과 믿음으로 한 가정을 이루게 되었습니다. 부디 오셔서 축복해 주시면 감사하겠습니다.",
  templateId = 1,
}: InvitationPreviewProps) {
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white shadow-lg">
      <div className="border-b bg-gray-50 p-4">
        <h3 className="text-sm font-medium text-gray-700">미리보기</h3>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex h-40 items-center justify-center bg-gray-100">
          <span className="text-gray-500">템플릿 {templateId}</span>
        </div>

        <div className="space-y-4 p-6">
          <h2 className="text-center text-xl font-medium">{title}</h2>

          <div className="space-y-1 text-center">
            <p className="text-sm text-gray-700">{formattedDate}</p>
            <p className="text-sm text-gray-700">{location}</p>
          </div>

          <div className="flex items-center justify-center gap-6 py-4">
            <div className="text-center">
              <p className="font-medium">{groomName}</p>
              <p className="text-xs text-gray-500">신랑</p>
            </div>
            <div className="text-2xl text-gray-300">&amp;</div>
            <div className="text-center">
              <p className="font-medium">{brideName}</p>
              <p className="text-xs text-gray-500">신부</p>
            </div>
          </div>

          <div className="border-t border-b py-4 text-center text-sm leading-5 text-gray-600">
            {message.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
