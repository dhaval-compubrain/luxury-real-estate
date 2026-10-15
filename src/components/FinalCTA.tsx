import { motion } from 'framer-motion';
import { ArrowRight, Download, Calendar, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FinalCTAProps {
  onExploreProjects: () => void;
  onDownloadBrochure: () => void;
  onEnquiry: () => void;
}

export default function FinalCTA({ onExploreProjects, onDownloadBrochure, onEnquiry }: FinalCTAProps) {
  return (
    <section className="relative py-32 sm:py-40 lg:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&h=900&fit=crop&q=80"
          alt="Premium architectural detail"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 lg:px-10">
        {/* Decorative */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold/40" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold">Begin Your Journey</span>
            <div className="w-12 h-px bg-gold/40" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-ivory leading-[1.1] tracking-tight text-shadow-hero">
            Let&apos;s Build Something{' '}
            <span className="italic text-gold">Extraordinary</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-stone-light/70 text-base sm:text-lg max-w-xl leading-relaxed">
            Whether you&apos;re seeking a new home, an investment, or a commercial space — 
            our team is ready to make your vision a reality.
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <motion.button
              onClick={onExploreProjects}
              className="btn-shine group flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={onEnquiry}
              className="btn-shine group flex items-center gap-3 px-8 py-4 border border-ivory/20 text-ivory text-xs tracking-[0.2em] uppercase font-medium hover:border-gold/50 hover:text-gold transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar size={16} />
              Schedule a Site Visit
            </motion.button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={onEnquiry}
              className="flex items-center gap-2 text-sm text-stone-light/60 hover:text-gold transition-colors"
            >
              <Phone size={14} />
              Request a Callback
            </button>
            <span className="text-stone/30">|</span>
            <button
              onClick={onDownloadBrochure}
              className="flex items-center gap-2 text-sm text-stone-light/60 hover:text-gold transition-colors"
            >
              <Download size={14} />
              Download Brochure
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}