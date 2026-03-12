"use client";

import React from "react";
import { useInvitationStore } from "../stores/invitation-store";
import Image from "next/image";
import WeddingCalendar from "./WeddingCalendar";

export default function InvitationPreview() {
  const { data } = useInvitationStore();

  // 신랑, 신부 이름 조합
  const groomFullName = `${data.groomInfo.lastName}${data.groomInfo.firstName}`;
  const brideFullName = `${data.brideInfo.lastName}${data.brideInfo.firstName}`;

  // 제목 생성 (입력된 제목이 있으면 사용, 없으면 기본값)
  const displayTitle =
    data.title ||
    (groomFullName && brideFullName
      ? `${groomFullName}♥${brideFullName} 결혼식에 초대합니다`
      : "결혼식에 초대합니다");

  // 날짜 포맷팅
  const formattedDate = data.weddingDate
    ? new Date(data.weddingDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    : "";

  // 시간 포맷팅
  const formattedTime = data.weddingTime
    ? `${data.weddingTime.split(":")[0]}시 ${data.weddingTime.split(":")[1]}분`
    : "";

  // 장소 표시
  const displayVenue = data.venueHall
    ? `${data.weddingLocation} ${data.venueHall}`
    : data.weddingLocation;

  // 부모님 이름 표시 (고인 처리 포함)
  const getParentName = (name: string, isDeceased: boolean) => {
    if (!name) return "";
    return isDeceased && data.options.showDeceasedWithFlower ? `🌹 ${name}` : name;
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white shadow-[0_4px_16px_0px_rgba(17,17,26,0.03),0_8px_32px_0px_rgba(17,17,26,0.03)]">
      <div
        className="scrollbar-hide flex-1 overflow-auto"
        style={{
          backgroundColor: data.backgroundColor,
          fontFamily: data.theme.selectedFont,
          fontSize:
            data.theme.selectedFontSize === "small"
              ? "14px"
              : data.theme.selectedFontSize === "large"
                ? "18px"
                : "16px",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* 메인 이미지 영역 */}
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          {data.mainImage ? (
            <Image
              src={data.mainImage}
              alt="메인 이미지"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-500">템플릿 {data.selectedThemeId}</span>
          )}
        </div>

        <div className="space-y-4 p-6">
          {/* 제목 */}
          <h2
            className="text-center text-xl font-medium"
            style={{ color: data.theme.selectedColor }}
          >
            {displayTitle}
          </h2>

          {/* 날짜 및 장소 */}
          <div className="space-y-1 text-center">
            {formattedDate && (
              <p className="text-sm text-gray-700">
                {formattedDate} {formattedTime}
              </p>
            )}
            {displayVenue && <p className="text-sm text-gray-700">{displayVenue}</p>}
            {data.weddingAddress && <p className="text-xs text-gray-500">{data.weddingAddress}</p>}
          </div>

          {/* 달력 */}
          {data.weddingDate && (
            <WeddingCalendar weddingDate={data.weddingDate} weddingTime={data.weddingTime} />
          )}

          {/* 신랑신부 정보 */}
          {(groomFullName || brideFullName) && (
            <div className="flex items-center justify-center gap-6 py-4">
              {/* 신부 우선 표시 옵션 처리 */}
              {data.options.showBrideFirst ? (
                <>
                  {brideFullName && (
                    <div className="text-center">
                      <p className="font-medium">{brideFullName}</p>
                      <p className="text-xs text-gray-500">신부</p>
                      {(data.brideInfo.fatherName || data.brideInfo.motherName) && (
                        <div className="mt-1 text-xs text-gray-400">
                          {getParentName(
                            data.brideInfo.fatherName,
                            data.brideInfo.isFatherDeceased
                          )}
                          {data.brideInfo.fatherName && data.brideInfo.motherName && " · "}
                          {getParentName(
                            data.brideInfo.motherName,
                            data.brideInfo.isMotherDeceased
                          )}
                          <span className="ml-1">
                            의 {data.brideInfo.isChild === "son" ? "아들" : "딸"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {groomFullName && brideFullName && (
                    <div className="text-2xl text-gray-300">&</div>
                  )}
                  {groomFullName && (
                    <div className="text-center">
                      <p className="font-medium">{groomFullName}</p>
                      <p className="text-xs text-gray-500">신랑</p>
                      {(data.groomInfo.fatherName || data.groomInfo.motherName) && (
                        <div className="mt-1 text-xs text-gray-400">
                          {getParentName(
                            data.groomInfo.fatherName,
                            data.groomInfo.isFatherDeceased
                          )}
                          {data.groomInfo.fatherName && data.groomInfo.motherName && " · "}
                          {getParentName(
                            data.groomInfo.motherName,
                            data.groomInfo.isMotherDeceased
                          )}
                          <span className="ml-1">
                            의 {data.groomInfo.isChild === "son" ? "아들" : "딸"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {groomFullName && (
                    <div className="text-center">
                      <p className="font-medium">{groomFullName}</p>
                      <p className="text-xs text-gray-500">신랑</p>
                      {(data.groomInfo.fatherName || data.groomInfo.motherName) && (
                        <div className="mt-1 text-xs text-gray-400">
                          {getParentName(
                            data.groomInfo.fatherName,
                            data.groomInfo.isFatherDeceased
                          )}
                          {data.groomInfo.fatherName && data.groomInfo.motherName && " · "}
                          {getParentName(
                            data.groomInfo.motherName,
                            data.groomInfo.isMotherDeceased
                          )}
                          <span className="ml-1">
                            의 {data.groomInfo.isChild === "son" ? "아들" : "딸"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {groomFullName && brideFullName && (
                    <div className="text-2xl text-gray-300">&</div>
                  )}
                  {brideFullName && (
                    <div className="text-center">
                      <p className="font-medium">{brideFullName}</p>
                      <p className="text-xs text-gray-500">신부</p>
                      {(data.brideInfo.fatherName || data.brideInfo.motherName) && (
                        <div className="mt-1 text-xs text-gray-400">
                          {getParentName(
                            data.brideInfo.fatherName,
                            data.brideInfo.isFatherDeceased
                          )}
                          {data.brideInfo.fatherName && data.brideInfo.motherName && " · "}
                          {getParentName(
                            data.brideInfo.motherName,
                            data.brideInfo.isMotherDeceased
                          )}
                          <span className="ml-1">
                            의 {data.brideInfo.isChild === "son" ? "아들" : "딸"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* 메시지 */}
          {data.message && (
            <div className="border-t border-b py-4 text-center text-sm leading-5 text-gray-600">
              {data.message.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}

          {/* 갤러리 미리보기 */}
          {data.galleryImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">갤러리</p>
              <div
                className={`grid gap-1 ${
                  data.galleryDisplayMode === "그리드"
                    ? "grid-cols-3"
                    : data.galleryDisplayMode === "모자이크"
                      ? "grid-cols-2"
                      : "grid-cols-1"
                }`}
              >
                {data.galleryImages.slice(0, 6).map((image, index) => (
                  <div key={image.id} className="aspect-square overflow-hidden rounded bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.caption || `갤러리 이미지 ${index + 1}`}
                      width={120}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {data.galleryImages.length > 6 && (
                <p className="text-center text-xs text-gray-500">
                  +{data.galleryImages.length - 6}개 더
                </p>
              )}
            </div>
          )}

          {/* 비디오 미리보기 */}
          {data.video && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">동영상</p>
              <div className="rounded bg-gray-100 p-4 text-center">
                <p className="text-sm text-gray-600">
                  {data.video.type === "youtube" ? "YouTube" : "커스텀"} 영상
                </p>
                {data.video.title && (
                  <p className="mt-1 text-xs text-gray-500">{data.video.title}</p>
                )}
              </div>
            </div>
          )}

          {/* 교통편 정보 */}
          {data.transportations.some((t) => t.enabled && t.description) && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">오시는 길</p>
              <div className="space-y-1">
                {data.transportations
                  .filter((t) => t.enabled && t.description)
                  .map((transport, index) => (
                    <div key={index} className="text-xs">
                      <span className="font-medium">{transport.type}:</span>
                      <span className="ml-1 text-gray-600">{transport.description}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 연락처 미리보기 */}
          {(data.contacts.groom.name || data.contacts.bride.name) && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">연락처</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {data.contacts.groom.name && (
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p className="font-medium">신랑측</p>
                    <p>{data.contacts.groom.name}</p>
                    {data.contacts.groom.phoneNumber && (
                      <p className="text-gray-500">{data.contacts.groom.phoneNumber}</p>
                    )}
                  </div>
                )}
                {data.contacts.bride.name && (
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p className="font-medium">신부측</p>
                    <p>{data.contacts.bride.name}</p>
                    {data.contacts.bride.phoneNumber && (
                      <p className="text-gray-500">{data.contacts.bride.phoneNumber}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 계좌 정보 */}
          {data.showBankAccounts && data.bankAccounts.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">마음 전하실 곳</p>
              <div className="space-y-1">
                {data.bankAccounts.map((account) => (
                  <div key={account.id} className="rounded bg-gray-50 p-2 text-xs">
                    <p className="font-medium">{account.relationship}</p>
                    <p>
                      {account.bankName} {account.accountNumber}
                    </p>
                    <p className="text-gray-500">{account.accountHolder}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 선택된 음악 */}
          {data.selectedSong && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">배경음악</p>
              <div className="rounded bg-gray-50 p-2 text-xs">
                <p className="font-medium">{data.selectedSong.title}</p>
                <p className="text-gray-500">{data.selectedSong.artist}</p>
                {data.autoPlay && <p className="mt-1 text-xs text-blue-500">자동재생</p>}
              </div>
            </div>
          )}

          {/* 방명록 설정 */}
          {data.guestbookEnabled && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">방명록</p>
              <div className="rounded bg-gray-50 p-2 text-center text-xs">
                <p>방명록이 활성화되어 있습니다</p>
                {data.guestbookRequirePassword && (
                  <p className="mt-1 text-gray-500">비밀번호 필요</p>
                )}
                {data.guestbookModerationEnabled && (
                  <p className="mt-1 text-gray-500">관리자 승인 필요</p>
                )}
              </div>
            </div>
          )}

          {/* 화환 주문 */}
          {data.flowerEnabled && data.selectedFlowerVendors.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">화환 주문</p>
              <div className="rounded bg-gray-50 p-2 text-center text-xs">
                <p>화환 주문이 가능합니다</p>
                <p className="mt-1 text-gray-500">
                  {data.selectedFlowerVendors.length}개 업체 연결
                </p>
              </div>
            </div>
          )}

          {/* 마지막 메시지 */}
          {data.endingMessage && (
            <div className="pt-4 text-center text-sm text-gray-600">
              {data.endingMessage.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              <p className="mt-2 text-xs text-gray-400">효과: {data.endingMessageEffect}</p>
            </div>
          )}

          {/* 커스텀 URL */}
          {data.customUrl && (
            <div className="pt-2 text-center text-xs text-gray-500">URL: {data.customUrl}</div>
          )}
        </div>
      </div>
    </div>
  );
}
