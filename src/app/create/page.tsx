"use client";

import Link from "next/link";
import { useState } from "react";
import InvitationPreview from "@/components/InvitationPreview";
import CustomizationCard from "@/components/CustomizationCard";
import ThemeCard from "@/components/ThemeCard";
import BasicInfoCard from "@/components/BasicInfoCard";
import MainScreenCard from "@/components/MainScreenCard";
import GreetingCard from "@/components/GreetingCard";
import WeddingDateCard from "@/components/WeddingDateCard";
import WeddingVenueCard from "@/components/WeddingVenueCard";
import TransportationCard from "@/components/TransportationCard";
import GalleryCard from "@/components/GalleryCard";
import EndingCard from "@/components/EndingCard";
import ContactCard from "@/components/ContactCard";
import BankAccountCard from "@/components/BankAccountCard";
import BackgroundMusicCard from "@/components/BackgroundMusicCard";
import GuestbookCard from "@/components/GuestbookCard";
import VideoCard from "@/components/VideoCard";
import FlowerCard from "@/components/FlowerCard";
import KakaoShareCard from "@/components/KakaoShareCard";
import UrlShareCard from "@/components/UrlShareCard";

// 필요한 인터페이스 정의
interface TransportInfo {
  type: string;
  description: string;
  enabled: boolean;
}

interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

