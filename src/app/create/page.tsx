import InvitationPreview from "@/components/InvitationPreview";
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

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6">
      <div className="flex w-full max-w-6xl justify-between gap-8 p-8">
        {/* 왼쪽 커스터마이징 영역 */}
        <div className="w-full space-y-6">
          <ThemeCard />
          <BasicInfoCard />
          <MainScreenCard />
          <GreetingCard />
          <WeddingDateCard />
          <WeddingVenueCard />
          <TransportationCard />
          <GalleryCard />
          <EndingCard />
          <ContactCard />
          <BankAccountCard />
          <BackgroundMusicCard />
          <GuestbookCard />
          <VideoCard />
          <FlowerCard />
          <KakaoShareCard />
          <UrlShareCard />
        </div>

        {/* 미리보기 영역 */}
        <div className="sticky top-24 h-[calc(100vh-14rem)] w-160">
          <InvitationPreview />
        </div>
      </div>
    </div>
  );
}
