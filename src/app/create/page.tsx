import ThemeCard from "@/components/card/ThemeCard";
import BasicInfoCard from "@/components/card/BasicInfoCard";
import GreetingCard from "@/components/card/GreetingCard";
import WeddingDateCard from "@/components/card/WeddingDateCard";
import WeddingVenueCard from "@/components/card/WeddingVenueCard";
import TransportationCard from "@/components/card/TransportationCard";
import GalleryCard from "@/components/card/GalleryCard";
import EndingCard from "@/components/card/EndingCard";
import ContactCard from "@/components/card/ContactCard";
import BankAccountCard from "@/components/card/BankAccountCard";
import BackgroundMusicCard from "@/components/card/BackgroundMusicCard";
import GuestbookCard from "@/components/card/GuestbookCard";
import VideoCard from "@/components/card/VideoCard";
import FlowerCard from "@/components/card/FlowerCard";
import KakaoShareCard from "@/components/card/KakaoShareCard";
import UrlShareCard from "@/components/card/UrlShareCard";
import InvitationPreview from "@/components/InvitationPreview";
import MainCard from "@/components/card/MainCard";

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6">
      <div className="flex w-full max-w-6xl justify-between gap-8 p-8">
        {/* 미리보기 영역 */}
        <div className="sticky top-24 h-[calc(100vh-10rem)] w-180">
          <InvitationPreview />
        </div>
        {/* 커스터마이징 영역 */}
        <div className="w-full">
          <ThemeCard />
          <MainCard />
          <BasicInfoCard />
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
      </div>
    </div>
  );
}
