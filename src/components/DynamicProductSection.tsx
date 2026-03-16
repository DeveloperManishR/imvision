"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { withoutAuthAxios, handleImage } from "@/lib/config";
import { useTranslation } from "@/hooks/useTranslation";

export function DynamicProductSection({ productData }) {
  const { t, language } = useTranslation();

  return (
    <div className="relative bg-black">
      {/* Section 1: Hero - Client Introduction */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background decorative text layers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
          <p
            className="text-white/10 text-center"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Modernizing the
          </p>
          <p
            className="text-[#2BCC07]/10 text-center"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            In-Store Experience
          </p>
        </motion.div>

        {/* Animated corner accents - Full Borders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Top border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2BCC07] to-transparent origin-center"
          />

          {/* Bottom border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2BCC07] to-transparent origin-center"
          />

          {/* Left border */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#2BCC07] to-transparent origin-center"
          />

          {/* Right border */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#2BCC07] to-transparent origin-center"
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#2BCC07]" />
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#2BCC07]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#2BCC07]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#2BCC07]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl px-8 text-center">
          {/* Category Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="inline-block relative">
              <p
                className="text-[#2BCC07] tracking-[0.4em] uppercase"
                style={{
                  fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                  fontWeight: 400,
                }}
              >
                {productData?.intro?.industryTitle[language]}
              </p>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#2BCC07]"
                style={{ transformOrigin: "center" }}
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-white leading-[1.05]"
              style={{
                fontSize: "clamp(3rem, 7.5vw, 8.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
              }}
            >
              {productData?.intro?.title[language]}
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-block"
              style={{
                fontSize: "clamp(3rem, 7.5vw, 8.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="text-[#2BCC07]">
                {" "}
                {productData?.intro?.subtitle[language]}
              </span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <p
              className="text-white/85"
              style={{
                fontSize: "clamp(1rem, 1.65vw, 1.375rem)",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              {productData?.intro?.description[language]}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 2: Window Displays Solution */}
      {productData &&
        productData.windowDisplay.length > 0 &&
        productData.windowDisplay.map((item, index) => {
          const isOdd = index % 2 !== 0;

          return (
            <div
              key={item._id || index}
              className="relative h-screen w-full overflow-hidden"
            >
              {/* Split screen layout */}
              <div className="absolute inset-0 flex">
                {/* Image Section */}
                <motion.div
                  initial={{ x: isOdd ? "-100%" : "100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className={`w-1/2 relative overflow-hidden ${
                    isOdd ? "order-1" : "order-2"
                  }`}
                >
                  <ImageWithFallback
                    src={handleImage(item?.image)}
                    alt="LED window displays"
                    className="w-full h-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/60" />
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ x: isOdd ? "100%" : "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className={`w-1/2 relative bg-black flex items-center justify-center ${
                    isOdd ? "order-2" : "order-1"
                  }`}
                >
                  <div className="max-w-2xl px-12">
                    {/* Decorative number */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 0.08, scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="absolute top-12 right-12 text-[#2BCC07] pointer-events-none"
                      style={{
                        fontSize: "clamp(8rem, 15vw, 18rem)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Label */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="mb-8"
                    >
                      <div className="inline-flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-[#2BCC07]" />
                        <p
                          className="text-[#2BCC07] tracking-[0.3em] uppercase"
                          style={{
                            fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                            fontWeight: 400,
                          }}
                        >
                          {item?.subtitle[language]}
                        </p>
                      </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-white mb-10"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item?.title[language]}
                      <br />
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="text-white/75 mb-12"
                      style={{
                        fontSize: "clamp(1rem, 1.35vw, 1.125rem)",
                        fontWeight: 300,
                        lineHeight: 1.8,
                      }}
                    >
                      {item?.description[language]}
                    </motion.p>

                    {/* Feature list */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      {item?.features &&
                        item?.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature._id || featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: 1 + featureIndex * 0.1,
                            }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: 1.1 + featureIndex * 0.1,
                                type: "spring",
                              }}
                              viewport={{ once: true }}
                              className="w-1.5 h-1.5 bg-[#2BCC07] rounded-full"
                            />
                            <span
                              className="text-white/60"
                              style={{
                                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                                fontWeight: 300,
                              }}
                            >
                              {feature[language]}
                            </span>
                          </motion.div>
                        ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Center dividing line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#2BCC07]/30 origin-top"
              />
            </div>
          );
        })}

      {/* Section 4: Solutions & Goals - Stacking Cards */}
      <div className="relative bg-black pb-32">
        {/* Section label */}
        <div className="relative z-20 pt-32 pb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#2BCC07] tracking-[0.4em] uppercase mb-12"
            style={{
              fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
              fontWeight: 400,
            }}
          >
            {productData?.approachContent?.subtitle[language]}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="text-white">
              {" "}
              {productData?.approachContent?.title[language]}{" "}
            </span>
          </motion.h2>
        </div>

        {/* Stacking Cards */}
        <div className="relative px-6 lg:px-12">
          {productData?.approach &&
            productData?.approach.map((item: any, index) => (
              <div key={item._id || index} className="sticky top-24 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-10%", amount: 0.3 }}
                  className="relative max-w-4xl mx-auto bg-black border border-[#2BCC07]/30 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <ImageWithFallback
                      src={handleImage(item.image)}
                      alt="Create modern interactive experiences"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

                    {/* Number overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.15 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="absolute top-8 right-8 text-[#2BCC07] pointer-events-none"
                      style={{
                        fontSize: "clamp(5rem, 10vw, 8rem)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-8 lg:p-12">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="text-white mb-6"
                      style={{
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        fontWeight: 300,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item?.title[language]}
                    </motion.h3>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="w-16 h-[1px] bg-[#2BCC07] mb-6 origin-left"
                    />

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="text-white/70"
                      style={{
                        fontSize: "clamp(0.9375rem, 1.15vw, 1.0625rem)",
                        fontWeight: 300,
                        lineHeight: 1.7,
                      }}
                    >
                      {item?.description[language]}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            ))}
        </div>
      </div>

      {/* Section 5: Results - Dramatic Impact */}
      <div className="relative w-full bg-black py-32 lg:py-40">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-24 lg:mb-32"
          >
            <div className="flex items-center gap-6 mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-20 h-[1px] bg-[#2BCC07]"
              />
              <p
                className="text-[#2BCC07] tracking-[0.4em] uppercase"
                style={{
                  fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                  fontWeight: 400,
                }}
              >
                {productData?.results?.subtitle[language]}
              </p>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="text-white max-w-4xl"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
              }}
            >
              {productData?.results?.title[language]}
            </motion.h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
            {/* Stat 1 - Main metric */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative border-l-2 border-[#2BCC07] pl-8 lg:pl-12">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-[#2BCC07] mb-6"
                    style={{
                      fontSize: "clamp(5rem, 12vw, 10rem)",
                      fontWeight: 300,
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {productData?.resultHighlights[0].metric}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    className="text-white mb-6"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 300,
                      lineHeight: 1.3,
                    }}
                  >
                    {productData?.resultHighlights[0].title[language]}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                    className="text-white/60 max-w-xl"
                    style={{
                      fontSize: "clamp(0.9375rem, 1.15vw, 1.0625rem)",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {productData?.resultHighlights[0].description[language]}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Stat 2 - Secondary metric */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="border-l border-[#2BCC07]/30 pl-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
                className="text-[#2BCC07] mb-4"
                style={{
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 300,
                  lineHeight: 0.9,
                }}
              >
                {productData?.resultHighlights[1].metric}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                viewport={{ once: true }}
                className="text-white mb-4"
                style={{
                  fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                  fontWeight: 300,
                  lineHeight: 1.3,
                }}
              >
                {productData?.resultHighlights[1].title[language]}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                viewport={{ once: true }}
                className="text-white/60"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                {productData?.resultHighlights[1].description[language]}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 6: Contact Us CTA */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-5xl text-center">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-block relative">
                <p
                  className="text-[#2BCC07] tracking-[0.4em] uppercase"
                  style={{
                    fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                    fontWeight: 400,
                  }}
                >
                  {productData?.callToAction?.badge[language]}
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#2BCC07]"
                  style={{ transformOrigin: "center" }}
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-white mb-8"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              {productData?.callToAction?.heading[language]}
              <br />
              <span className="text-[#2BCC07]">
                {" "}
                {productData?.callToAction?.subheading[language]}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-white/80 mb-16 max-w-3xl mx-auto"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              {productData?.callToAction?.description[language]}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block relative group"
              >
                <div className="relative px-12 py-6 bg-white overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#2BCC07]"
                  />
                  <span
                    className="relative z-10 text-black transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                      fontWeight: 400,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Get in Touch
                  </span>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2BCC07] origin-left"
                />
              </motion.a>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              transition={{ duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-[1px] h-16 bg-[#2BCC07]" />
                <div className="w-2 h-2 rounded-full bg-[#2BCC07]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}