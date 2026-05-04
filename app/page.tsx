import { FloatingChatButton } from "@/components/home/FloatingChatButton";
import { HeroSection } from "@/components/home/HeroSection";
import { MainContentSections } from "@/components/home/MainContentSections";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { getSiteContent } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <TopNavigation content={content.navigation} />
      <HeroSection hero={content.home.hero} />
      <MainContentSections content={content.home} />
      <SiteFooter />
      <FloatingChatButton />
    </>
  );
}
