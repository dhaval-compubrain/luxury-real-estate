import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { siteContent } from '../data/siteContent';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-gold tracking-tight">
      {count}{suffix}
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="relative bg-charcoal py-16 sm:py-20 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(197,164,109,0.5) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {siteContent.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center px-4 lg:px-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="mt-3 w-6 h-px bg-gold/30" />
              <p className="mt-3 text-xs tracking-[0.2em] uppercase text-stone-light/70 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}