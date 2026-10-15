import { motion } from 'framer-motion';

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}

export default function MarqueeStrip({ items, speed = 30, direction = 'left' }: MarqueeStripProps) {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-5 bg-charcoal border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {repeatedItems.map((item, i) => (
          <span key={i} className="flex items-center gap-8 flex-shrink-0">
            <span className="font-display text-sm sm:text-base tracking-[0.3em] uppercase text-stone-light/40 font-light">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-gold/30 rounded-full flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}