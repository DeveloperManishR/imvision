"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export interface Service {
  title: string;
  description: string;
  image: string;
}

interface WhatWeDoSectionProps {
  services: Service[];
}

/** CTA path for each What We Do card (1-based index). Labels come from t.whatWeDo.cta. */
const WHAT_WE_DO_PATHS = ["/contact", "/rental", "/service"] as const;
const CTA_KEYS = ["sales", "rental", "service"] as const;

/** Header only – for use as intro slide in FullPageSlider */
export function WhatWeDoSectionHeader() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex items-start gap-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
          {t.whatWeDo.title}
        </h2>
      </motion.div>
    </div>
  );
}

/** Single service card – for use as one slide in FullPageSlider. index is 1-based (01, 02, 03). */
export function WhatWeDoSectionSlide({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const ctaKey = CTA_KEYS[index - 1] ?? CTA_KEYS[0];
  const ctaLabel = t.whatWeDo.cta[ctaKey];
  const ctaPath = WHAT_WE_DO_PATHS[index - 1] ?? WHAT_WE_DO_PATHS[0];

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 xl:p-24 pb-24 md:pb-32 lg:pb-40">
        <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white mb-4">
          {service.title}
        </h3>
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 max-w-2xl">
          {service.description}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-12 py-4 bg-transparent border-2 border-white/30 text-white text-sm tracking-[0.3em] overflow-hidden transition-all duration-300 w-fit"
          onClick={() => router.push(ctaPath)}
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300 italic">
            {ctaLabel}
          </span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 animate-pulse bg-white/20" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}

export function WhatWeDoSection({ services }: WhatWeDoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Calculate scroll progress for each card
  // Card 1 (Sales): Always visible from start, give it more time before overlap
  const card1Y = useTransform(scrollYProgress, [0, 0.4], ["0%", "0%"]);
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [1, 0.95, 0.9],
  );

  // Card 2 (Rental): Slides in later to give Sales card more visibility
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55],
    ["100%", "0%", "0%"],
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0.4, 0.7, 0.85],
    [1, 0.95, 0.9],
  );

  // Card 3 (Service): Slides in last and stacks on top
  const card3Y = useTransform(
    scrollYProgress,
    [0.55, 0.7, 1],
    ["100%", "0%", "0%"],
  );
  const card3Scale = useTransform(scrollYProgress, [0.7, 1], [1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-black"
      style={{ position: "relative" }}
    >
      {/* Section Title - Fixed at top */}
      <div
        className="sticky top-0 w-full bg-black pt-16 md:pt-24 pb-8 px-6 md:px-12 lg:px-24 z-50"
        style={{ position: "sticky" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-start gap-6"
        >
          <div className="w-1 h-16 bg-[#2BCC07]" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
            {t.whatWeDo.title}
          </h2>
        </motion.div>
      </div>

      {/* Sticky Container for Cards */}
      <div className="sticky top-0 h-screen w-full">
        {/* Card 1 - Sales (Base Layer) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: card1Y,
            scale: card1Scale,
            zIndex: 1,
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${services[0].image})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Green Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2BCC07]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 xl:p-24 pb-24 md:pb-32 lg:pb-40">
              {/* Number Indicator */}
              <div className="text-[#2BCC07] text-sm font-light tracking-[0.3em] mb-4">
                01
              </div>

              {/* Title */}
              <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white mb-4">
                {services[0].title}
              </h3>

              {/* Description */}
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 max-w-2xl">
                {services[0].description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-12 py-4 bg-transparent border-2 border-white/30 text-white text-sm tracking-[0.3em] overflow-hidden transition-all duration-300 w-fit"
                onClick={() => {
                  router.push("/contact");
                }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 italic">
                  {t.whatWeDo.cta.sales}
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 animate-pulse bg-white/20" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Card 2 - Rental (Middle Layer) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: card2Y,
            scale: card2Scale,
            zIndex: 2,
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${services[1].image})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Green Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2BCC07]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 xl:p-24">
              {/* Number Indicator */}
              <div className="text-[#2BCC07] text-sm font-light tracking-[0.3em] mb-4">
                02
              </div>

              {/* Title */}
              <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white mb-4">
                {services[1].title}
              </h3>

              {/* Description */}
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 max-w-2xl">
                {services[1].description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-12 py-4 bg-transparent border-2 border-white/30 text-white text-sm tracking-[0.3em] overflow-hidden transition-all duration-300 w-fit"
                onClick={() => router.push("/rental")}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 italic">
                  {t.whatWeDo.cta.rental}
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 animate-pulse bg-white/20" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Card 3 - Service (Top Layer) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: card3Y,
            scale: card3Scale,
            zIndex: 3,
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${services[2].image})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Green Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2BCC07]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 xl:p-24">
              {/* Number Indicator */}
              <div className="text-[#2BCC07] text-sm font-light tracking-[0.3em] mb-4">
                03
              </div>

              {/* Title */}
              <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white mb-4">
                {services[2].title}
              </h3>

              {/* Description */}
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 max-w-2xl">
                {services[2].description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-12 py-4 bg-transparent border-2 border-white/30 text-white text-sm tracking-[0.3em] overflow-hidden transition-all duration-300 w-fit"
                onClick={() => router.push("/service")}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 italic">
                  {t.whatWeDo.cta.service}
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 animate-pulse bg-white/20" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(43, 204, 7, .05) 25%, rgba(43, 204, 7, .05) 26%, transparent 27%, transparent 74%, rgba(43, 204, 7, .05) 75%, rgba(43, 204, 7, .05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(43, 204, 7, .05) 25%, rgba(43, 204, 7, .05) 26%, transparent 27%, transparent 74%, rgba(43, 204, 7, .05) 75%, rgba(43, 204, 7, .05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </section>
  );
}
