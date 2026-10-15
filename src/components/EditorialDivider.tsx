import ScrollReveal from './ScrollReveal';

interface EditorialDividerProps {
  quote?: string;
  author?: string;
  bgImage?: string;
}

export default function EditorialDivider({ quote, author, bgImage }: EditorialDividerProps) {
  if (!quote) {
    return (
      <div className="relative h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    );
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      {bgImage && (
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/90" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <ScrollReveal>
          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-ivory/80 italic leading-relaxed tracking-tight">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </ScrollReveal>
        {author && (
          <ScrollReveal delay={0.2}>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-gold/40" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold/70">{author}</span>
              <div className="w-8 h-px bg-gold/40" />
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}