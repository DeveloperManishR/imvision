"use client";

import { motion } from "motion/react";
import { FullPageSlider } from "@/components/FullPageSlider";
import { ServiceHeroSection } from "@/components/ServiceHeroSection";
import { ContactSection } from "@/components/ContactSection";
import {
  ServicesSectionHeader,
 
  Service,
} from "@/components/ServicesSection";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useTranslation } from "@/hooks/useTranslation";
import { useQuery } from "@tanstack/react-query";
import { withoutAuthAxios } from "@/lib/config";
import { ServiceSectionItem } from "@/components/ServiceSectionItem";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1706248504630-d165ae5f7134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNobmljaWFuJTIwaW5zdGFsbGluZyUyMExFRCUyMGRpc3BsYXl8ZW58MXx8fHwxNzcwNjMwMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzA5MTI4ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

function ServiceIntroContent({ serviceData }: { serviceData: any }) {
  const { language } = useTranslation();

  return (
    <div className="relative w-full">
      <div className="container mx-auto px-6 lg:px-24 pt-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <p
            className="text-white/80 mb-8"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 2rem)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            {serviceData?.introParagraphOne?.[language]}
          </p>
          <p
            className="text-[#2BCC07]"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 2rem)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            {serviceData?.highlightParagraphOneTitle?.[language]}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const fetchService = async () => {
  const res = await withoutAuthAxios().get("/service");
  return res.data.data[0];
};

// Utility: chunk array into groups of n
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function ServicePage() {
  const { language } = useTranslation();
  const { data: serviceData = {}, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: fetchService,
  });

  const services: Service[] = serviceData?.services ?? [];

  // Split services into chunks of 2
  const serviceChunks = chunkArray(services, 2);

  // Build one slide per chunk
  const serviceSlides = serviceChunks.map((chunk, chunkIndex) => ({
    background: "black" as const,
    scrollable: true,
    content: (
      <div className="h-full flex flex-col items-center justify-center md:gap-10 gap-6">
        {chunk.map((service, indexInChunk) => {
          const globalIndex = chunkIndex * 2 + indexInChunk;
          return (
            <ServiceSectionItem
              key={`${chunkIndex}-${indexInChunk}`}
              service={service}
              index={globalIndex}
              language={language}
            />
          );
        })}
      </div>
    ),
  }));

  return (
    <FullPageSlider
      heroImage={HERO_IMAGE}
      contactImage={CONTACT_IMAGE}
      topSlot={<AnimatedBackground />}
      slides={[
        {
          background: "hero",
          content: (
            <ServiceHeroSection
              serviceData={serviceData}
              backgroundImage={HERO_IMAGE}
              part="content"
            />
          ),
        },
        {
          background: "black",
          content: <ServiceIntroContent serviceData={serviceData} />,
        },
        {
          background: "black",
          content: <ServicesSectionHeader serviceData={serviceData} />,
        },
        // Dynamic service slides — 2 per slide, works for any count
        ...serviceSlides,
        {
          background: "contact",
          content: <ContactSection part="content" />,
        },
      ]}
    />
  );
}