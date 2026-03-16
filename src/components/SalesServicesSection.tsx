"use client";
import { motion } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { handleImage } from "@/lib/config";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
  "https://images.unsplash.com/photo-1763671727638-5bc55bb9c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
];

interface RawService {
  _id: string;
  title: { en: string; sv: string };
  description: { en: string; sv: string };
  features: Array<{ en: string; sv: string; _id?: string }>;
  image?: string;
}

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

function useNormalizedServices(saleData: any): Service[] {
  const { language } = useTranslation();

  const rawList: RawService[] = saleData?.servicesList ?? [];

  return rawList.map((item, i) => ({
    id: item._id ?? String(i),
    number: String(i + 1).padStart(2, "0"),
    title: item.title?.[language] ?? item.title?.en ?? "",
    description: item.description?.[language] ?? item.description?.en ?? "",
    features: (item.features ?? []).map(
      (f) => f[language] ?? f.en ?? ""
    ),
    image:item?.image,
  }));
}

function ServiceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const isEven = index % 2 === 0;

  console.log("serviceservice",service)

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="container mx-auto px-6 lg:px-24 h-full overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`lg:w-1/2 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="relative overflow-hidden max-h-[140px] md:max-h-[320px]">
              <motion.img
                src={handleImage(service.image)}
                alt={service.title}
                className="w-full h-auto object-cover"
                whileInView={{ scale: 1 }}
                initial={{ scale: 1.15 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />

              {/* Number overlay */}
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
                  {service.number}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`lg:w-1/2 h-full ${isEven ? "lg:order-2" : "lg:order-1"}`}
          >
            {/* Title */}
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
              {service.title}
            </motion.h3>

            {/* Description */}
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
              {service.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-3 h-[2px] bg-[#2BCC07] mt-2 flex-shrink-0" />
                    <span
                      className="text-white/50"
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 300,
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
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
                {t.sales.requestQuote}
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

// ─────────────────────────────────────────────
// Dynamic section: renders a slice of services
// ─────────────────────────────────────────────
interface ServicesSectionProps {
  saleData: any;
  /** 0-based start index (inclusive) */
  from: number;
  /** 0-based end index (exclusive). Omit to render till end. */
  to?: number;
}

export const SalesServicesSection = ({
  saleData,
  from,
  to,
}: ServicesSectionProps) => {
  const services = useNormalizedServices(saleData);
  const slice = services.slice(from, to);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-10 mb-20 lg:mb-0">
      {slice.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────
export const SalesServicesHeader = ({ saleData }: { saleData: any }) => {
  const { language } = useTranslation();

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
            {saleData?.servicesHeader?.label?.[language]}
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
          {saleData?.servicesHeader?.title?.[language]}
        </h2>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Helper hook exposed for the page to know
// how many slides to generate
// ─────────────────────────────────────────────
export function useServicesSlides(saleData: any, itemsPerSlide = 2) {
  const { language } = useTranslation();
  const rawList: RawService[] = saleData?.servicesList ?? [];
  const total = rawList.length;
  const slideCount = Math.ceil(total / itemsPerSlide);

  return Array.from({ length: slideCount }, (_, i) => ({
    from: i * itemsPerSlide,
    to: Math.min((i + 1) * itemsPerSlide, total),
  }));
}