import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="relative bg-ivory py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Image */}
          <ScrollReveal direction="left" duration={1}>
            <div className="relative">
              <div className="relative overflow-hidden aspect-[4/5]">
                <motion.img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80"
                  alt="Premium architectural interior"
                  className="w-full h-full object-cover"
                  whileInView={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-4 sm:right-6 bg-charcoal px-6 py-5 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="font-display text-3xl font-medium text-gold">25+</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-stone-light mt-1">Years of Excellence</div>
              </motion.div>

              {/* Decorative border */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/30" />
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <div className="flex flex-col gap-8 lg:pt-8">
            <SectionHeading
              label="Our Story"
              title={about.headline}
              light={false}
            />

            <ScrollReveal delay={0.3}>
              <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed">
                {about.description1}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-charcoal/70 leading-relaxed">
                {about.description2}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="text-charcoal/70 leading-relaxed">
                {about.description3}
              </p>
            </ScrollReveal>

            {/* Values */}
            <ScrollReveal delay={0.6}>
              <div className="mt-4 flex flex-col gap-3">
                {about.values.map((value, i) => (
                  <motion.div
                    key={value}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-gold" />
                    </div>
                    <span className="text-charcoal/80 text-sm sm:text-base">{value}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA line */}
            <ScrollReveal delay={0.8}>
              <div className="pt-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-gold/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-medium">Since 2001</span>
                <div className="h-px flex-1 bg-gold/20" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}