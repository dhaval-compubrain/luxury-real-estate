import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Clock, PhoneCall, CalendarClock, MessageCircle, Navigation } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import EnquiryForm from '../components/EnquiryForm';
import ScrollReveal from '../components/ScrollReveal';
import type { ContactRequest } from '../App';

interface ContactPageProps {
  contactRequest?: ContactRequest;
  onNavigate: (section: string) => void;
  onGoHome: () => void;
  onContactAction: (mode: 'general' | 'call' | 'meeting') => void;
}

export default function ContactPage({ contactRequest, onNavigate, onGoHome, onContactAction }: ContactPageProps) {
  const { contact } = siteContent;

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="bg-charcoal">
      {/* Hero */}
      <section className="relative min-h-[68vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&q=80"
            alt="Aurea Estates office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-40 w-full">
          <motion.button
            onClick={onGoHome}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-stone hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase font-medium mb-8"
          >
            <ArrowLeft size={14} />
            Back to Home!
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold mb-4">
              <button onClick={onGoHome} className="hover:text-gold-light transition-colors">Home</button>
              <span className="text-stone">/</span>
              <span className="text-ivory">Contact</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium text-ivory tracking-tight leading-[1.05]">
              Contact Us
            </h1>
            <p className="mt-5 max-w-2xl text-stone-light/80 text-base sm:text-lg leading-relaxed">
              {contact.description} Reach out for general enquiries, book a call, or schedule a private meeting with our team.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onContactAction('call')}
                className="btn-shine flex items-center gap-2.5 px-7 py-3.5 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors"
              >
                <PhoneCall size={15} />
                Book a Call
              </button>
              <button
                onClick={() => onContactAction('meeting')}
                className="flex items-center gap-2.5 px-7 py-3.5 border border-ivory/25 text-ivory text-xs tracking-[0.2em] uppercase font-medium hover:border-gold/60 hover:text-gold transition-colors"
              >
                <CalendarClock size={15} />
                Schedule a Meeting
              </button>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-7 py-3.5 border border-white/10 text-stone-light text-xs tracking-[0.2em] uppercase font-medium hover:border-green-500/60 hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick info cards */}
      <section className="relative bg-charcoal border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MapPin, label: 'Visit Us', value: contact.address, action: 'Get Directions', href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.replace(/\n/g, ', '))}` },
              { icon: Phone, label: 'Call Us', value: contact.phone, action: 'Call Now', href: `tel:${contact.phone}` },
              { icon: Mail, label: 'Email Us', value: contact.email, action: 'Send Email', href: `mailto:${contact.email}` },
              { icon: Clock, label: 'Opening Hours', value: contact.hours, action: 'Plan a Visit', href: '#contact' },
            ].map((card, i) => (
              <ScrollReveal key={card.label} delay={i * 0.08}>
                <div className="h-full p-6 border border-white/10 bg-charcoal-light hover:border-gold/30 transition-colors duration-300 flex flex-col gap-4">
                  <div className="w-11 h-11 flex items-center justify-center border border-gold/25">
                    <card.icon size={17} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-1.5">{card.label}</div>
                    <p className="text-sm text-ivory/85 leading-relaxed whitespace-pre-line">{card.value}</p>
                  </div>
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={card.href === '#contact' ? (e) => { e.preventDefault(); scrollToForm(); } : undefined}
                    className="mt-auto inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-gold font-medium hover:text-gold-light transition-colors"
                  >
                    <Navigation size={12} />
                    {card.action}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main enquiry form (reused, keeps Book-a-Call / Schedule-a-Meeting prefill) */}
      <EnquiryForm contactRequest={contactRequest} />

      {/* Explore strip */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-gold-dark font-medium mb-2">Not ready to talk yet?</div>
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal tracking-tight">Explore our portfolio first.</h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="px-8 py-4 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase font-semibold hover:bg-forest transition-colors shrink-0"
          >
            View Projects
          </button>
        </div>
      </section>
    </main>
  );
}
