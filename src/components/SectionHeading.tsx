import ScrollReveal from './ScrollReveal';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left';

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {label && (
        <ScrollReveal delay={0}>
          <span
            className={`inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] ${
              light ? 'text-gold' : 'text-gold-dark'
            }`}
          >
            <span className={`block h-px w-8 ${light ? 'bg-gold/40' : 'bg-gold-dark/40'}`} />
            {label}
            <span className={`block h-px w-8 ${light ? 'bg-gold/40' : 'bg-gold-dark/40'}`} />
          </span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.1}>
        <h2
          className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.15] tracking-tight whitespace-pre-line ${
            light ? 'text-ivory' : 'text-charcoal'
          }`}
        >
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p
            className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
              light ? 'text-stone-light' : 'text-stone-dark'
            } ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}