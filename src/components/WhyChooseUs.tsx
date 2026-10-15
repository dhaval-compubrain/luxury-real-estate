import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function WhyChooseUs() {
  const { whyChooseUs } = siteContent;

  return (
    <section className="relative bg-ivory py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          label="Why Aurea"
          title="Signature\nArchitecture"
          subtitle="Every decision we make is guided by our pursuit of creating spaces that inspire, endure, and enrich the lives of those who inhabit them."
        />

        <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {whyChooseUs.map((item, i) => (
            <ScrollReveal key={item.number} delay={i * 0.1}>
              <motion.div
                className="group relative"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Number */}
                <div className="font-display text-6xl sm:text-7xl font-medium text-gold/10 leading-none mb-4 group-hover:text-gold/20 transition-colors duration-500">
                  {item.number}
                </div>

                {/* Gold line */}
                <div className="w-8 h-px bg-gold mb-4 group-hover:w-16 transition-all duration-500" />

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-medium text-charcoal tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-stone-dark text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}