interface ContactInfo {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  showCall: boolean;
  showSms: boolean;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  relationship: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface VideoInfo {
  type: "youtube" | "custom";
  url: string;
  title?: string;
}

// 전체 폼 데이터 타입 정의
interface FormData {
  title: string;
  date: string;
  time: string;
  groomName: string;
  brideName: string;
  venueName: string;
  venueAddress: string;
  message: string;
  endingMessage: string;
  templateId: number;
  mainImage: string;
  galleryImages: GalleryImage[];
  transportations: TransportInfo[];
  contacts: ContactInfo[];
  bankAccounts: BankAccount[];
  selectedSong: Song | null;
  autoPlay: boolean;
  guestbookEnabled: boolean;
  guestbookRequirePassword: boolean;
  guestbookPassword: string;
  guestbookModerationEnabled: boolean;
  video: VideoInfo | null;
  flowerEnabled: boolean;
  selectedFlowerVendors: string[];
  kakaoShareTitle: string;
  kakaoShareDescription: string;
  kakaoShareThumbnail: string;
  customUrl: string;
}

export default function CreatePage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: "",
    time: "12:00",
    groomName: "",
    brideName: "",
    venueName: "",
    venueAddress: "",
    message: "",
    endingMessage: "",
    templateId: 1,
    mainImage: "",
    galleryImages: [],
    transportations: [],
    contacts: [],
    bankAccounts: [],
    selectedSong: null,
    autoPlay: true,
    guestbookEnabled: true,
    guestbookRequirePassword: false,
    guestbookPassword: "",
    guestbookModerationEnabled: true,
    video: null,
    flowerEnabled: true,
    selectedFlowerVendors: [],
    kakaoShareTitle: "모바일 청첩장에 초대합니다",
    kakaoShareDescription: "소중한 분들을 초대합니다. 함께해 주신다면 더없는 기쁨이겠습니다.",
    kakaoShareThumbnail: "",
    customUrl: "",
  });

  const handleInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (id: number) => {
    setFormData((prev) => ({ ...prev, templateId: id }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 font-[family-name:var(--font-geist-sans)]">
      {/* 헤더 영역 - 상단에 고정 */}
      <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-8 shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold">청첩장 만들기</h1>
          <div className="flex gap-4">
            <Link href="/mypage" className="text-sm text-gray-600 hover:text-black">
              내 청첩장
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-black">
              홈으로
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-7xl justify-between gap-8 p-8">
        {/* 왼쪽 커스터마이징 영역 */}
        <div className="w-full space-y-6 overflow-y-auto">
          <ThemeCard
            onThemeChange={(id) => handleTemplateSelect(id)}
            currentThemeId={formData.templateId}
          />

          <BasicInfoCard
            title={formData.title}
            groomName={formData.groomName}
            brideName={formData.brideName}
            onInfoChange={handleInfoChange}
          />

          <MainScreenCard
            mainImage={formData.mainImage}
            onImageChange={(url) => handleInfoChange("mainImage", url)}
          />

          <GreetingCard
            message={formData.message}
            onMessageChange={(message) => handleInfoChange("message", message)}
          />

          <WeddingDateCard
            date={formData.date}
            time={formData.time}
            onDateChange={(date) => handleInfoChange("date", date)}
            onTimeChange={(time) => handleInfoChange("time", time)}
          />

          <WeddingVenueCard
            venueName={formData.venueName}
            venueAddress={formData.venueAddress}
            onVenueChange={handleInfoChange}
          />

          <TransportationCard
            transportations={formData.transportations}
            onTransportChange={(transportations) =>
              setFormData((prev) => ({ ...prev, transportations }))
            }
          />

          <GalleryCard
            images={formData.galleryImages}
            onImagesChange={(images) => setFormData((prev) => ({ ...prev, galleryImages: images }))}
          />

          <EndingCard
            endingMessage={formData.endingMessage}
            onEndingMessageChange={(message) => handleInfoChange("endingMessage", message)}
          />

          <ContactCard
            contacts={formData.contacts}
            onContactsChange={(contacts) => setFormData((prev) => ({ ...prev, contacts }))}
          />

          <BankAccountCard
            accounts={formData.bankAccounts}
            onAccountsChange={(accounts) =>
              setFormData((prev) => ({ ...prev, bankAccounts: accounts }))
            }
          />

          <BackgroundMusicCard
            selectedSong={formData.selectedSong || undefined}
            onSongChange={(song) => setFormData((prev) => ({ ...prev, selectedSong: song }))}
            autoPlay={formData.autoPlay}
            onAutoPlayChange={(autoPlay) => setFormData((prev) => ({ ...prev, autoPlay }))}
          />

          <GuestbookCard
            enabled={formData.guestbookEnabled}
            onToggle={(enabled) => setFormData((prev) => ({ ...prev, guestbookEnabled: enabled }))}
            requirePassword={formData.guestbookRequirePassword}
            onPasswordRequireToggle={(required) =>
              setFormData((prev) => ({ ...prev, guestbookRequirePassword: required }))
            }
            password={formData.guestbookPassword}
            onPasswordChange={(password) =>
              setFormData((prev) => ({ ...prev, guestbookPassword: password }))
            }
            moderationEnabled={formData.guestbookModerationEnabled}
            onModerationToggle={(enabled) =>
              setFormData((prev) => ({ ...prev, guestbookModerationEnabled: enabled }))
            }
          />

          <VideoCard
            video={formData.video || undefined}
            onVideoChange={(video) => setFormData((prev) => ({ ...prev, video }))}
          />

          <FlowerCard
            enabled={formData.flowerEnabled}
            onToggle={(enabled) => setFormData((prev) => ({ ...prev, flowerEnabled: enabled }))}
            selectedVendors={formData.selectedFlowerVendors}
            onVendorsChange={(vendors) =>
              setFormData((prev) => ({ ...prev, selectedFlowerVendors: vendors }))
            }
          />

          <KakaoShareCard
            title={formData.kakaoShareTitle}
            description={formData.kakaoShareDescription}
            thumbnailUrl={formData.kakaoShareThumbnail}
            onTitleChange={(title) => handleInfoChange("kakaoShareTitle", title)}
            onDescriptionChange={(desc) => handleInfoChange("kakaoShareDescription", desc)}
            onThumbnailChange={(url) => handleInfoChange("kakaoShareThumbnail", url)}
          />

          <UrlShareCard
            customUrl={formData.customUrl}
            onCustomUrlChange={(url) => handleInfoChange("customUrl", url)}
            invitationId="1234"
          />
        </div>

        {/* 미리보기 영역 */}
        <div className="sticky top-32 h-[calc(100vh-12rem)] w-160">
          <InvitationPreview
            title={formData.title || undefined}
            date={formData.date || undefined}
            groomName={formData.groomName || undefined}
            brideName={formData.brideName || undefined}
            location={formData.venueName || undefined}
            message={formData.message || undefined}
            templateId={formData.templateId}
          />
        </div>
      </div>
    </div>
  );
}
