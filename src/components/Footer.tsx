import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import ScrollReveal from './ScrollReveal';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { contact, footer } = siteContent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <ScrollReveal className="sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="text-gold">
                  <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M24 4V24M4 14L24 24M44 14L24 24M24 44V24" stroke="currentColor" strokeWidth="1" opacity={0.5} />
                </svg>
                <span className="font-display text-lg tracking-[0.12em] text-ivory font-medium">AUREA ESTATES</span>
              </div>
              <p className="text-sm text-stone leading-relaxed max-w-xs">
                {footer.description}
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {Object.entries(footer.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="w-9 h-9 flex items-center justify-center border border-white/10 text-stone hover:border-gold/40 hover:text-gold transition-all duration-300"
                    aria-label={`Follow us on ${platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {footer.quickLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate(link.toLowerCase())}
                      className="text-sm text-stone-light/70 hover:text-ivory transition-colors flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Projects */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-6">Projects</h4>
              <ul className="flex flex-col gap-3">
                {footer.projectLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate('projects')}
                      className="text-sm text-stone-light/70 hover:text-ivory transition-colors flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-6">Contact</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-stone-light/70 whitespace-pre-line">{contact.address}</p>
                </div>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-stone-light/70 hover:text-ivory transition-colors">
                  <Phone size={14} className="text-gold flex-shrink-0" />
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-stone-light/70 hover:text-ivory transition-colors">
                  <Mail size={14} className="text-gold flex-shrink-0" />
                  {contact.email}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-stone/50 tracking-wider">
            © {currentYear} Aurea Estates. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-stone/50 hover:text-stone transition-colors tracking-wider">Privacy Policy</a>
            <a href="#" className="text-[11px] text-stone/50 hover:text-stone transition-colors tracking-wider">Terms of Service</a>
            <a href="#" className="text-[11px] text-stone/50 hover:text-stone transition-colors tracking-wider">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      {contact.whatsapp && (
        <motion.a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center bg-green-600 rounded-full shadow-lg shadow-green-900/30 hover:bg-green-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </motion.a>
      )}
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };

  return icons[platform] || null;
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.553 4.112 1.519 5.837L.057 23.992l6.308-1.435A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.843-.56-5.429-1.535l-.39-.234-3.75.852.866-3.662-.255-.404A9.707 9.707 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
    </svg>
  );
}