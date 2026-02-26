"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { api } from "@/lib/api";

export function ContactFormSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    countryCode: "+46",
    phone: "",
    message: "",
    agreeToPrivacy: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      await api.submitContact({
        company: formData.company,
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: formData.phone,
        message: formData.message,
      });
      setStatus("success");
      setFormData({
        company: "",
        name: "",
        email: "",
        countryCode: "+46",
        phone: "",
        message: "",
        agreeToPrivacy: false,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.labels.email,
      value: "info@imvision.se",
      link: "mailto:info@imvision.se",
    },
    {
      icon: Mail,
      label: t.contact.labels.support,
      value: "service@imvision.se",
      link: "mailto:service@imvision.se",
    },
    {
      icon: Phone,
      label: t.contact.labels.phone,
      value: "+46 10 330 46 36",
      link: "tel:+46103304636",
    },
  ];

  // const locations = [
  //   {
  //     title: "Jönköping HQ",
  //     address: "Herkulesvägen 56",
  //     postalCode: "553 02 Jönköping",
  //   },
  //   {
  //     title: "Jönköping Support & Service",
  //     address: "Vitmossevägen 1",
  //     postalCode: "554 75 Jönköping",
  //   },
  //   {
  //     title: "Stockholm Sales Office",
  //     address: "Skeppargatan 11",
  //     postalCode: "114 52 Stockholm",
  //   },
  //   {
  //     title: "Stockholm - Rental & Support",
  //     address: "Svarvarvägen 20",
  //     postalCode: "132 38 Saltsjö-boo",
  //   },
  // ];

  return (
    <div className="relative bg-black py-24 lg:py-32">
      {/* Green border */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2BCC07]" /> */}

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-white mb-8"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {t.contact.formTitleLine1}
              <br />
              <span style={{ color: "#2BCC07" }}>{t.contact.formTitleLine2}</span>
            </h2>

            <p
              className="text-white/70 mb-12"
              style={{
                fontSize: "1.125rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              {t.contact.formDescription}
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-[#2BCC07]/10 border border-[#2BCC07]/30 group-hover:bg-[#2BCC07]/20 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-[#2BCC07]" />
                  </div>
                  <div>
                    <p
                      className="text-white/50 mb-1"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-white hover:text-[#2BCC07] transition-colors duration-300"
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 300,
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className="text-white"
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 300,
                        }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "success" && (
                <p className="text-[#2BCC07]" style={{ fontSize: "0.95rem" }}>
                  Thank you. Your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400" style={{ fontSize: "0.95rem" }}>
                  {errorMessage}
                </p>
              )}
              {/* Company Name */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-white/70 mb-2"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.contact.companyPlaceholder} *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#2BCC07] outline-none transition-colors duration-300 pb-3 text-white"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                  }}
                />
              </div>

              {/* Your Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-white/70 mb-2"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.contact.namePlaceholder} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#2BCC07] outline-none transition-colors duration-300 pb-3 text-white"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                  }}
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white/70 mb-2"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.contact.emailPlaceholder} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#2BCC07] outline-none transition-colors duration-300 pb-3 text-white"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                  }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white/70 mb-2"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.contact.phonePlaceholder} *
                </label>
                <div className="flex gap-2">
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    required
                    className="bg-black border-b-2 border-white/20 focus:border-[#2BCC07] outline-none transition-colors duration-300 pb-3 text-white pr-2"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 300,
                    }}
                  >
                    <option value="+93" className="bg-black text-white">
                      +93
                    </option>
                    <option value="+355" className="bg-black text-white">
                      +355
                    </option>
                    <option value="+213" className="bg-black text-white">
                      +213
                    </option>
                    <option value="+376" className="bg-black text-white">
                      +376
                    </option>
                    <option value="+244" className="bg-black text-white">
                      +244
                    </option>
                    <option value="+54" className="bg-black text-white">
                      +54
                    </option>
                    <option value="+374" className="bg-black text-white">
                      +374
                    </option>
                    <option value="+61" className="bg-black text-white">
                      +61
                    </option>
                    <option value="+43" className="bg-black text-white">
                      +43
                    </option>
                    <option value="+994" className="bg-black text-white">
                      +994
                    </option>
                    <option value="+973" className="bg-black text-white">
                      +973
                    </option>
                    <option value="+880" className="bg-black text-white">
                      +880
                    </option>
                    <option value="+375" className="bg-black text-white">
                      +375
                    </option>
                    <option value="+32" className="bg-black text-white">
                      +32
                    </option>
                    <option value="+501" className="bg-black text-white">
                      +501
                    </option>
                    <option value="+229" className="bg-black text-white">
                      +229
                    </option>
                    <option value="+975" className="bg-black text-white">
                      +975
                    </option>
                    <option value="+591" className="bg-black text-white">
                      +591
                    </option>
                    <option value="+387" className="bg-black text-white">
                      +387
                    </option>
                    <option value="+267" className="bg-black text-white">
                      +267
                    </option>
                    <option value="+55" className="bg-black text-white">
                      +55
                    </option>
                    <option value="+673" className="bg-black text-white">
                      +673
                    </option>
                    <option value="+359" className="bg-black text-white">
                      +359
                    </option>
                    <option value="+226" className="bg-black text-white">
                      +226
                    </option>
                    <option value="+257" className="bg-black text-white">
                      +257
                    </option>
                    <option value="+855" className="bg-black text-white">
                      +855
                    </option>
                    <option value="+237" className="bg-black text-white">
                      +237
                    </option>
                    <option value="+1" className="bg-black text-white">
                      +1
                    </option>
                    <option value="+238" className="bg-black text-white">
                      +238
                    </option>
                    <option value="+236" className="bg-black text-white">
                      +236
                    </option>
                    <option value="+235" className="bg-black text-white">
                      +235
                    </option>
                    <option value="+56" className="bg-black text-white">
                      +56
                    </option>
                    <option value="+86" className="bg-black text-white">
                      +86
                    </option>
                    <option value="+57" className="bg-black text-white">
                      +57
                    </option>
                    <option value="+269" className="bg-black text-white">
                      +269
                    </option>
                    <option value="+242" className="bg-black text-white">
                      +242
                    </option>
                    <option value="+506" className="bg-black text-white">
                      +506
                    </option>
                    <option value="+385" className="bg-black text-white">
                      +385
                    </option>
                    <option value="+53" className="bg-black text-white">
                      +53
                    </option>
                    <option value="+357" className="bg-black text-white">
                      +357
                    </option>
                    <option value="+420" className="bg-black text-white">
                      +420
                    </option>
                    <option value="+45" className="bg-black text-white">
                      +45
                    </option>
                    <option value="+253" className="bg-black text-white">
                      +253
                    </option>
                    <option value="+593" className="bg-black text-white">
                      +593
                    </option>
                    <option value="+20" className="bg-black text-white">
                      +20
                    </option>
                    <option value="+503" className="bg-black text-white">
                      +503
                    </option>
                    <option value="+240" className="bg-black text-white">
                      +240
                    </option>
                    <option value="+291" className="bg-black text-white">
                      +291
                    </option>
                    <option value="+372" className="bg-black text-white">
                      +372
                    </option>
                    <option value="+251" className="bg-black text-white">
                      +251
                    </option>
                    <option value="+679" className="bg-black text-white">
                      +679
                    </option>
                    <option value="+358" className="bg-black text-white">
                      +358
                    </option>
                    <option value="+33" className="bg-black text-white">
                      +33
                    </option>
                    <option value="+241" className="bg-black text-white">
                      +241
                    </option>
                    <option value="+220" className="bg-black text-white">
                      +220
                    </option>
                    <option value="+995" className="bg-black text-white">
                      +995
                    </option>
                    <option value="+49" className="bg-black text-white">
                      +49
                    </option>
                    <option value="+233" className="bg-black text-white">
                      +233
                    </option>
                    <option value="+30" className="bg-black text-white">
                      +30
                    </option>
                    <option value="+299" className="bg-black text-white">
                      +299
                    </option>
                    <option value="+502" className="bg-black text-white">
                      +502
                    </option>
                    <option value="+224" className="bg-black text-white">
                      +224
                    </option>
                    <option value="+245" className="bg-black text-white">
                      +245
                    </option>
                    <option value="+592" className="bg-black text-white">
                      +592
                    </option>
                    <option value="+509" className="bg-black text-white">
                      +509
                    </option>
                    <option value="+504" className="bg-black text-white">
                      +504
                    </option>
                    <option value="+852" className="bg-black text-white">
                      +852
                    </option>
                    <option value="+36" className="bg-black text-white">
                      +36
                    </option>
                    <option value="+354" className="bg-black text-white">
                      +354
                    </option>
                    <option value="+91" className="bg-black text-white">
                      +91
                    </option>
                    <option value="+62" className="bg-black text-white">
                      +62
                    </option>
                    <option value="+98" className="bg-black text-white">
                      +98
                    </option>
                    <option value="+964" className="bg-black text-white">
                      +964
                    </option>
                    <option value="+353" className="bg-black text-white">
                      +353
                    </option>
                    <option value="+972" className="bg-black text-white">
                      +972
                    </option>
                    <option value="+39" className="bg-black text-white">
                      +39
                    </option>
                    <option value="+81" className="bg-black text-white">
                      +81
                    </option>
                    <option value="+962" className="bg-black text-white">
                      +962
                    </option>
                    <option value="+7" className="bg-black text-white">
                      +7
                    </option>
                    <option value="+254" className="bg-black text-white">
                      +254
                    </option>
                    <option value="+965" className="bg-black text-white">
                      +965
                    </option>
                    <option value="+996" className="bg-black text-white">
                      +996
                    </option>
                    <option value="+856" className="bg-black text-white">
                      +856
                    </option>
                    <option value="+371" className="bg-black text-white">
                      +371
                    </option>
                    <option value="+961" className="bg-black text-white">
                      +961
                    </option>
                    <option value="+266" className="bg-black text-white">
                      +266
                    </option>
                    <option value="+231" className="bg-black text-white">
                      +231
                    </option>
                    <option value="+218" className="bg-black text-white">
                      +218
                    </option>
                    <option value="+423" className="bg-black text-white">
                      +423
                    </option>
                    <option value="+370" className="bg-black text-white">
                      +370
                    </option>
                    <option value="+352" className="bg-black text-white">
                      +352
                    </option>
                    <option value="+261" className="bg-black text-white">
                      +261
                    </option>
                    <option value="+265" className="bg-black text-white">
                      +265
                    </option>
                    <option value="+60" className="bg-black text-white">
                      +60
                    </option>
                    <option value="+960" className="bg-black text-white">
                      +960
                    </option>
                    <option value="+223" className="bg-black text-white">
                      +223
                    </option>
                    <option value="+356" className="bg-black text-white">
                      +356
                    </option>
                    <option value="+222" className="bg-black text-white">
                      +222
                    </option>
                    <option value="+230" className="bg-black text-white">
                      +230
                    </option>
                    <option value="+52" className="bg-black text-white">
                      +52
                    </option>
                    <option value="+373" className="bg-black text-white">
                      +373
                    </option>
                    <option value="+377" className="bg-black text-white">
                      +377
                    </option>
                    <option value="+976" className="bg-black text-white">
                      +976
                    </option>
                    <option value="+382" className="bg-black text-white">
                      +382
                    </option>
                    <option value="+212" className="bg-black text-white">
                      +212
                    </option>
                    <option value="+258" className="bg-black text-white">
                      +258
                    </option>
                    <option value="+95" className="bg-black text-white">
                      +95
                    </option>
                    <option value="+264" className="bg-black text-white">
                      +264
                    </option>
                    <option value="+977" className="bg-black text-white">
                      +977
                    </option>
                    <option value="+31" className="bg-black text-white">
                      +31
                    </option>
                    <option value="+64" className="bg-black text-white">
                      +64
                    </option>
                    <option value="+505" className="bg-black text-white">
                      +505
                    </option>
                    <option value="+227" className="bg-black text-white">
                      +227
                    </option>
                    <option value="+234" className="bg-black text-white">
                      +234
                    </option>
                    <option value="+850" className="bg-black text-white">
                      +850
                    </option>
                    <option value="+389" className="bg-black text-white">
                      +389
                    </option>
                    <option value="+47" className="bg-black text-white">
                      +47
                    </option>
                    <option value="+968" className="bg-black text-white">
                      +968
                    </option>
                    <option value="+92" className="bg-black text-white">
                      +92
                    </option>
                    <option value="+970" className="bg-black text-white">
                      +970
                    </option>
                    <option value="+507" className="bg-black text-white">
                      +507
                    </option>
                    <option value="+675" className="bg-black text-white">
                      +675
                    </option>
                    <option value="+595" className="bg-black text-white">
                      +595
                    </option>
                    <option value="+51" className="bg-black text-white">
                      +51
                    </option>
                    <option value="+63" className="bg-black text-white">
                      +63
                    </option>
                    <option value="+48" className="bg-black text-white">
                      +48
                    </option>
                    <option value="+351" className="bg-black text-white">
                      +351
                    </option>
                    <option value="+974" className="bg-black text-white">
                      +974
                    </option>
                    <option value="+40" className="bg-black text-white">
                      +40
                    </option>
                    <option value="+250" className="bg-black text-white">
                      +250
                    </option>
                    <option value="+966" className="bg-black text-white">
                      +966
                    </option>
                    <option value="+221" className="bg-black text-white">
                      +221
                    </option>
                    <option value="+381" className="bg-black text-white">
                      +381
                    </option>
                    <option value="+248" className="bg-black text-white">
                      +248
                    </option>
                    <option value="+232" className="bg-black text-white">
                      +232
                    </option>
                    <option value="+65" className="bg-black text-white">
                      +65
                    </option>
                    <option value="+421" className="bg-black text-white">
                      +421
                    </option>
                    <option value="+386" className="bg-black text-white">
                      +386
                    </option>
                    <option value="+677" className="bg-black text-white">
                      +677
                    </option>
                    <option value="+252" className="bg-black text-white">
                      +252
                    </option>
                    <option value="+27" className="bg-black text-white">
                      +27
                    </option>
                    <option value="+82" className="bg-black text-white">
                      +82
                    </option>
                    <option value="+211" className="bg-black text-white">
                      +211
                    </option>
                    <option value="+34" className="bg-black text-white">
                      +34
                    </option>
                    <option value="+94" className="bg-black text-white">
                      +94
                    </option>
                    <option value="+249" className="bg-black text-white">
                      +249
                    </option>
                    <option value="+597" className="bg-black text-white">
                      +597
                    </option>
                    <option value="+46" className="bg-black text-white">
                      +46
                    </option>
                    <option value="+41" className="bg-black text-white">
                      +41
                    </option>
                    <option value="+963" className="bg-black text-white">
                      +963
                    </option>
                    <option value="+886" className="bg-black text-white">
                      +886
                    </option>
                    <option value="+992" className="bg-black text-white">
                      +992
                    </option>
                    <option value="+255" className="bg-black text-white">
                      +255
                    </option>
                    <option value="+66" className="bg-black text-white">
                      +66
                    </option>
                    <option value="+228" className="bg-black text-white">
                      +228
                    </option>
                    <option value="+676" className="bg-black text-white">
                      +676
                    </option>
                    <option value="+216" className="bg-black text-white">
                      +216
                    </option>
                    <option value="+90" className="bg-black text-white">
                      +90
                    </option>
                    <option value="+993" className="bg-black text-white">
                      +993
                    </option>
                    <option value="+256" className="bg-black text-white">
                      +256
                    </option>
                    <option value="+380" className="bg-black text-white">
                      +380
                    </option>
                    <option value="+971" className="bg-black text-white">
                      +971
                    </option>
                    <option value="+44" className="bg-black text-white">
                      +44
                    </option>
                    <option value="+598" className="bg-black text-white">
                      +598
                    </option>
                    <option value="+998" className="bg-black text-white">
                      +998
                    </option>
                    <option value="+678" className="bg-black text-white">
                      +678
                    </option>
                    <option value="+58" className="bg-black text-white">
                      +58
                    </option>
                    <option value="+84" className="bg-black text-white">
                      +84
                    </option>
                    <option value="+967" className="bg-black text-white">
                      +967
                    </option>
                    <option value="+260" className="bg-black text-white">
                      +260
                    </option>
                    <option value="+263" className="bg-black text-white">
                      +263
                    </option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10 330 46 36"
                    className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-[#2BCC07] outline-none transition-colors duration-300 pb-3 text-white"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 300,
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-white/70 mb-2"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.contact.messageLabel} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#2BCC07] outline-none transition-colors duration-300 pb-3 text-white resize-none"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                  }}
                />
              </div>

              {/* Privacy Agreement Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agreeToPrivacy"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 accent-[#2BCC07] border-white/20"
                />
                <label
                  htmlFor="agreeToPrivacy"
                  className="text-white/60 cursor-pointer"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  By submitting this form, you agree to your data being stored.
                  Of course, we will not keep them longer than necessary and
                  will treat them with care and confidentiality.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={status === "loading" ? undefined : { scale: 1.02 }}
                  whileTap={status === "loading" ? undefined : { scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-black/40 backdrop-blur-sm overflow-hidden"
                  style={{
                    border: "2px solid rgba(43, 204, 7, 0.3)",
                    boxShadow:
                      "0 0 20px rgba(43, 204, 7, 0.1), inset 0 0 20px rgba(43, 204, 7, 0.05)",
                  }}
                >
                  {/* Animated glowing trail */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(43, 204, 7, 0.3), transparent)",
                      width: "30%",
                    }}
                    animate={{
                      x: ["-100%", "400%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 3,
                    }}
                  >
                    <Mail
                      size={20}
                      className="text-[#2BCC07]"
                      strokeWidth={2}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(43, 204, 7, 0.5))",
                      }}
                    />
                  </motion.div>

                  {/* Text */}
                  <span
                    className="relative z-10 text-[#2BCC07] tracking-[0.15em] font-light italic"
                    style={{
                      fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                      textShadow: "0 0 10px rgba(43, 204, 7, 0.3)",
                    }}
                  >
                    {t.contact.sendButton}
                  </span>

                  {/* Pulsing glow on hover */}
                  <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      boxShadow:
                        "0 0 40px rgba(43, 204, 7, 0.3), inset 0 0 40px rgba(43, 204, 7, 0.1)",
                    }}
                  />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
