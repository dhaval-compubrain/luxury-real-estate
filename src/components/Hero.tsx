import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface HeroProps {
  onExploreProjects: () => void;
  onDownloadBrochure: () => void;
}

export default function Hero({ onExploreProjects, onDownloadBrochure }: HeroProps) {
  const { hero } = siteContent;

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src="/images/hero.jpg"
          alt="Aurea Estates luxury tower"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-charcoal/30" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-24 sm:pb-32 lg:pb-28 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Gold accent line */}
        <motion.div
          className="w-12 h-px bg-gold mb-8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* Location badge */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-gold font-medium">
            {hero.location}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium text-ivory leading-[1.08] tracking-tight max-w-5xl whitespace-pre-line text-shadow-hero"
        >
          {hero.headline.split('\n').map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2 + (lineIndex * 4 + wordIndex) * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-stone-light/90 text-base sm:text-lg max-w-xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <button
            onClick={onExploreProjects}
            className="btn-shine group flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-all duration-400"
          >
            {hero.cta}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={onDownloadBrochure}
            className="btn-shine group flex items-center gap-3 px-8 py-4 border border-ivory/20 text-ivory text-xs tracking-[0.2em] uppercase font-medium hover:border-gold/50 hover:text-gold transition-all duration-400"
          >
            <Download size={16} />
            {hero.secondaryCta}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-light/50">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gold/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>

      {/* Side text (desktop) */}
      <motion.div
        className="hidden lg:block absolute right-10 bottom-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="flex items-center gap-4 -rotate-90 origin-bottom-right translate-x-8">
          <div className="w-8 h-px bg-gold/30" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-light/40 whitespace-nowrap">
            Scroll to Explore
          </span>
        </div>
      </motion.div>
    </section>
  );
}