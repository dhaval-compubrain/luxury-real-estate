import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown, MapPin, ArrowRight, ArrowUpRight, PhoneCall, CalendarClock, Mail } from 'lucide-react';
import { projects, statusLabels } from '../data/projects';
import { siteContent } from '../data/siteContent';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onEnquiryClick: () => void;
  onContactAction?: (mode: 'general' | 'call' | 'meeting') => void;
  currentPage?: 'home' | 'contact';
}

const navLinks = [
  { id: 'amenities', label: 'Amenities' },
  { id: 'gallery', label: 'Gallery' },
];

const contactMenu = [
  {
    id: 'general' as const,
    label: 'Contact Us',
    desc: 'General enquiries & support',
    icon: Mail,
  },
  {
    id: 'call' as const,
    label: 'Book a Call',
    desc: `Call us at ${siteContent.contact.phone}`,
    icon: PhoneCall,
  },
  {
    id: 'meeting' as const,
    label: 'Schedule a Meeting',
    desc: 'In-person or video, Mon–Sat',
    icon: CalendarClock,
  },
];

export default function Navbar({ onNavigate, onEnquiryClick, onContactAction, currentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);
  const contactCloseTimeout = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close desktop dropdowns on Escape / outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProjectsOpen(false);
        setContactOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const openDropdown = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    setContactOpen(false);
    setProjectsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => setProjectsOpen(false), 120);
  };

  const openContactDropdown = () => {
    if (contactCloseTimeout.current) window.clearTimeout(contactCloseTimeout.current);
    setProjectsOpen(false);
    setContactOpen(true);
  };

  const scheduleContactClose = () => {
    if (contactCloseTimeout.current) window.clearTimeout(contactCloseTimeout.current);
    contactCloseTimeout.current = window.setTimeout(() => setContactOpen(false), 120);
  };

  const handleNavClick = (id: string) => {
    setIsMobileOpen(false);
    setProjectsOpen(false);
    setContactOpen(false);
    onNavigate(id);
  };

  const handleContactSelect = (mode: 'general' | 'call' | 'meeting') => {
    setContactOpen(false);
    setIsMobileOpen(false);
    setMobileContactOpen(false);
    if (onContactAction) {
      onContactAction(mode);
    } else {
      onNavigate('contact');
    }
  };

  const scrollToProjectCard = (projectId: string) => {
    // The projects section renders each card with id={`project-${id}`}
    requestAnimationFrame(() => {
      const el = document.getElementById(`project-${projectId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Brief highlight ring so users see which project was selected
        el.classList.add('ring-1', 'ring-gold/70');
        window.setTimeout(() => el.classList.remove('ring-1', 'ring-gold/70'), 2000);
      } else {
        // Fallback: just go to the projects section
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleProjectSelect = (projectId: string) => {
    setProjectsOpen(false);
    setContactOpen(false);
    setIsMobileOpen(false);
    setMobileProjectsOpen(false);
    // First ensure the projects section is in view, then target the card.
    onNavigate('projects');
    window.setTimeout(() => scrollToProjectCard(projectId), 120);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group"
              aria-label="Go to home"
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="text-gold">
                <path
                  d="M24 4L4 14V34L24 44L44 34V14L24 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M24 4V24M4 14L24 24M44 14L24 24M24 44V24"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity={0.5}
                />
              </svg>
              <span className="font-display text-lg sm:text-xl tracking-[0.12em] text-ivory font-medium">
                AUREA
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => handleNavClick('home')}
                className="animated-underline text-[13px] tracking-[0.15em] uppercase text-stone-light hover:text-ivory transition-colors duration-300 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="animated-underline text-[13px] tracking-[0.15em] uppercase text-stone-light hover:text-ivory transition-colors duration-300 font-medium"
              >
                About
              </button>

              {/* Projects dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
              >
                <button
                  onClick={() => setProjectsOpen((v) => !v)}
                  onFocus={openDropdown}
                  aria-haspopup="true"
                  aria-expanded={projectsOpen}
                  className={`flex items-center gap-1.5 text-[13px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                    projectsOpen ? 'text-ivory' : 'text-stone-light hover:text-ivory'
                  }`}
                >
                  <span className="animated-underline">Projects</span>
                  <ChevronDown
                    size={14}
                    className={`text-gold transition-transform duration-300 ${projectsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-5 w-[34rem]"
                    >
                      <div className="bg-charcoal-light border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                          <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
                            Our Portfolio — {projects.length} Projects
                          </span>
                          <button
                            onClick={() => handleNavClick('projects')}
                            className="flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase text-stone hover:text-gold transition-colors"
                          >
                            View all <ArrowRight size={12} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-1 p-3">
                          {projects.map((project) => {
                            const status = statusLabels[project.status];
                            return (
                              <button
                                key={project.id}
                                onClick={() => handleProjectSelect(project.id)}
                                className="group flex items-center gap-3 p-2.5 text-left hover:bg-white/5 transition-colors"
                              >
                                <div className="w-14 h-14 shrink-0 overflow-hidden img-placeholder">
                                  <img
                                    src={project.image}
                                    alt={project.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-display text-[15px] text-ivory truncate group-hover:text-gold transition-colors">
                                      {project.name}
                                    </span>
                                    <ArrowUpRight
                                      size={13}
                                      className="shrink-0 text-gold opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                                    />
                                  </div>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <MapPin size={10} className="shrink-0 text-gold/70" />
                                    <span className="text-[11px] text-stone truncate">{project.location}</span>
                                  </div>
                                  <span className={`inline-block mt-1 px-1.5 py-0.5 text-[9px] tracking-[0.12em] uppercase font-medium ${status.color}`}>
                                    {status.label}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => handleNavClick('projects')}
                          className="w-full py-3.5 border-t border-white/10 bg-gold/5 text-gold text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-gold hover:text-charcoal transition-colors duration-300"
                        >
                          Explore All Projects
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="animated-underline text-[13px] tracking-[0.15em] uppercase text-stone-light hover:text-ivory transition-colors duration-300 font-medium"
                >
                  {link.label}
                </button>
              ))}

              {/* Contact dropdown */}
              <div
                ref={contactDropdownRef}
                className="relative"
                onMouseEnter={openContactDropdown}
                onMouseLeave={scheduleContactClose}
              >
                <button
                  onClick={() => setContactOpen((v) => !v)}
                  onFocus={openContactDropdown}
                  aria-haspopup="true"
                  aria-expanded={contactOpen}
                  className={`flex items-center gap-1.5 text-[13px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                    contactOpen || currentPage === 'contact' ? 'text-ivory' : 'text-stone-light hover:text-ivory'
                  }`}
                >
                  <span className="animated-underline">Contact</span>
                  <ChevronDown
                    size={14}
                    className={`text-gold transition-transform duration-300 ${contactOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute right-0 top-full pt-5 w-80"
                    >
                      <div className="bg-charcoal-light border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                        <div className="px-5 pt-4 pb-2">
                          <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
                            Get in Touch
                          </span>
                        </div>

                        <div className="flex flex-col p-2">
                          {contactMenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleContactSelect(item.id)}
                                className="group flex items-center gap-3.5 p-3 text-left hover:bg-white/5 transition-colors"
                              >
                                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-gold/20 group-hover:bg-gold/10 transition-colors">
                                  <Icon size={16} className="text-gold" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[14px] font-medium tracking-wide text-ivory group-hover:text-gold transition-colors">
                                      {item.label}
                                    </span>
                                    <ArrowUpRight
                                      size={13}
                                      className="shrink-0 text-gold opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                                    />
                                  </div>
                                  <div className="text-[11px] text-stone truncate mt-0.5">{item.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <a
                          href={`tel:${siteContent.contact.phone}`}
                          className="flex items-center justify-center gap-2 w-full py-3.5 border-t border-white/10 bg-gold/5 text-gold text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-gold hover:text-charcoal transition-colors duration-300"
                        >
                          <PhoneCall size={13} />
                          {siteContent.contact.phone}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={onEnquiryClick}
                className="btn-shine px-6 py-2.5 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold/10 hover:border-gold/70 transition-all duration-400"
              >
                Enquire Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-ivory"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-charcoal shadow-2xl flex flex-col pt-24 px-8 pb-8 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-1">
                <motion.button
                  onClick={() => handleNavClick('home')}
                  className="flex items-center justify-between py-4 border-b border-white/5 text-ivory hover:text-gold transition-colors group"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.4 }}
                >
                  <span className="font-display text-xl tracking-wide">Home</span>
                  <ChevronRight size={18} className="text-stone opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  onClick={() => handleNavClick('about')}
                  className="flex items-center justify-between py-4 border-b border-white/5 text-ivory hover:text-gold transition-colors group"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.4 }}
                >
                  <span className="font-display text-xl tracking-wide">About</span>
                  <ChevronRight size={18} className="text-stone opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* Mobile Projects expandable */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16, duration: 0.4 }}
                  className="border-b border-white/5"
                >
                  <div className="flex items-center justify-between py-4">
                    <button
                      onClick={() => handleNavClick('projects')}
                      className="font-display text-xl tracking-wide text-ivory hover:text-gold transition-colors"
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => setMobileProjectsOpen((v) => !v)}
                      aria-expanded={mobileProjectsOpen}
                      aria-label="Toggle projects submenu"
                      className="flex items-center gap-1 p-1 text-stone hover:text-gold transition-colors"
                    >
                      <span className="text-[10px] tracking-[0.2em] uppercase">
                        {projects.length}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${mobileProjectsOpen ? 'rotate-180 text-gold' : ''}`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {mobileProjectsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-4 pl-1">
                          {projects.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => handleProjectSelect(project.id)}
                              className="flex items-center gap-3 p-2 text-left hover:bg-white/5 transition-colors group/sub"
                            >
                              <div className="w-11 h-11 shrink-0 overflow-hidden img-placeholder">
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-[15px] text-ivory group-hover/sub:text-gold transition-colors truncate">
                                  {project.name}
                                </div>
                                <div className="text-[11px] text-stone truncate">{project.location}</div>
                              </div>
                              <ChevronRight size={15} className="shrink-0 text-stone/50 group-hover/sub:text-gold transition-colors" />
                            </button>
                          ))}
                          <button
                            onClick={() => handleNavClick('projects')}
                            className="mt-2 py-3 border border-gold/30 text-gold text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold/10 transition-colors"
                          >
                            View All Projects
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center justify-between py-4 border-b border-white/5 text-ivory hover:text-gold transition-colors group text-left"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.24 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="font-display text-xl tracking-wide">{link.label}</span>
                    <ChevronRight size={18} className="text-stone opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}

                {/* Mobile Contact expandable */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="border-b border-white/5"
                >
                  <div className="flex items-center justify-between py-4">
                    <button
                      onClick={() => handleContactSelect('general')}
                      className="font-display text-xl tracking-wide text-ivory hover:text-gold transition-colors"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => setMobileContactOpen((v) => !v)}
                      aria-expanded={mobileContactOpen}
                      aria-label="Toggle contact submenu"
                      className="p-1 text-stone hover:text-gold transition-colors"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${mobileContactOpen ? 'rotate-180 text-gold' : ''}`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {mobileContactOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-4 pl-1">
                          {contactMenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleContactSelect(item.id)}
                                className="flex items-center gap-3 p-2.5 text-left hover:bg-white/5 transition-colors group/sub"
                              >
                                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-gold/20">
                                  <Icon size={15} className="text-gold" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[15px] text-ivory group-hover/sub:text-gold transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-[11px] text-stone truncate">{item.desc}</div>
                                </div>
                                <ChevronRight size={15} className="shrink-0 text-stone/50 group-hover/sub:text-gold transition-colors" />
                              </button>
                            );
                          })}
                          <a
                            href={`tel:${siteContent.contact.phone}`}
                            className="mt-2 flex items-center justify-center gap-2 py-3 border border-gold/30 text-gold text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold/10 transition-colors"
                          >
                            <PhoneCall size={13} />
                            {siteContent.contact.phone}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={() => { setIsMobileOpen(false); onEnquiryClick(); }}
                  className="w-full py-4 bg-gold text-charcoal text-sm tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
