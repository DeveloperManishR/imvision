"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { handleImage } from "@/lib/config";
const ABOUT_IMG = "/aboutImg.png";

type Part = "background" | "content";

interface AboutStatsSectionProps {
  contentY?: string;
  backgroundY?: string;
  transition?: { duration: number; ease: string };
  part?: Part;
}

export function AboutStatsSection({
  contentY = "0%",
  backgroundY = "0%",
  transition = { duration: 1.2, ease: "linear" },
  part,
  aboutData,
}: AboutStatsSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const trans = transition as object;
  const router = useRouter();
  const { t, language } = useTranslation();

  const tabs = [
    {
      stat: "10+",
      label: "Years of Experience",
      description:
        "Delivering large-scale LED installations for events, architecture, and brands worldwide.",
      stats: [
        { value: "3,000+", unit: "m²", label: "Installed LED Displays" },
        { value: "8", unit: "", label: "Markets Served" },
        { value: "220", unit: "m²", label: "Largest Single Installation" },
      ],
    },
    {
      stat: "3,000+",
      label: "Square Meters of LED",
      description:
        "Our extensive inventory ensures we can handle projects of any scale, from intimate displays to massive installations.",
      stats: [
        { value: "15+", unit: "", label: "LED Product Lines" },
        { value: "100%", unit: "", label: "Quality Guarantee" },
        { value: "24/7", unit: "", label: "Technical Support" },
      ],
    },
    {
      stat: "8",
      label: "Markets Worldwide",
      description:
        "From retail to corporate events, we bring cutting-edge LED technology to diverse industries across the globe.",
      stats: [
        { value: "500+", unit: "", label: "Projects Completed" },
        { value: "95%", unit: "", label: "Client Satisfaction" },
        { value: "50+", unit: "", label: "Global Partners" },
      ],
    },
  ];

  const currentTabsData = aboutData?.tabs || [];

  console.log("currentTabsDatacurrentTabsData", currentTabsData[activeTab]);
  if (part === "background") {
    return (
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ y: backgroundY }}
        transition={trans}
        style={{ willChange: "transform" }}
      />
    );
  }

  if (part === "content") {
    return (
      <div className="relative w-full  py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 h-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-white mb-8"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {aboutData?.title?.[language] || ""}
              </h2>
              <div className="w-16 h-px bg-white/50 mb-12" />
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <h3
                    className="text-white"
                    style={{
                      fontSize: "clamp(4rem, 8vw, 8rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                    }}
                  >
                    {currentTabsData?.[activeTab]?.highlightStat || ""}
                  </h3>
                  <span
                    className="text-white/80"
                    style={{
                      fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
                      fontWeight: 300,
                    }}
                  >
                    {currentTabsData?.[activeTab]?.label?.[language] || ""}
                  </span>
                </div>
                <p
                  className="text-white/70 max-w-xl mb-12"
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.125rem)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {currentTabsData?.[activeTab]?.description?.[language] || ""}
                </p>
              </motion.div>
              <motion.div
                key={`stats-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-3 gap-8 mb-12"
              >
                {/* {tabs[activeTab].stats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span
                        className="text-white"
                        style={{
                          fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                          fontWeight: 300,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span
                          className="text-white/60"
                          style={{
                            fontSize: "clamp(0.875rem, 1vw, 1rem)",
                            fontWeight: 300,
                          }}
                        >
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-white/50"
                      style={{
                        fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                        fontWeight: 300,
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))} */}

                {currentTabsData &&
                  currentTabsData.length > 0 &&
                  currentTabsData[activeTab].stats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span
                          className="text-white"
                          style={{
                            fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                            fontWeight: 300,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span
                            className="text-white/60"
                            style={{
                              fontSize: "clamp(0.875rem, 1vw, 1rem)",
                              fontWeight: 300,
                            }}
                          >
                            {stat.unit}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-white/50"
                        style={{
                          fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                          fontWeight: 300,
                          lineHeight: 1.4,
                        }}
                      >
                        {stat.label?.[language]}
                      </p>
                    </div>
                  ))}
              </motion.div>
              <div className="flex items-center gap-3 mb-12">
                {currentTabsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      activeTab === index ? "bg-white w-8" : "bg-white/30"
                    }`}
                    aria-label={`Switch to tab ${index + 1}`}
                  />
                ))}
              </div>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <span
                  style={{
                    fontSize: "clamp(0.875rem, 1vw, 1rem)",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                  }}
                  onClick={() => {
                    router.push("/contact");
                  }}
                >
                  {t.contactSection.cta}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
             {currentTabsData[activeTab ?? 0]?.image ? (
  <ImageWithFallback
    src={`${process.env.NEXT_PUBLIC_IMAGE_VIDEO_URL}/${currentTabsData[activeTab ?? 0]?.image}`}
    alt="LED Billboard on Busy City Street"
    className="w-full h-full object-cover"
  />
) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "100vh" }}
    >
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ y: backgroundY }}
        transition={trans}
        style={{ willChange: "transform" }}
      />
      <motion.div
        className="absolute inset-0 z-10 overflow-y-auto py-20 md:py-32"
        animate={{ y: contentY }}
        transition={trans}
        style={{ willChange: "transform" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-white mb-8"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {t.about.stats.title}
              </h2>

              <div className="w-16 h-px bg-white/50 mb-12" />

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <h3
                    className="text-white"
                    style={{
                      fontSize: "clamp(4rem, 8vw, 8rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                    }}
                  >
                    {tabs[activeTab].stat}
                  </h3>
                  <span
                    className="text-white/80"
                    style={{
                      fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
                      fontWeight: 300,
                    }}
                  >
                    {tabs[activeTab].label}
                  </span>
                </div>

                <p
                  className="text-white/70 max-w-xl mb-12"
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.125rem)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {tabs[activeTab].description}
                </p>
              </motion.div>

              <motion.div
                key={`stats-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-3 gap-8 mb-12"
              >
                {tabs[activeTab].stats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span
                        className="text-white"
                        style={{
                          fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                          fontWeight: 300,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span
                          className="text-white/60"
                          style={{
                            fontSize: "clamp(0.875rem, 1vw, 1rem)",
                            fontWeight: 300,
                          }}
                        >
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-white/50"
                      style={{
                        fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                        fontWeight: 300,
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              <div className="flex items-center gap-3 mb-12">
                {tabs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeTab === index ? "bg-white w-8" : "bg-white/30"
                    }`}
                    aria-label={`Switch to tab ${index + 1}`}
                  />
                ))}
              </div>

              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <span
                  style={{
                    fontSize: "clamp(0.875rem, 1vw, 1rem)",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                  }}
                  onClick={() => {
                    router.push("/contact");
                  }}
                >
                  {t.contactSection.cta}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <ImageWithFallback
                src={ABOUT_IMG}
                alt="LED Billboard on Busy City Street"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
