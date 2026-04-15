import { FloatingChatButton } from "@/components/home/FloatingChatButton";
import { HeroSection } from "@/components/home/HeroSection";
import { MainContentSections } from "@/components/home/MainContentSections";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";

export default function Home() {
  return (
    <>
      <TopNavigation />
      <HeroSection />
      <MainContentSections />
      <SiteFooter />
      <FloatingChatButton />
    </>
  );
}
