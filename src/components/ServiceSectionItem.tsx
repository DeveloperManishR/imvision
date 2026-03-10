"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { handleImage } from "@/lib/config";

export interface Service {
  id?: number;
  number?: string;
  title: { [key: string]: string } | string;
  description: { [key: string]: string } | string;
  features?: string[];
  image: string;
}

export function ServiceSectionItem({
  service,
  index,
  language,
}: {
  service: Service;
  index: number;
  language: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const isEven = index % 2 === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="container mx-auto px-6 lg:px-24 h-full overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`md:w-1/2 relative ${isEven ? "md:order-1" : "md:order-2"}`}
          >
            <div className="relative overflow-hidden max-h-[140px] md:max-h-[200px] lg:max-h-[320px]">
              <motion.img
                src={handleImage(
                  typeof service.image === "string" ? service.image : ""
                )}
                alt={
                  typeof service.title === "string"
                    ? service.title
                    : service.title?.[language] ?? ""
                }
                className="w-full h-auto object-cover"
                whileInView={{ scale: 1 }}
                initial={{ scale: 1.15 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
              <div className="absolute top-6 right-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-[#2BCC07]"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 200,
                    lineHeight: 1,
                    textShadow: "0 2px 20px rgba(43, 204, 7, 0.3)",
                    opacity: 0.4,
                  }}
                >
                  {index + 1}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`md:w-1/2 h-full ${isEven ? "md:order-2" : "md:order-1"}`}
          >
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white mb-4"
              style={{
                fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {typeof service.title === "string"
                ? service.title
                : service.title?.[language]}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/70 mb-6"
              style={{
                fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {typeof service.description === "string"
                ? service.description
                : service.description?.[language]}
            </motion.p>

            <motion.a
              href="/contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ x: 3 }}
              className="inline-flex items-center gap-2 group"
            >
              <span
                className="text-white/80 group-hover:text-[#2BCC07] transition-colors duration-300"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {t.service.requestService}
              </span>
              <div className="w-6 h-6 border border-[#2BCC07] flex items-center justify-center group-hover:bg-[#2BCC07] transition-all duration-300">
                <ArrowUpRight className="w-3 h-3 text-[#2BCC07] group-hover:text-black transition-colors duration-300" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSectionHeader({ serviceData }: { serviceData: any }) {
  const { t, language } = useTranslation();
  return (
    <div className="container mx-auto px-6 lg:px-24 pt-20 lg:pt-28 pb-12 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-6 mb-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-[2px] origin-left bg-[#2BCC07]"
          />
          <p
            className="tracking-[0.3em] uppercase text-[#2BCC07]"
            style={{ fontSize: "0.875rem", fontWeight: 400 }}
          >
            {serviceData?.highlightTitle?.[language]}
          </p>
        </div>
        <h2
          className="text-white"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {serviceData?.introParagraphTwo?.[language]}
        </h2>
      </motion.div>
    </div>
  );
}