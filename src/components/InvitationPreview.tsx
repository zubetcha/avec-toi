"use client";

import React from "react";
import { useInvitationStore } from "../stores/invitation-store";
import Image from "next/image";
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

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_0px_rgba(17,17,26,0.03),0_8px_32px_0px_rgba(17,17,26,0.03)]">
      <div className="border-b border-gray-100 bg-white p-4">
        <h3 className="text-sm font-medium text-gray-700">미리보기</h3>
      </div>

      <div
        className="flex-1 overflow-auto"
        style={{
          backgroundColor: data.backgroundColor,
          fontFamily: data.theme.selectedFont,
          fontSize:
            data.theme.selectedFontSize === "small"
              ? "14px"
              : data.theme.selectedFontSize === "large"
                ? "18px"
                : "16px",
        }}
      >
        {/* 메인 이미지 영역 */}
        <div className="flex h-40 items-center justify-center bg-gray-100">
          {data.mainImage ? (
            <Image src={data.mainImage} alt="메인 이미지" className="h-full w-full object-cover" />
          ) : (
            <span className="text-gray-500">템플릿 {data.selectedThemeId}</span>
          )}
        </div>

        <div className="space-y-4 p-6">
          {/* 제목 */}
          <h2 className="text-center text-xl font-medium">{displayTitle}</h2>

          {/* 날짜 및 장소 */}
          <div className="space-y-1 text-center">
            {formattedDate && (
              <p className="text-sm text-gray-700">
                {formattedDate} {formattedTime}
              </p>
            )}
            {displayVenue && <p className="text-sm text-gray-700">{displayVenue}</p>}
          </div>

          {/* 신랑신부 정보 */}
          {(groomFullName || brideFullName) && (
            <div className="flex items-center justify-center gap-6 py-4">
              {groomFullName && (
                <div className="text-center">
                  <p className="font-medium">{groomFullName}</p>
                  <p className="text-xs text-gray-500">신랑</p>
                </div>
              )}

              {groomFullName && brideFullName && <div className="text-2xl text-gray-300">&</div>}

              {brideFullName && (
                <div className="text-center">
                  <p className="font-medium">{brideFullName}</p>
                  <p className="text-xs text-gray-500">신부</p>
                </div>
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
              <div className="grid grid-cols-3 gap-1">
                {data.galleryImages.slice(0, 6).map((image, index) => (
                  <div key={image.id} className="aspect-square overflow-hidden rounded bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.caption || `갤러리 이미지 ${index + 1}`}
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

          {/* 연락처 미리보기 */}
          {(data.contacts.groom.name || data.contacts.bride.name) && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">연락처</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {data.contacts.groom.name && (
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p className="font-medium">신랑측</p>
                    <p>{data.contacts.groom.name}</p>
                  </div>
                )}
                {data.contacts.bride.name && (
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p className="font-medium">신부측</p>
                    <p>{data.contacts.bride.name}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 마지막 메시지 */}
          {data.endingMessage && (
            <div className="pt-4 text-center text-sm text-gray-600">
              {data.endingMessage.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
