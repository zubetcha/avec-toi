"use client";

import React from "react";
import { useInvitationStore } from "../stores/invitation-store";
import Image from "next/image";
import WeddingCalendar from "./WeddingCalendar";

const SECTION_HEIGHT = 798;

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

function Section({ children, className = "", title }: SectionProps) {
  return (
    <div
      className={`flex items-center justify-center px-8 py-12 ${className}`}
      style={{ height: `${SECTION_HEIGHT}px`, minHeight: `${SECTION_HEIGHT}px` }}
    >
      <div className="flex w-full max-w-sm flex-col items-center justify-center text-center">
        {title && (
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            {title}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px w-12 bg-gray-200" />
    </div>
  );
}

export default function InvitationPreview() {
  const { data } = useInvitationStore();

  const groomFullName = `${data.groomInfo.lastName}${data.groomInfo.firstName}`;
  const brideFullName = `${data.brideInfo.lastName}${data.brideInfo.firstName}`;

  const displayTitle =
    data.title ||
    (groomFullName && brideFullName
      ? `${groomFullName}♥${brideFullName} 결혼식에 초대합니다`
      : "결혼식에 초대합니다");

  const weddingDateObj = data.weddingDate ? new Date(data.weddingDate) : null;

  const formattedDate = weddingDateObj
    ? weddingDateObj.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    : "";

  const formattedTime = data.weddingTime
    ? (() => {
        const [hour, minute] = data.weddingTime.split(":");
        const hourNum = parseInt(hour);
        const period = hourNum < 12 ? "오전" : "오후";
        const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;
        return `${period} ${displayHour}시 ${minute}분`;
      })()
    : "";

  const displayVenue = data.venueHall
    ? `${data.weddingLocation} ${data.venueHall}`
    : data.weddingLocation;

  const getParentName = (name: string, isDeceased: boolean) => {
    if (!name) return "";
    return isDeceased && data.options.showDeceasedWithFlower ? `故 ${name}` : name;
  };

  const dDay = weddingDateObj
    ? Math.ceil((weddingDateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white shadow-[0_4px_16px_0px_rgba(17,17,26,0.05),0_8px_32px_0px_rgba(17,17,26,0.05)]">
      <div
        className="flex-1 overflow-auto scrollbar-hide"
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

        {/* 메인 이미지 영역 - 신랑♥신부 오버레이 */}
        <div
          className="relative flex w-full items-end justify-center"
          style={{ height: `${SECTION_HEIGHT}px`, minHeight: `${SECTION_HEIGHT}px` }}
        >
          {data.mainImage ? (
            <Image src={data.mainImage} alt="메인 이미지" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-rose-50 to-rose-100">
              <span className="text-gray-400">메인 이미지</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-12 z-10 text-center text-white">
            <p className="mb-2 text-sm font-light tracking-widest opacity-90">WEDDING INVITATION</p>
            <h1 className="text-2xl font-light tracking-wider">
              {data.options.showBrideFirst ? (
                <>
                  {brideFullName || "신부"} <span className="mx-2 text-rose-300">♥</span>{" "}
                  {groomFullName || "신랑"}
                </>
              ) : (
                <>
                  {groomFullName || "신랑"} <span className="mx-2 text-rose-300">♥</span>{" "}
                  {brideFullName || "신부"}
                </>
              )}
            </h1>
            <p className="mt-4 text-sm font-light opacity-80">{formattedDate}</p>
          </div>
        </div>

        {/* 인사말 영역 */}
        <Section title="INVITATION">
          <h2 className="mb-8 text-lg font-medium text-gray-800">{displayTitle}</h2>
          <div className="text-sm leading-7 text-gray-600">
            {data.message ? (
              data.message.split("\n").map((line, index) => <p key={index}>{line}</p>)
            ) : (
              <p className="text-gray-400">인사말을 입력해주세요</p>
            )}
          </div>
          <Divider />
          <div className="mt-8 flex items-center justify-center gap-8">
            {data.options.showBrideFirst ? (
              <>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {getParentName(data.brideInfo.fatherName, data.brideInfo.isFatherDeceased) ||
                      "아버지"}{" "}
                    ·{" "}
                    {getParentName(data.brideInfo.motherName, data.brideInfo.isMotherDeceased) ||
                      "어머니"}
                    <span className="ml-1 text-gray-400">
                      의 {data.brideInfo.isChild === "son" ? "아들" : "딸"}
                    </span>
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-800">
                    {brideFullName || "신부"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {getParentName(data.groomInfo.fatherName, data.groomInfo.isFatherDeceased) ||
                      "아버지"}{" "}
                    ·{" "}
                    {getParentName(data.groomInfo.motherName, data.groomInfo.isMotherDeceased) ||
                      "어머니"}
                    <span className="ml-1 text-gray-400">
                      의 {data.groomInfo.isChild === "son" ? "아들" : "딸"}
                    </span>
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-800">
                    {groomFullName || "신랑"}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {getParentName(data.groomInfo.fatherName, data.groomInfo.isFatherDeceased) ||
                      "아버지"}{" "}
                    ·{" "}
                    {getParentName(data.groomInfo.motherName, data.groomInfo.isMotherDeceased) ||
                      "어머니"}
                    <span className="ml-1 text-gray-400">
                      의 {data.groomInfo.isChild === "son" ? "아들" : "딸"}
                    </span>
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-800">
                    {groomFullName || "신랑"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {getParentName(data.brideInfo.fatherName, data.brideInfo.isFatherDeceased) ||
                      "아버지"}{" "}
                    ·{" "}
                    {getParentName(data.brideInfo.motherName, data.brideInfo.isMotherDeceased) ||
                      "어머니"}
                    <span className="ml-1 text-gray-400">
                      의 {data.brideInfo.isChild === "son" ? "아들" : "딸"}
                    </span>
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-800">
                    {brideFullName || "신부"}
                  </p>
                </div>
              </>
            )}
          </div>
        </Section>

        {/* 일시 영역 (캘린더 포함) */}
        <Section title="CALENDAR">
          <div className="mb-6">
            <WeddingCalendar weddingDate={data.weddingDate} weddingTime={data.weddingTime} />
          </div>
          <p className="text-sm text-gray-600">{formattedDate}</p>
          <p className="mt-1 text-sm text-gray-600">{formattedTime}</p>
          {dDay !== null && (
            <p className="mt-4 text-xs text-rose-400">
              {dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day" : `D+${Math.abs(dDay)}`}
            </p>
          )}
        </Section>

        {/* 장소 영역 */}
        <Section title="LOCATION">
          <div className="w-full space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {data.weddingLocation || "예식장명"}
              </h3>
              {data.venueHall && <p className="mt-1 text-sm text-gray-500">{data.venueHall}</p>}
            </div>
            <p className="text-sm text-gray-600">{data.weddingAddress || "주소를 입력해주세요"}</p>
            {data.venuePhone && <p className="text-xs text-gray-400">Tel. {data.venuePhone}</p>}
            <div className="mt-4 flex h-40 w-full items-center justify-center rounded-lg bg-gray-100">
              <span className="text-sm text-gray-400">지도 영역</span>
            </div>
            <div className="flex justify-center gap-2">
              <button className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-600 transition hover:bg-gray-50">
                네이버 지도
              </button>
              <button className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-600 transition hover:bg-gray-50">
                카카오 지도
              </button>
              <button className="rounded-full border border-gray-200 px-4 py-2 text-xs text-gray-600 transition hover:bg-gray-50">
                주소 복사
              </button>
            </div>
          </div>
        </Section>

        {/* 오시는 길 영역 */}
        <Section title="TRANSPORTATION">
          <div className="w-full space-y-4">
            {data.transportations
              .filter((t) => t.enabled)
              .map((transport, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-4 text-left">
                  <p className="mb-2 text-xs font-medium text-gray-500">{transport.type}</p>
                  <p className="text-sm text-gray-700">
                    {transport.description || "교통편 정보를 입력해주세요"}
                  </p>
                </div>
              ))}
          </div>
        </Section>

        {/* 갤러리 영역 */}
        <Section title="GALLERY">
          <div className="w-full">
            {data.galleryImages.length > 0 ? (
              <>
                <div
                  className={`grid gap-2 ${
                    data.galleryDisplayMode === "그리드"
                      ? "grid-cols-3"
                      : data.galleryDisplayMode === "모자이크"
                        ? "grid-cols-2"
                        : "grid-cols-1"
                  }`}
                >
                  {data.galleryImages.slice(0, 6).map((image, index) => (
                    <div
                      key={image.id}
                      className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={image.url}
                        alt={image.caption || `갤러리 이미지 ${index + 1}`}
                        width={150}
                        height={150}
                        className="h-full w-full object-cover transition hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                {data.galleryImages.length > 6 && (
                  <p className="mt-4 text-center text-xs text-gray-400">
                    +{data.galleryImages.length - 6}장 더 보기
                  </p>
                )}
              </>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-sm text-gray-400">갤러리 이미지를 추가해주세요</p>
              </div>
            )}
          </div>
        </Section>

        {/* 동영상 영역 */}
        <Section title="VIDEO">
          <div className="w-full">
            {data.video ? (
              <div className="space-y-3">
                <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80">
                      <span className="text-xl">▶</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {data.video.type === "youtube" ? "YouTube" : "영상"}
                    </p>
                  </div>
                </div>
                {data.video.title && (
                  <p className="text-center text-sm text-gray-600">{data.video.title}</p>
                )}
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-sm text-gray-400">동영상을 추가해주세요</p>
              </div>
            )}
          </div>
        </Section>

        {/* 연락처 영역 */}
        <Section title="CONTACT">
          <div className="w-full space-y-6">
            {/* 신랑측 */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-400">신랑측</p>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {data.contacts.groom.name || "신랑"}
                    <span className="ml-2 text-xs text-gray-400">신랑</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-xs">📞</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                    <span className="text-xs">💬</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {data.contacts.groomFather.name || "아버지"}
                    <span className="ml-2 text-xs text-gray-400">아버지</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-xs">📞</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                    <span className="text-xs">💬</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {data.contacts.groomMother.name || "어머니"}
                    <span className="ml-2 text-xs text-gray-400">어머니</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-xs">📞</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                    <span className="text-xs">💬</span>
                  </button>
                </div>
              </div>
            </div>
            {/* 신부측 */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-400">신부측</p>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {data.contacts.bride.name || "신부"}
                    <span className="ml-2 text-xs text-gray-400">신부</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-xs">📞</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                    <span className="text-xs">💬</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {data.contacts.brideFather.name || "아버지"}
                    <span className="ml-2 text-xs text-gray-400">아버지</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-xs">📞</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                    <span className="text-xs">💬</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {data.contacts.brideMother.name || "어머니"}
                    <span className="ml-2 text-xs text-gray-400">어머니</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-xs">📞</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                    <span className="text-xs">💬</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 계좌 정보 영역 */}
        <Section title="GIFT">
          <div className="w-full space-y-4">
            <p className="text-sm text-gray-600">축하의 마음을 전해주세요</p>
            {data.showBankAccounts && data.bankAccounts.length > 0 ? (
              <div className="space-y-3">
                {/* 신랑측 계좌 */}
                <div className="overflow-hidden rounded-lg border border-gray-100">
                  <div className="bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-gray-700">신랑측 계좌</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {data.bankAccounts
                      .filter((acc) => acc.relationship.includes("신랑"))
                      .map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-4">
                          <div className="text-left">
                            <p className="text-xs text-gray-400">{account.relationship}</p>
                            <p className="mt-1 text-sm text-gray-700">
                              {account.bankName} {account.accountNumber}
                            </p>
                            <p className="text-xs text-gray-500">{account.accountHolder}</p>
                          </div>
                          <button className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-200">
                            복사
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                {/* 신부측 계좌 */}
                <div className="overflow-hidden rounded-lg border border-gray-100">
                  <div className="bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-gray-700">신부측 계좌</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {data.bankAccounts
                      .filter((acc) => acc.relationship.includes("신부"))
                      .map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-4">
                          <div className="text-left">
                            <p className="text-xs text-gray-400">{account.relationship}</p>
                            <p className="mt-1 text-sm text-gray-700">
                              {account.bankName} {account.accountNumber}
                            </p>
                            <p className="text-xs text-gray-500">{account.accountHolder}</p>
                          </div>
                          <button className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-200">
                            복사
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-sm text-gray-400">계좌 정보를 추가해주세요</p>
              </div>
            )}
          </div>
        </Section>

        {/* 방명록 영역 */}
        <Section title="GUESTBOOK">
          <div className="w-full space-y-4">
            {data.guestbookEnabled ? (
              <>
                <p className="text-sm text-gray-600">축하 메시지를 남겨주세요</p>
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <input
                    type="text"
                    placeholder="이름"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-300"
                    disabled
                  />
                  <textarea
                    placeholder="축하 메시지를 입력해주세요"
                    className="h-24 w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-300"
                    disabled
                  />
                  {data.guestbookRequirePassword && (
                    <input
                      type="password"
                      placeholder="비밀번호 (삭제 시 필요)"
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-300"
                      disabled
                    />
                  )}
                  <button className="w-full rounded-lg bg-gray-800 py-2.5 text-sm text-white transition hover:bg-gray-700">
                    축하 메시지 남기기
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">홍길동</p>
                      <p className="text-xs text-gray-400">2026.05.20</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      결혼 축하드립니다! 행복하게 사세요 🎉
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-sm text-gray-400">방명록이 비활성화되어 있습니다</p>
              </div>
            )}
          </div>
        </Section>

        {/* 화환 주문 영역 */}
        {data.flowerEnabled && (
          <Section title="FLOWER">
            <div className="w-full space-y-4">
              <p className="text-sm text-gray-600">축하의 마음을 화환으로 전해보세요</p>
              {data.selectedFlowerVendors.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {data.selectedFlowerVendors.map((vendor, index) => (
                    <button
                      key={index}
                      className="rounded-lg border border-gray-200 p-4 text-center transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      <span className="text-2xl">💐</span>
                      <p className="mt-2 text-sm text-gray-700">{vendor}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-400">화환 업체를 선택해주세요</p>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* 배경음악 영역 */}
        {data.selectedSong && (
          <Section title="MUSIC">
            <div className="w-full">
              <div className="flex items-center justify-center gap-4 rounded-lg bg-gray-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-xl">🎵</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">{data.selectedSong.title}</p>
                  <p className="text-xs text-gray-500">{data.selectedSong.artist}</p>
                  {data.autoPlay && <p className="mt-1 text-xs text-rose-400">자동 재생</p>}
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* 마지막 메시지 영역 */}
        <Section>
          <div className="space-y-6">
            <div className="text-sm leading-7 text-gray-600">
              {data.endingMessage ? (
                data.endingMessage.split("\n").map((line, index) => <p key={index}>{line}</p>)
              ) : (
                <p className="text-gray-400">마지막 메시지를 입력해주세요</p>
              )}
            </div>
            <Divider />
            <p className="text-sm text-gray-500">
              {data.options.showBrideFirst ? (
                <>
                  {brideFullName || "신부"} <span className="mx-1 text-rose-300">♥</span>{" "}
                  {groomFullName || "신랑"}
                </>
              ) : (
                <>
                  {groomFullName || "신랑"} <span className="mx-1 text-rose-300">♥</span>{" "}
                  {brideFullName || "신부"}
                </>
              )}
            </p>
          </div>
        </Section>

        {/* 공유하기 영역 */}
        <Section title="SHARE">
          <div className="w-full space-y-4">
            <p className="text-sm text-gray-600">소중한 분들에게 청첩장을 공유해보세요</p>
            <div className="flex justify-center gap-3">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 transition hover:bg-yellow-500">
                <span className="text-xl">💬</span>
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300">
                <span className="text-xl">🔗</span>
              </button>
            </div>
            {data.customUrl && <p className="text-xs text-gray-400">{data.customUrl}</p>}
          </div>
        </Section>

        {/* 푸터 */}
        <div className="py-8 text-center">
          <p className="text-xs text-gray-300">Made with Avec Toi</p>
        </div>
      </div>
    </div>
  );
}
