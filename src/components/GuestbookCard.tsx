"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface GuestbookCardProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  requirePassword: boolean;
  onPasswordRequireToggle: (required: boolean) => void;
  password: string;
  onPasswordChange: (password: string) => void;
  moderationEnabled: boolean;
  onModerationToggle: (enabled: boolean) => void;
}

export default function GuestbookCard({
  enabled = true,
  onToggle,
  requirePassword = false,
  onPasswordRequireToggle,
  password = "",
  onPasswordChange,
  moderationEnabled = true,
  onModerationToggle,
}: GuestbookCardProps) {
  return (
    <CustomizationCard title="방명록" defaultEnabled={enabled}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          청첩장을 방문한 하객들이 축하 메시지를 남길 수 있는 방명록 기능을 설정하세요.
        </p>

        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="space-y-4">
            {/* 비밀번호 요구 설정 */}
            <div className="flex items-center justify-between">
              <label htmlFor="require-password" className="text-sm font-medium text-gray-700">
                방명록 작성 시 비밀번호 요구
              </label>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  id="require-password"
                  checked={requirePassword}
                  onChange={() => onPasswordRequireToggle(!requirePassword)}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-indigo-200"></span>
                <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
              </div>
            </div>

            {/* 비밀번호 설정 */}
            {requirePassword && (
              <div>
                <label
                  htmlFor="guestbook-password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  방명록 비밀번호
                </label>
                <input
                  type="password"
                  id="guestbook-password"
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  placeholder="비밀번호를 입력하세요"
                />
                <p className="mt-1 text-xs text-gray-500">
                  이 비밀번호는 방명록 작성 및 수정, 삭제 시 필요합니다.
                </p>
              </div>
            )}

            {/* 방명록 검토 설정 */}
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="moderation-enabled" className="text-sm font-medium text-gray-700">
                  댓글 검토 후 게시
                </label>
                <p className="text-xs text-gray-500">방명록 내용을 검토 후 표시할 수 있습니다.</p>
              </div>
              <div className="relative inline-block h-5 w-9">
                <input
                  type="checkbox"
                  id="moderation-enabled"
                  checked={moderationEnabled}
                  onChange={() => onModerationToggle(!moderationEnabled)}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-indigo-200"></span>
                <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
              </div>
            </div>
          </div>
        </div>

        {/* 방명록 미리보기 */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">방명록 미리보기</p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            {/* 방명록 폼 미리보기 */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <div className="mb-3">
                <label
                  htmlFor="preview-name"
                  className="mb-1 block text-xs font-medium text-gray-700"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="preview-name"
                  disabled
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-1.5 text-sm"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="preview-message"
                  className="mb-1 block text-xs font-medium text-gray-700"
                >
                  축하 메시지
                </label>
                <textarea
                  id="preview-message"
                  disabled
                  className="h-20 w-full rounded-md border border-gray-200 bg-gray-50 p-1.5 text-sm"
                  placeholder="축하 메시지를 입력하세요"
                />
              </div>

              {requirePassword && (
                <div className="mb-3">
                  <label
                    htmlFor="preview-password"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="preview-password"
                    disabled
                    className="w-full rounded-md border border-gray-200 bg-gray-50 p-1.5 text-sm"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              )}

              <button
                type="button"
                disabled
                className="w-full rounded-md bg-rose-100 p-2 text-sm font-medium text-rose-700"
              >
                메시지 남기기
              </button>
            </div>

            {/* 샘플 방명록 목록 */}
            <div className="space-y-2">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">김철수</p>
                    <p className="text-xs text-gray-500">2023.05.15 12:34</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">결혼 축하해요! 앞으로도 행복하게 잘 살아요~</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">이영희</p>
                    <p className="text-xs text-gray-500">2023.05.14 15:20</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  두 분의 결혼을 진심으로 축하드립니다! 오래오래 행복하게 사세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
