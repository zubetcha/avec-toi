"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const defaultImage = "https://i.pinimg.com/1200x/58/e7/23/58e7238d5e956a1961e7ca5e03be3729.jpg";

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

export interface FormData {
  /* 현재 CreatePage 에 있던 타입 그대로 */
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
  selectedThemeId: number;
  weddingDate: string;
  weddingTime: string;
  weddingLocation: string;
  weddingAddress: string;
  // 예식장 상세 정보
  venueTitle: string;
  venueHall: string;
  venuePhone: string;
  venueOptions: {
    showMap: boolean;
    lockMap: boolean;
    attachDirections: boolean;
  };
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
  endingMessageEffect: "페이드인" | "슬라이드" | "타이핑" | "반짝임";
  mainImage: string;
  galleryImages: GalleryImage[];
  galleryDisplayMode: "그리드" | "슬라이더" | "모자이크";
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
  showBankAccounts: boolean;
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

const defaultFormData: FormData = {
  /* 기본값 그대로 */
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
  selectedThemeId: 1,
  weddingDate: "",
  weddingTime: "",
  weddingLocation: "",
  weddingAddress: "",
  // 예식장 상세 정보
  venueTitle: "웨딩 본식",
  venueHall: "",
  venuePhone: "",
  venueOptions: {
    showMap: true,
    lockMap: false,
    attachDirections: false,
  },
  theme: {
    selectedColor: "rose",
    selectedFont: "Noto Sans KR",
    selectedFontSize: "medium",
    useHighContrast: false,
    useAnimation: true,
    useParallaxEffect: false,
    useAutoScroll: false,
  },
  message: "",
  endingMessage: "",
  endingMessageEffect: "페이드인",
  mainImage: defaultImage,
  galleryImages: [],
  galleryDisplayMode: "그리드",
  transportations: [
    { type: "지하철", description: "", enabled: true },
    { type: "버스", description: "", enabled: true },
    { type: "자가용", description: "", enabled: true },
    { type: "셔틀버스", description: "", enabled: false },
  ],
  contacts: defaultContacts,
  bankAccounts: [],
  showBankAccounts: false,
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
  backgroundColor: "#FFF5F5",
  backgroundPattern: "none",
  backgroundEffect: "none",
};

interface InvitationState {
  data: FormData;
  /* ───────── setters ───────── */
  setField: (key: keyof FormData, value: any) => void;
  /* 신랑·신부 등 중첩 객체용 */
  setNested: (parent: keyof FormData, key: string, value: any) => void;
}

export const useInvitationStore = create<InvitationState>()(
  devtools(
    immer((set) => ({
      data: defaultFormData,

      setField: (key, value) =>
        set((state) => {
          state.data[key] = value as never;
        }),

      setNested: (parent, key, value) =>
        set((state) => {
          (state.data[parent] as any)[key] = value;
        }),
    })),
    { name: "InvitationStore" }
  )
);
