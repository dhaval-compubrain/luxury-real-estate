import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
  const { testimonials } = siteContent;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[activeIndex];

  return (
    <section className="relative bg-ivory py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(23,25,22,0.4) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center">
          <SectionHeading
            label="Testimonials"
            title="What Our Residents\nSay"
            align="center"
          />
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote icon */}
                <div className="flex justify-center mb-8">
                  <Quote size={40} className="text-gold/30" />
                </div>

                {/* Quote text */}
                <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-charcoal leading-relaxed italic tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-charcoal tracking-wide">{current.name}</div>
                    <div className="text-sm text-stone-dark mt-0.5">{current.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                onClick={() => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="p-2 text-stone hover:text-charcoal transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-8 h-1 bg-gold'
                        : 'w-3 h-1 bg-stone/30 hover:bg-stone/50'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveIndex((i) => (i + 1) % testimonials.length)}
                className="p-2 text-stone hover:text-charcoal transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}