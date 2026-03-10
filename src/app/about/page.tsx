"use client";

import { AboutHeroSection } from "@/components/AboutHeroSection";
import { AboutStatsSection } from "@/components/AboutStatsSection";
import { ContactSection } from "@/components/ContactSection";
import { FullPageSlider } from "@/components/FullPageSlider";
import { useTranslation } from "@/hooks/useTranslation";
import { withoutAuthAxios } from "@/lib/config";
import { AboutDataInterface } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1690964099658-b619682704ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwdGVjaG5vbG9neSUyMGluc3RhbGxhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzAwMzU2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzA5MTI4ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const fetchAbout = async () => {
  const res = await withoutAuthAxios().get("/about");
  return res.data.data[0];
};

export default function AboutPage() {
    const { t,language } = useTranslation();
  const {
    data: aboutData,
    isLoading: casesLoading,
  } = useQuery<AboutDataInterface>({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });

  console.log("aboutDataaboutData",aboutData)

  return (
     <FullPageSlider
      heroImage={HERO_IMAGE}
      contactImage={CONTACT_IMAGE}
      contentSlideHeightVh={90}
      slides={[
        {
          background: "hero",
          content: <AboutHeroSection part="content" aboutData={aboutData} />,
        },
        {
          background: "black",
          content: <AboutStatsSection part="content" aboutData={aboutData} />,
        },
        {
          background: "contact",
          content: <ContactSection part="content" />,
        },
      ]}
    />
  );
}
