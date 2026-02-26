"use client";

/**
 * Full-page slider with wheel + touch navigation on desktop.
 * On small screens: normal scrollable stack of sections (no animation).
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { SlideIndicatorDots } from "@/components/SlideIndicator";

const MOBILE_BREAKPOINT = 800;
const BG_TRANSITION = { duration: 0.9, ease: [0.4, 0, 0.2, 1] };
const CONTENT_TRANSITION = {
  duration: 0.5,
  delay: 0.3,
  ease: [0.4, 0, 0.2, 1],
};
const WHEEL_THROTTLE_MS = 80;
const WHEEL_MIN_DELTA = 5;
const SWIPE_THRESHOLD = 50;
const DEFAULT_CONTENT_SLIDE_HEIGHT_VH = 92;

export type SlideBackground = "hero" | "black" | "contact";

export interface FullPageSlide {
  /** Which background panel to show behind this slide */
  background: SlideBackground;
  /** Slide content */
  content: ReactNode;
  /** If true, slide wrapper gets overflow-y-auto for scrollable content */
  scrollable?: boolean;
}

export interface FullPageSliderProps {
  /** Slide configs: background type + content + optional scrollable */
  slides: FullPageSlide[];
  /** Image URL for hero background (used when slide.background === "hero") */
  heroImage: string;
  /** Image URL for contact background (used when slide.background === "contact") */
  contactImage: string;
  /** Height of the visible content area in vh (default 92, rental base) */
  contentSlideHeightVh?: number;
  /** Optional slot above content (e.g. AnimatedBackground for sales) */
  topSlot?: ReactNode;
}

interface FullPageSliderContextValue {
  activeIndex: number;
  totalSlides: number;
}

const FullPageSliderContext = createContext<FullPageSliderContextValue | null>(
  null,
);

export function useFullPageSlider(): FullPageSliderContextValue | null {
  return useContext(FullPageSliderContext);
}

function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [breakpoint]);

  return isMobile;
}

function SlideBackgroundLayer({
  background,
  heroImage,
  contactImage,
  className,
}: {
  background: SlideBackground;
  heroImage: string;
  contactImage: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      {background === "hero" && (
        <>
          <Image
            width={100}
            height={100}
            sizes="100vw"
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </>
      )}
      {background === "black" && <div className="w-full h-full bg-black" />}
      {background === "contact" && (
        <>
          <Image
            width={100}
            height={100}
            sizes="100vw"
            src={contactImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </>
      )}
    </div>
  );
}

export function FullPageSlider({
  slides,
  heroImage,
  contactImage,
  contentSlideHeightVh = DEFAULT_CONTENT_SLIDE_HEIGHT_VH,
}: FullPageSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const isMobile = useIsMobile();

  const totalSlides = slides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorIndex, setIndicatorIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Delay indicator update to match slide transition (content has delay + duration)
  const indicatorDelayMs =
    ((CONTENT_TRANSITION.delay ?? 0) + CONTENT_TRANSITION.duration) * 600;
  useEffect(() => {
    if (activeIndex === indicatorIndex) return;
    const t = setTimeout(
      () => setIndicatorIndex(activeIndex),
      indicatorDelayMs,
    );
    return () => clearTimeout(t);
  }, [activeIndex, indicatorIndex, indicatorDelayMs]);

  // Wheel: scroll down = next, scroll up = prev (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < WHEEL_THROTTLE_MS) return;
      lastScrollTime.current = now;
      if (isAnimating) return;
      if (Math.abs(e.deltaY) < WHEEL_MIN_DELTA) return;
      setActiveIndex((i) => {
        const next =
          e.deltaY > 0 ? Math.min(i + 1, totalSlides - 1) : Math.max(i - 1, 0);
        if (next !== i) setIsAnimating(true);
        return next;
      });
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isMobile, isAnimating, totalSlides]);

  // Touch: swipe (desktop slider only; mobile uses normal scroll)
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY.current;
      const now = Date.now();
      if (now - lastScrollTime.current < WHEEL_THROTTLE_MS) return;
      if (isAnimating) return;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      lastScrollTime.current = now;
      setActiveIndex((i) => {
        const next =
          deltaY < 0 ? Math.min(i + 1, totalSlides - 1) : Math.max(i - 1, 0);
        if (next !== i) setIsAnimating(true);
        return next;
      });
    };
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, isAnimating, totalSlides]);

  useEffect(() => {
    if (!isAnimating) return;
    const maxTransition =
      Math.max(
        BG_TRANSITION.duration,
        CONTENT_TRANSITION.duration + (CONTENT_TRANSITION.delay ?? 0),
      ) * 1000;
    const t = setTimeout(() => setIsAnimating(false), maxTransition + 100);
    return () => clearTimeout(t);
  }, [isAnimating]);

  // Small screens: normal scrollable stack of sections (no slider animation)
  if (isMobile) {
    return (
      <div className="relative w-full bg-black ">
        <Navigation />
        {slides.map((slide, i) => (
          <section
            key={i}
            className="relative h-full w-full flex flex-col items-center justify-center"
          >
            <SlideBackgroundLayer
              background={slide.background}
              heroImage={heroImage}
              contactImage={contactImage}
            />
            <div className="relative z-10 w-full flex flex-col items-center justify-center  py-3.5 px-2 md:px-6 ">
              {slide.content}
            </div>
          </section>
        ))}
      </div>
    );
  }

  // Desktop: full-page slider with wheel + touch
  return (
    <FullPageSliderContext.Provider value={{ activeIndex, totalSlides }}>
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-black touch-none"
      >
        <Navigation isRelative />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-full"
            style={{
              height: `${totalSlides * 100}vh`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
            animate={{ y: `-${Math.round(activeIndex * 100)}vh` }}
            transition={BG_TRANSITION as object}
          >
            {slides.map((slide, i) => (
              <div key={i} className="h-screen w-full relative">
                <SlideBackgroundLayer
                  background={slide.background}
                  heroImage={heroImage}
                  contactImage={contactImage}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fixed dot indicator - one per slide, desktop only; click to go to slide */}
        <SlideIndicatorDots
          count={totalSlides}
          activeIndex={indicatorIndex}
          onDotClick={(index) => {
            setActiveIndex(index);
            setIsAnimating(true);
          }}
          ariaLabel={`Slide ${indicatorIndex + 1} of ${totalSlides}`}
        />

        {/* Content carousel */}
        <div className=" flex items-center justify-center overflow-hidden h-[calc(100vh-62px)]">
          <div
            className="w-full overflow-hidden "
            style={{ height: `${contentSlideHeightVh}vh` }}
          >
            <motion.div
              className="w-full h-full"
              // style={{
              //   height: `${TOTAL_SLIDES * CONTENT_SLIDE_HEIGHT_VH}vh`,
              // }}
              animate={{
                y: `-${Math.round(activeIndex * contentSlideHeightVh)}vh`,
              }}
              transition={CONTENT_TRANSITION as object}
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`w-full flex items-center justify-center ${
                    slide.scrollable ? "overflow-y-auto" : "overflow-hidden"
                  }`}
                  style={{ height: `${contentSlideHeightVh}vh` }}
                >
                  {slide.content}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </FullPageSliderContext.Provider>
  );
}
