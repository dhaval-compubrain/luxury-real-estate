import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function Gallery() {
  const { gallery } = siteContent;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-charcoal py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          label="Portfolio"
          title="Architectural\nGallery"
          subtitle="A curated collection of architectural details, interiors, and spaces that define the Aurea Estates experience."
          light
        />

        {/* Masonry grid */}
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6">
          {gallery.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06} direction={i % 2 === 0 ? 'up' : 'left'}>
              <motion.div
                className="relative mb-4 lg:mb-6 overflow-hidden cursor-pointer group break-inside-avoid"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-sm text-ivory font-medium">{item.title}</span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-lg"
              onClick={() => setLightboxIndex(null)}
            />

            <motion.div
              className="relative max-w-5xl max-h-[85vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={gallery[lightboxIndex].image}
                alt={gallery[lightboxIndex].title}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-sm text-stone-light font-medium">{gallery[lightboxIndex].title}</span>
              </div>
            </motion.div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-white/20 text-ivory hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            <button
              onClick={() => setLightboxIndex((i) => i !== null ? (i - 1 + gallery.length) % gallery.length : 0)}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-ivory hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => setLightboxIndex((i) => i !== null ? (i + 1) % gallery.length : 0)}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-ivory hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Next image"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}