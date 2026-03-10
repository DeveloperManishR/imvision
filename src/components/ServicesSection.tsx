"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { handleImage } from "@/lib/config";

export interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Design & Engineering",
    description:
      "Once we understand your needs and goals, we start creating your LED screen solution. This is where smart design and reliable technology come together. Our experts explore how your ideas can come to life and begin planning the setup, selecting the best combination of hardware and software to match your vision. What you want to achieve—and where the LED screen will be placed—along with your budget and preferences, guide us in choosing the ideal setup. This could include screens, audio systems, or smart sensors. No matter what, we always focus on high quality, sustainability, and energy efficiency. We act as your independent advisor and engineering partner, making sure you get the most value from your investment.",
    features: [
      "Smart design & technology integration",
      "Hardware & software selection",
      "Focus on sustainability & efficiency",
      "Independent advisor & partner",
    ],
    image:
      "https://images.unsplash.com/photo-1761618291331-535983ae4296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGRlc2lnbiUyMExFRCUyMHRlY2hub2xvZ3klMjBwbGFubmluZ3xlbnwxfHx8fDE3NzA2MzExMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    number: "02",
    title: "Installation and Roll-out",
    description:
      "Our services and proven methods are designed to plan, install, and roll out LED screens in a smart, sustainable, and efficient way. We combine in-house installation experts with a global network of skilled and flexible engineers. With smart pre-production in our central warehouse and custom-built support apps, we ensure high-quality and consistent installations. Careful planning is key to a successful roll-out, which is why we give this phase our full attention—not only to make sure technicians are fully prepared and equipped, but also to reduce disruption to your operations. Using our in-house Smart Deployment methodology, we pre-assemble key components at our warehouse and deliver them ready to go, with minimal packaging and on-site work. This way, your LED screen installation is completed with maximum efficiency and long-term reliability.",
    features: [
      "Smart pre-production & assembly",
      "Global network of skilled engineers",
      "Minimal disruption to operations",
      "Smart Deployment methodology",
    ],
    image:
      "https://images.unsplash.com/photo-1719050817004-c76eb7c75c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBMRUQlMjBpbnN0YWxsYXRpb24lMjB3YXJlaG91c2UlMjB0ZWNobmljaWFufGVufDF8fHx8MTc3MDYzMTAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    number: "03",
    title: "Smart Service & Support",
    description:
      "We make sure your LED screen always works when it should. With smart remote monitoring from our team, we can find and fix problems before they become a bigger issue. Our friendly, multilingual support team is ready to help—online or on-site—so you never have to worry. When LED screens are part of your daily business, they need to work all the time. That's why we use smart tools and experienced technicians to keep everything running smoothly. If a screen goes offline, shows the wrong content, or has an error, we can quickly take care of it—even if your local staff don't know how. With skilled people and the right technology, we give you reliable, high-quality support that keeps your screen solution performing every day.",
    features: [
      "Smart remote monitoring",
      "Multilingual support team",
      "Proactive problem detection",
      "24/7 reliability assurance",
    ],
    image:
      "https://images.unsplash.com/photo-1728917330520-9456e3f49529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjBtb25pdG9yaW5nJTIwY29udHJvbCUyMHJvb20lMjB0ZWNobm9sb2d5fGVufDF8fHwxNzcwNjMxMDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    number: "04",
    title: "Smart Deployment with Resources Manager",
    description:
      "At IM Vision, we use our own software—Resources Manager—to manage every step of your LED screen project. From the first quote to production, installation, support, and spare parts during the full SLA period, everything is tracked in one smart platform. This gives us full control—and makes us unique. We even give you, the customer, access to follow the entire installed base. This makes it easy to monitor your solution and handle support cases smoothly. With our Smart Deployment method, your local installers or interior designers can do the final setup step-by-step on site. This saves time and reduces travel. Of course, our team is always ready to support remotely if needed. As soon as the solution goes online, Resources Manager receives a signal and starts monitoring right away. Already have an LED screen from another supplier? No problem. We can take over existing installations and connect them to our Resources Manager platform—so you get access to our smart monitoring, support, and service solutions going forward.",
    features: [
      "End-to-end project tracking",
      "Customer access to installed base",
      "Remote setup support",
      "Compatible with existing installations",
    ],
    image:
      "https://images.unsplash.com/photo-1768483538267-fce52de424d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMG1hbmFnZW1lbnQlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5fGVufDF8fHwxNzcwNjMxMDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    number: "05",
    title: "LED Configurator",
    description:
      "Once the concept and strategy for your challenge have been formed, we embark on building a digital signage solution. This is where solutions design and integration come together. During the creative strategy process, our solutions architects analyze how the ideas can be realized and then get to work on pre-engineering. Next, we determine the best combination of hardware and software.",
    features: [
      "Solutions design & integration",
      "Creative strategy analysis",
      "Pre-engineering optimization",
      "Hardware & software selection",
    ],
    image:
      "https://images.unsplash.com/photo-1690964099658-b619682704ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2lnbmFnZSUyMExFRCUyMGNvbmZpZ3VyYXRvciUyMHNjcmVlbnxlbnwxfHx8fDE3NzA2MzEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

function ServiceSectionItem({
  service,
  index,
  language
}: {
  service: Service;
  index: number;
  language:string
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const isEven = index % 2 === 0;

  console.log("serviceservice",service)

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="container mx-auto px-6 lg:px-24 h-full overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`md:w-1/2 relative ${isEven ? "md:order-1" : "md:order-2"}`}
          >
            <div className="relative overflow-hidden max-h-[140px] md:max-h-[200px] lg:max-h-[320px]">
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
                  {index+1}
                </motion.p>
              </div>
            </div>
          </motion.div>

          
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
              {service.title?.[language]}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/70 mb-6 xl:hidden"
              style={{
                fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {/* {service.description.slice(0, 350)}... */}
             {service?.description?.[language]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/70 mb-6 hidden xl:block"
              style={{
                fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {/* {service.description.slice(0, 700)} */}
              {service?.description?.[language]}
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

export function ServicesSectionHeader({ serviceData }) {
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
            {serviceData?.highlightParagraphTwoTitle?.[language]}
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

export function ServicesSection1({serviceData,language}) {
  return (
    <div className="h-full flex flex-col items-center justify-center md:gap-10 gap-6">
      {serviceData?.services&&serviceData?.services.length>0&&serviceData?.services.map((service, index) => (
        <ServiceSectionItem key={service.id} service={service} index={index} language={language} />
      ))}
    </div>
  );
}

export function ServicesSection2() {
  return (
    <div className=" lg:max-h-[90vh] h-full flex flex-col items-center justify-center gap-10">
      {services.slice(2, 4).map((service, index) => (
        <ServiceSectionItem
          key={service.id}
          service={service}
          index={index + 2}
        />
      ))}
    </div>
  );
}

export function ServicesSection3() {
  return (
    <div className="lg:max-h-[90vh] h-full flex flex-col items-center justify-center gap-10 mb-20 lg:mb-0">
      {services.slice(4, 5).map((service, index) => (
        <ServiceSectionItem
          key={service.id}
          service={service}
          index={index + 4}
        />
      ))}
    </div>
  );
}
