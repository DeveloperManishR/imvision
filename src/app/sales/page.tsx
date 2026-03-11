"use client";

import { FullPageSlider } from "@/components/FullPageSlider";
import { SalesHeroSection } from "@/components/SalesHeroSection";
import { SalesIntroSection } from "@/components/SalesIntroSection";
import {
  SalesServicesHeader,
  SalesServicesSection,
  useServicesSlides,
} from "@/components/SalesServicesSection";
import {
  SalesUseCasesHeader,
  SalesUseCasesSection,
} from "@/components/SalesUseCasesSection";
import { SalesDisplaySolutionsSection } from "@/components/SalesDisplaySolutionsSection";
import { SalesContactSection } from "@/components/SalesContactSection";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useQuery } from "@tanstack/react-query";
import { withoutAuthAxios } from "@/lib/config";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMExFRCUyMGRpc3BsYXl8ZW58MXx8fHwxNzM4NjY5MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80";

const ITEMS_PER_SLIDE = 2;

const fetchSale = async () => {
  const res = await withoutAuthAxios().get("/sale");
  return res.data.data[0];
};

export default function SalesPage() {
  const { data: saleData = {}, isLoading } = useQuery({
    queryKey: ["sale"],
    queryFn: fetchSale,
  });

  // Dynamically compute how many slides we need based on servicesList length
  // e.g. 2 items → 1 slide, 5 items → 3 slides, 6 items → 3 slides, etc.
  const serviceSlides = useServicesSlides(saleData, ITEMS_PER_SLIDE);

  return (
    <FullPageSlider
      heroImage={HERO_IMAGE}
      contactImage={CONTACT_IMAGE}
      topSlot={<AnimatedBackground />}
      slides={[
        // ── Hero ──────────────────────────────────────────
        {
          background: "hero",
          content: (
            <SalesHeroSection
              backgroundImage={HERO_IMAGE}
              part="content"
              saleData={saleData}
            />
          ),
        },

        // ── Intro ─────────────────────────────────────────
        {
          background: "black",
          content: <SalesIntroSection saleData={saleData} />,
          scrollable: true,
        },

        // ── Services Header ───────────────────────────────
        {
          background: "black",
          content: <SalesServicesHeader saleData={saleData} />,
          scrollable: true,
        },

        // ── One slide per pair of services (fully dynamic) ─
        ...serviceSlides.map(({ from, to }) => ({
          background: "black" as const,
          scrollable: true,
          content: (
            <SalesServicesSection
              saleData={saleData}
              from={from}
              to={to}
            />
          ),
        })),

        // ── Use Cases Header ──────────────────────────────
        {
          background: "black",
          content: <SalesUseCasesHeader saleData={saleData} />,
          scrollable: true,
        },

        // ── Use Cases ─────────────────────────────────────
        {
          background: "black",
          content: <SalesUseCasesSection saleData={saleData} />,
          scrollable: true,
        },

        // ── Display Solutions ─────────────────────────────
        {
          background: "black",
          content: <SalesDisplaySolutionsSection saleData={saleData} />,
          scrollable: true,
        },

        // ── Contact ───────────────────────────────────────
        {
          background: "contact",
          content: <SalesContactSection part="content" />,
        },
      ]}
    />
  );
}