"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export interface HomePortfolioItem {
  title: string;
  category: string;
  image: string | null;
  slug: string;
}

interface HomePortfolioSlideProps {
  item: HomePortfolioItem;
  index: number; // 1-based among portfolio slides (01, 02, ... on mobile)
}

export function HomePortfolioSlide({ item, index }: HomePortfolioSlideProps) {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Background: image or solid black (DOOH) */}
      {item.image ? (
        <>
          <div className="absolute inset-0">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}
      {/* Content - bottom left: category + title */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-end">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p
              className="text-white/70 uppercase tracking-widest mb-2"
              style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
            >
              {item.category}
            </p>
            <h2
              className="text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {item.title}
            </h2>
          </div>
          <Link
            href={`/projects/${item.slug}`}
            className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#2BCC07] text-[#2BCC07] hover:bg-[#2BCC07] hover:text-black transition-colors duration-300 shrink-0"
            aria-label={`View ${item.title}`}
          >
            <ArrowUpRight className="w-6 h-6" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
