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
    name: "김민준",
    phoneNumber: "010-1234-5678",
    showCall: true,
    showSms: true,
  },
  groomFather: {
    id: "groomFather",
    name: "김철수",
    phoneNumber: "010-1111-2222",
    showCall: true,
    showSms: true,
  },
  groomMother: {
    id: "groomMother",
    name: "이영희",
    phoneNumber: "010-3333-4444",
    showCall: true,
    showSms: true,
  },
  bride: {
    id: "bride",
    name: "이서연",
    phoneNumber: "010-5678-1234",
    showCall: true,
    showSms: true,
  },
  brideFather: {
    id: "brideFather",
    name: "이정훈",
    phoneNumber: "010-5555-6666",
    showCall: true,
    showSms: true,
  },
  brideMother: {
    id: "brideMother",
    name: "박미경",
    phoneNumber: "010-7777-8888",
    showCall: true,
    showSms: true,
  },
};

const defaultGalleryImages: GalleryImage[] = [
  { id: "gallery-1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", caption: "웨딩 사진 1" },
  { id: "gallery-2", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400", caption: "웨딩 사진 2" },
  { id: "gallery-3", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400", caption: "웨딩 사진 3" },
  { id: "gallery-4", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400", caption: "웨딩 사진 4" },
];

const defaultBankAccounts: BankAccount[] = [
  { id: "bank-1", bankName: "신한은행", accountNumber: "110-123-456789", accountHolder: "김민준", relationship: "신랑" },
  { id: "bank-2", bankName: "국민은행", accountNumber: "123-45-6789012", accountHolder: "김철수", relationship: "신랑 아버지" },
  { id: "bank-3", bankName: "우리은행", accountNumber: "1002-123-456789", accountHolder: "이서연", relationship: "신부" },
  { id: "bank-4", bankName: "하나은행", accountNumber: "123-456789-01234", accountHolder: "이정훈", relationship: "신부 아버지" },
];

const defaultSong: Song = {
  id: "song-1",
  title: "결혼행진곡",
  artist: "멘델스존",
  url: "/music/wedding-march.mp3",
};

const defaultVideo: VideoInfo = {
  type: "youtube",
  url: "https://www.youtube.com/watch?v=example",
  title: "우리의 프로포즈 영상",
};

const defaultFormData: FormData = {
  title: "소중한 분들을 초대합니다",
  // 신랑측 정보
  groomInfo: {
    lastName: "김",
    firstName: "민준",
    isChild: "son",
    fatherName: "철수",
    isFatherDeceased: false,
    motherName: "영희",
    isMotherDeceased: false,
  },
  // 신부측 정보
  brideInfo: {
    lastName: "이",
    firstName: "서연",
    isChild: "daughter",
    fatherName: "정훈",
    isFatherDeceased: false,
    motherName: "미경",
    isMotherDeceased: false,
  },
  // 옵션
  options: {
    showDeceasedWithFlower: false,
    showBrideFirst: false,
  },
  selectedThemeId: 1,
  weddingDate: "2026-05-23",
  weddingTime: "14:00",
  weddingLocation: "그랜드힐튼 서울",
  weddingAddress: "서울특별시 서대문구 홍은동 산 10-1",
  // 예식장 상세 정보
  venueTitle: "웨딩 본식",
  venueHall: "컨벤션센터 3층 그랜드볼룸",
  venuePhone: "02-2287-8000",
  venueOptions: {
    showMap: true,
    lockMap: false,
    attachDirections: true,
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
  message: "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며 키워가려 합니다.\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.",
  endingMessage: "참석이 어려우신 분들도\n멀리서나마 축복해주시면\n감사히 받겠습니다.\n행복하게 잘 살겠습니다.",
  endingMessageEffect: "페이드인",
  mainImage: defaultImage,
  galleryImages: defaultGalleryImages,
  galleryDisplayMode: "그리드",
  transportations: [
    { type: "지하철", description: "3호선 홍제역 3번 출구 무료 셔틀버스 운행", enabled: true },
    { type: "버스", description: "7024, 7737번 홍은초등학교 하차", enabled: true },
    { type: "자가용", description: "홍은동 산 10-1 (네비게이션 '그랜드힐튼' 검색)", enabled: true },
    { type: "셔틀버스", description: "홍제역 3번 출구에서 10분 간격 운행", enabled: true },
  ],
  contacts: defaultContacts,
  bankAccounts: defaultBankAccounts,
  showBankAccounts: true,
  selectedSong: defaultSong,
  autoPlay: true,
  guestbookEnabled: true,
  guestbookRequirePassword: true,
  guestbookPassword: "1234",
  guestbookModerationEnabled: true,
  video: defaultVideo,
  flowerEnabled: true,
  selectedFlowerVendors: ["꽃피는봄", "플라워마켓"],
  kakaoShareTitle: "민준♥서연 결혼식에 초대합니다",
  kakaoShareDescription: "2026년 5월 23일 토요일 오후 2시\n그랜드힐튼 서울 그랜드볼룸",
  kakaoShareThumbnail: defaultImage,
  customUrl: "minjun-seoyeon",
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
