import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Logo animation */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo mark */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-gold">
                <motion.path
                  d="M24 4L4 14V34L24 44L44 34V14L24 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.path
                  d="M24 4V24M4 14L24 24M44 14L24 24M24 44V24"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity={0.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.6 }}
                />
              </svg>
            </motion.div>

            {/* Brand name */}
            <motion.div className="text-center">
              <motion.h1
                className="font-display text-2xl sm:text-3xl font-medium tracking-[0.15em] text-ivory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                AUREA ESTATES
              </motion.h1>
              <motion.div
                className="mt-3 h-px w-16 mx-auto bg-gold/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
              <motion.p
                className="mt-3 text-xs tracking-[0.3em] text-stone uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                Exceptional Living
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Loading bar */}
          <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32">
            <motion.div
              className="h-px bg-gold/30 w-full rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}