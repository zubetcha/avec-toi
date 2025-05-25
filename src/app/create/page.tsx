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
  // 신랑측 정보
  groomInfo: {
    lastName: string;
    firstName: string;
    isChild: "son" | "daughter";
    fatherName: string;
    isFatherDeceased: boolean;
    motherName: string;
    isMotherDeceased: boolean;
  };
  // 신부측 정보
  brideInfo: {
    lastName: string;
    firstName: string;
    isChild: "son" | "daughter";
    fatherName: string;
    isFatherDeceased: boolean;
    motherName: string;
    isMotherDeceased: boolean;
  };
  // 추가 옵션
  options: {
    showDeceasedWithFlower: boolean;
    showBrideFirst: boolean;
  };
  selectedTemplate: number;
  weddingDate: string;
  weddingTime: string;
  weddingLocation: string;
  weddingAddress: string;
  theme: {
    selectedColor: string;
    selectedFont: string;
    selectedFontSize: string;
    useHighContrast: boolean;
    useAnimation: boolean;
    useParallaxEffect: boolean;
    useAutoScroll: boolean;
  };
  message: string;
  endingMessage: string;
  mainImage: string;
  galleryImages: GalleryImage[];
  transportations: TransportInfo[];
  contacts: {
    groom: ContactInfo;
    groomFather: ContactInfo;
    groomMother: ContactInfo;
    bride: ContactInfo;
    brideFather: ContactInfo;
    brideMother: ContactInfo;
  };
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
  backgroundColor: string;
  backgroundPattern: string;
  backgroundEffect: string;
}

const defaultContacts = {
  groom: {
    id: "groom",
    name: "",
    phoneNumber: "",
    showCall: true,
    showSms: true,
  },
  groomFather: {
    id: "groomFather",
    name: "",
    phoneNumber: "",
    showCall: true,
    showSms: true,
  },
  groomMother: {
    id: "groomMother",
    name: "",
    phoneNumber: "",
    showCall: true,
    showSms: true,
  },
  bride: {
    id: "bride",
    name: "",
    phoneNumber: "",
    showCall: true,
    showSms: true,
  },
  brideFather: {
    id: "brideFather",
    name: "",
    phoneNumber: "",
    showCall: true,
    showSms: true,
  },
  brideMother: {
    id: "brideMother",
    name: "",
    phoneNumber: "",
    showCall: true,
    showSms: true,
  },
};

export default function CreatePage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    // 신랑측 정보 초기화
    groomInfo: {
      lastName: "",
      firstName: "",
      isChild: "son",
      fatherName: "",
      isFatherDeceased: false,
      motherName: "",
      isMotherDeceased: false,
    },
    // 신부측 정보 초기화
    brideInfo: {
      lastName: "",
      firstName: "",
      isChild: "daughter",
      fatherName: "",
      isFatherDeceased: false,
      motherName: "",
      isMotherDeceased: false,
    },
    // 옵션 초기화
    options: {
      showDeceasedWithFlower: false,
      showBrideFirst: false,
    },
    selectedTemplate: 1,
    weddingDate: "",
    weddingTime: "",
    weddingLocation: "",
    weddingAddress: "",
    theme: {
      selectedColor: "rose",
      selectedFont: "pretendard",
      selectedFontSize: "medium",
      useHighContrast: false,
      useAnimation: true,
      useParallaxEffect: false,
      useAutoScroll: false,
    },
    message: "",
    endingMessage: "",
    mainImage: "",
    galleryImages: [],
    transportations: [],
    contacts: defaultContacts,
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
    backgroundColor: "#ffffff",
    backgroundPattern: "none",
    backgroundEffect: "none",
  });

  const handleInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGroomInfoChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      groomInfo: {
        ...prev.groomInfo,
        [field]: value,
      },
    }));
  };

  const handleBrideInfoChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      brideInfo: {
        ...prev.brideInfo,
        [field]: value,
      },
    }));
  };

  const handleOptionsChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [field]: value,
      },
    }));
  };

  const handleTemplateSelect = (id: number) => {
    setFormData((prev) => ({ ...prev, selectedTemplate: id }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-6">
      <div className="flex w-full max-w-6xl justify-between gap-8 p-8">
        {/* 왼쪽 커스터마이징 영역 */}
        <div className="w-full space-y-6">
          <ThemeCard
            currentThemeId={formData.selectedTemplate}
            onThemeChange={(id) => handleTemplateSelect(id)}
            backgroundColor={formData.backgroundColor}
            backgroundPattern={formData.backgroundPattern}
            backgroundEffect={formData.backgroundEffect}
            selectedFont={formData.theme.selectedFont}
            selectedFontSize={formData.theme.selectedFontSize}
            options={formData.theme}
            onBackgroundColorChange={(color) =>
              setFormData((prev) => ({ ...prev, backgroundColor: color }))
            }
            onBackgroundPatternChange={(pattern) =>
              setFormData((prev) => ({ ...prev, backgroundPattern: pattern }))
            }
            onBackgroundEffectChange={(effect) =>
              setFormData((prev) => ({ ...prev, backgroundEffect: effect }))
            }
            onFontChange={(font) =>
              setFormData((prev) => ({ ...prev, theme: { ...prev.theme, selectedFont: font } }))
            }
            onFontSizeChange={(fontSize: string) =>
              setFormData((prev) => ({
                ...prev,
                theme: { ...prev.theme, selectedFontSize: fontSize },
              }))
            }
          />

          <BasicInfoCard
            groomInfo={formData.groomInfo}
            brideInfo={formData.brideInfo}
            options={formData.options}
            onInfoChange={handleInfoChange}
            onGroomInfoChange={handleGroomInfoChange}
            onBrideInfoChange={handleBrideInfoChange}
            onOptionsChange={handleOptionsChange}
          />

          <MainScreenCard
            mainImage={formData.mainImage}
            onImageChange={(url) => handleInfoChange("mainImage", url)}
          />

          <GreetingCard
            message={formData.message}
            onMessageChange={(message) => handleInfoChange("message", message)}
            title={formData.title}
            onTitleChange={(title) => handleInfoChange("title", title)}
          />

          <WeddingDateCard
            date={formData.weddingDate}
            time={formData.weddingTime}
            onDateChange={(date) => handleInfoChange("weddingDate", date)}
            onTimeChange={(time) => handleInfoChange("weddingTime", time)}
          />

          <WeddingVenueCard
            venueName={formData.weddingLocation}
            venueAddress={formData.weddingAddress}
            onVenueChange={(field, value) => {
              if (field === "venueName") {
                handleInfoChange("weddingLocation", value);
              } else if (field === "venueAddress") {
                handleInfoChange("weddingAddress", value);
              }
            }}
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
        <div className="sticky top-24 h-[calc(100vh-14rem)] w-160">
          <InvitationPreview
            title={formData.title || undefined}
            date={formData.weddingDate || undefined}
            groomName={formData.groomInfo.firstName || undefined}
            brideName={formData.brideInfo.firstName || undefined}
            location={formData.weddingLocation || undefined}
            message={formData.message || undefined}
            templateId={formData.selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
}
