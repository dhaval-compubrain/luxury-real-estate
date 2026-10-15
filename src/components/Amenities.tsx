import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function Amenities() {
  const { amenities } = siteContent;
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % amenities.length);
  const prev = () => setActiveIndex((i) => (i - 1 + amenities.length) % amenities.length);

  return (
    <section id="amenities" className="relative bg-charcoal py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            label="Lifestyle"
            title="World-Class\nAmenities"
            subtitle="Every amenity is thoughtfully curated to enhance your daily life, offering resort-style experiences right at your doorstep."
            light
          />

          {/* Navigation */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-12 h-12 flex items-center justify-center border border-white/10 text-ivory hover:border-gold/50 hover:text-gold transition-all duration-300"
                aria-label="Previous amenity"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs tracking-[0.15em] text-stone-light font-mono">
                {String(activeIndex + 1).padStart(2, '0')} / {String(amenities.length).padStart(2, '0')}
              </span>
              <button
                onClick={next}
                className="w-12 h-12 flex items-center justify-center border border-white/10 text-ivory hover:border-gold/50 hover:text-gold transition-all duration-300"
                aria-label="Next amenity"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Main showcase */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={amenities[activeIndex].image}
                alt={amenities[activeIndex].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-ivory tracking-tight">
                  {amenities[activeIndex].title}
                </h3>
                <p className="mt-4 text-stone-light/80 text-base sm:text-lg leading-relaxed">
                  {amenities[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {amenities.map((amenity, i) => (
                <button
                  key={amenity.title}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 overflow-hidden border-2 transition-all duration-300 ${
                    i === activeIndex ? 'border-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}