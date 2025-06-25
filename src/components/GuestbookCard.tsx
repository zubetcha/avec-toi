"use client";

import { Input, Switch, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import CustomizationCard from "./CustomizationCard";
import { useInvitationStore } from "../stores/invitation-store";

const { TextArea } = Input;

export default function GuestbookCard() {
  const { data, setField } = useInvitationStore();

  return (
    <CustomizationCard title="방명록" defaultEnabled={data.guestbookEnabled}>
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
              <Switch
                checked={data.guestbookRequirePassword}
                onChange={(checked) => setField("guestbookRequirePassword", checked)}
                size="small"
              />
            </div>

            {/* 비밀번호 설정 */}
            {data.guestbookRequirePassword && (
              <div>
                <label
                  htmlFor="guestbook-password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  방명록 비밀번호
                </label>
                <Input.Password
                  id="guestbook-password"
                  value={data.guestbookPassword}
                  onChange={(e) => setField("guestbookPassword", e.target.value)}
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
              <Switch
                checked={data.guestbookModerationEnabled}
                onChange={(checked) => setField("guestbookModerationEnabled", checked)}
                size="small"
              />
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
                <Input id="preview-name" disabled placeholder="이름을 입력하세요" size="small" />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="preview-message"
                  className="mb-1 block text-xs font-medium text-gray-700"
                >
                  축하 메시지
                </label>
                <TextArea
                  id="preview-message"
                  disabled
                  rows={3}
                  placeholder="축하 메시지를 입력하세요"
                  size="small"
                />
              </div>

              {data.guestbookRequirePassword && (
                <div className="mb-3">
                  <label
                    htmlFor="preview-password"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    비밀번호
                  </label>
                  <Input.Password
                    id="preview-password"
                    disabled
                    placeholder="비밀번호를 입력하세요"
                    size="small"
                  />
                </div>
              )}

              <Button
                type="primary"
                disabled
                icon={<SendOutlined />}
                block
                size="small"
                className="border-rose-100 bg-rose-100 text-rose-700"
              >
                메시지 남기기
              </Button>
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
