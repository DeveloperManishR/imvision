"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useTranslation } from '@/hooks/useTranslation';
import { api } from '@/lib/api';

interface FormData {
  contactName: string;
  companyName: string;
  email: string;
  subject: string;
  phone: string;
  description: string;
  file: File | null;
}

export function SupportPageDark() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    companyName: '',
    email: '',
    subject: '',
    phone: '',
    description: '',
    file: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const form = new FormData();
    form.append("contactName", formData.contactName);
    form.append("companyName", formData.companyName);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("phone", formData.phone);
    form.append("description", formData.description);
    if (formData.file) form.append("files", formData.file);
    try {
      await api.submitSupport(form);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          contactName: '',
          companyName: '',
          email: '',
          subject: '',
          phone: '',
          description: '',
          file: null,
        });
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit ticket");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc3VwcG9ydCUyMGNlbnRlcnxlbnwxfHx8fDE3NzAwMzg4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="LED Display Support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="text-white text-center"
            style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {t.support.hero.title}
          </motion.h1>
        </div>
      </section>

      {/* Main Content Section */}
      <motion.section
        animate={isSubmitted ? { y: -100 } : { y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="relative w-full min-h-[60vh] flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="text-white mb-12 max-w-3xl mx-auto"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 500,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}
          >
            {t.support.hero.description}
          </motion.h2>
        </div>
      </motion.section>

      {/* Form Section */}
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <CheckCircle size={80} className="text-[#2BCC07] mb-6" strokeWidth={1.5} />
            <h3
              className="text-white mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
              }}
            >
              Ticket Submitted Successfully
            </h3>
            <p
              className="text-white/70"
              style={{
                fontSize: '1.1rem',
                fontWeight: 300,
              }}
            >
              Our support team will get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto px-6 pb-20"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 md:p-12 backdrop-blur-sm">
              <h3
                className="text-white mb-3"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 300,
                }}
              >
                {t.support.ticket.title}
              </h3>

              <p
                className="text-white/60 mb-10"
                style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                {t.support.ticket.description}
              </p>

              {submitError && (
                <p className="text-red-400 mb-4" style={{ fontSize: '0.95rem' }}>
                  {submitError}
                </p>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Contact Name */}
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Contact Name <span className="text-[#2BCC07]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      placeholder="Contact Name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2BCC07] transition-colors"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Email <span className="text-[#2BCC07]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2BCC07] transition-colors"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Company Name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2BCC07] transition-colors"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone (Optional)"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2BCC07] transition-colors"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Subject <span className="text-[#2BCC07]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Subject"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2BCC07] transition-colors"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Description <span className="text-[#2BCC07]">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Please describe your issue in detail..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#2BCC07] transition-colors resize-none"
                      style={{ fontSize: '0.95rem', lineHeight: 1.6 }}
                    />
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Attachments */}
                  <div>
                    <label
                      htmlFor="file"
                      className="block text-white/80 mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: 300 }}
                    >
                      Select File (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white file:text-black file:cursor-pointer hover:file:bg-white/90 file:transition-colors focus:outline-none focus:border-white transition-colors"
                        style={{ fontSize: '0.95rem' }}
                      />
                      {formData.file && (
                        <p className="text-white/60 mt-2" style={{ fontSize: '0.85rem' }}>
                          Selected: {formData.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-center gap-4 pt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white text-black border-2 border-white hover:bg-white/90 transition-colors min-w-[140px]"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                    }}
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Team Section */}
      <section className="relative w-full py-32 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2
              className="text-white mb-4"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Meet Our <span style={{ fontWeight: 500 }}>Support Team</span>
            </h2>
            <p
              className="text-white/60 max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Our dedicated specialists are here to ensure your LED solutions perform flawlessly
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Erik Johansson',
                title: 'Technical Support Lead',
                phone: '+46 70 123 45 67',
                email: 'erik.johansson@imvision.se',
                image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDU4MTU1NHww&ixlib=rb-4.1.0&q=80&w=1080',
              },
              {
                name: 'Anna Lindberg',
                title: 'Customer Success Manager',
                phone: '+46 70 234 56 78',
                email: 'anna.lindberg@imvision.se',
                image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwNTY1ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
              },
              {
                name: 'Marcus Berg',
                title: 'LED Systems Specialist',
                phone: '+46 70 345 67 89',
                email: 'marcus.berg@imvision.se',
                image: 'https://images.unsplash.com/photo-1768633647910-7e6fb53e5b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNoJTIwc3VwcG9ydCUyMHNwZWNpYWxpc3R8ZW58MXx8fHwxNzcwNjI4NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
              },
              {
                name: 'Sofia Andersson',
                title: 'Field Service Engineer',
                phone: '+46 70 456 78 90',
                email: 'sofia.andersson@imvision.se',
                image: 'https://images.unsplash.com/photo-1747811854184-95f49a6d024d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDYyODc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
              },
            ].map((member, index) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Contact Icons - Appear on Hover */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <a
                        href={`tel:${member.phone}`}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <Phone size={20} strokeWidth={2} />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <Mail size={20} strokeWidth={2} />
                      </a>
                    </motion.div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    <h3
                      className="text-white mb-1"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-[#2BCC07] mb-4"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 300,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {member.title}
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group/link"
                      >
                        <Phone size={14} strokeWidth={2} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 300 }}>
                          {member.phone}
                        </span>
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group/link"
                      >
                        <Mail size={14} strokeWidth={2} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 300 }}>
                          {member.email}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}