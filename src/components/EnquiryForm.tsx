import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Phone, Mail, MapPin, Clock, PhoneCall, CalendarClock } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { projects } from '../data/projects';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import type { ContactRequest } from '../App';

interface FormData {
  name: string;
  phone: string;
  email: string;
  project: string;
  propertyType: string;
  budget: string;
  contactMethod: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  project: '',
  propertyType: '',
  budget: '',
  contactMethod: 'phone',
  message: '',
};

export default function EnquiryForm({ contactRequest }: { contactRequest?: ContactRequest }) {
  const { contact } = siteContent;
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeMode, setActiveMode] = useState<'call' | 'meeting' | null>(null);

  // Pre-fill the form when navbar "Book a Call" / "Schedule a Meeting" is selected
  useEffect(() => {
    if (!contactRequest) {
      setActiveMode(null);
      return;
    }
    if (contactRequest.mode === 'call') {
      setActiveMode('call');
      setFormData((prev) => ({
        ...prev,
        contactMethod: 'phone',
        message: prev.message || 'I would like to book a call with your team. Preferred time: ',
      }));
    } else if (contactRequest.mode === 'meeting') {
      setActiveMode('meeting');
      setFormData((prev) => ({
        ...prev,
        contactMethod: 'phone',
        message: prev.message || 'I would like to schedule a meeting (in-person / video). Preferred date & time: ',
      }));
    }
  }, [contactRequest]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[+]?[\d\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate API call - In production, connect to your CRM or form service
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log form data (replace with actual API call)
      console.log('Enquiry submitted:', formData);

      setStatus('success');
      setFormData(initialForm);

      // Reset success state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative bg-forest py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(197,164,109,0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(197,164,109,0.1) 0%, transparent 40%)`
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Left: Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <SectionHeading
              label="Get in Touch"
              title={contact.headline}
              subtitle={contact.description}
              light
            />

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-1">Office</div>
                    <p className="text-ivory/80 text-sm whitespace-pre-line">{contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-1">Phone</div>
                    <a href={`tel:${contact.phone}`} className="text-ivory/80 text-sm hover:text-gold transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-1">Email</div>
                    <a href={`mailto:${contact.email}`} className="text-ivory/80 text-sm hover:text-gold transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20">
                    <Clock size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-1">Hours</div>
                    <p className="text-ivory/80 text-sm whitespace-pre-line">{contact.hours}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.2} direction="right">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <AnimatePresence>
                  {activeMode && (
                    <motion.div
                      key={activeMode}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 border border-gold/30 bg-gold/10"
                    >
                      <div className="flex items-center gap-3">
                        {activeMode === 'call' ? (
                          <PhoneCall size={16} className="text-gold shrink-0" />
                        ) : (
                          <CalendarClock size={16} className="text-gold shrink-0" />
                        )}
                        <span className="text-sm text-ivory">
                          {activeMode === 'call'
                            ? 'Booking a call — leave your number and preferred time.'
                            : 'Scheduling a meeting — tell us your preferred date & time.'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setActiveMode(null); setFormData((p) => ({ ...p, message: '' })); }}
                        className="text-[11px] tracking-[0.15em] uppercase text-stone hover:text-gold transition-colors shrink-0"
                      >
                        Clear
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Row 1: Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name *"
                    error={errors.name}
                    children={
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your full name"
                        className="form-input"
                      />
                    }
                  />
                  <FormField
                    label="Phone Number *"
                    error={errors.phone}
                    children={
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="form-input"
                      />
                    }
                  />
                </div>

                {/* Row 2: Email & Project */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Email Address *"
                    error={errors.email}
                    children={
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="your@email.com"
                        className="form-input"
                      />
                    }
                  />
                  <FormField
                    label="Interested Project"
                    children={
                      <select
                        value={formData.project}
                        onChange={(e) => updateField('project', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select a project</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    }
                  />
                </div>

                {/* Row 3: Property Type & Budget */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Property Type"
                    children={
                      <select
                        value={formData.propertyType}
                        onChange={(e) => updateField('propertyType', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="commercial">Commercial</option>
                        <option value="office">Office Space</option>
                      </select>
                    }
                  />
                  <FormField
                    label="Budget Range"
                    children={
                      <select
                        value={formData.budget}
                        onChange={(e) => updateField('budget', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select budget</option>
                        <option value="under-1m">Under $1M</option>
                        <option value="1m-3m">$1M — $3M</option>
                        <option value="3m-5m">$3M — $5M</option>
                        <option value="5m-10m">$5M — $10M</option>
                        <option value="above-10m">Above $10M</option>
                      </select>
                    }
                  />
                </div>

                {/* Contact Method */}
                <FormField
                  label="Preferred Contact Method"
                  children={
                    <div className="flex gap-4">
                      {['phone', 'email', 'whatsapp'].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={formData.contactMethod === method}
                            onChange={(e) => updateField('contactMethod', e.target.value)}
                            className="accent-gold"
                          />
                          <span className="text-sm text-ivory/70 capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  }
                />

                {/* Message */}
                <FormField
                  label="Message"
                  children={
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      className="form-input resize-none"
                    />
                  }
                />

                {/* Consent */}
                <p className="text-[11px] text-ivory/40 leading-relaxed">
                  By submitting this form, you agree to our privacy policy and consent to being contacted regarding your enquiry. 
                  Your information will be handled securely and not shared with third parties.
                </p>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 px-6 py-4 bg-green-900/30 border border-green-700/30 text-green-300"
                    >
                      <Check size={18} />
                      <span className="text-sm">Thank you! We&apos;ll be in touch within 24 hours.</span>
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 px-6 py-4 bg-red-900/30 border border-red-700/30 text-red-300"
                    >
                      <AlertCircle size={18} />
                      <span className="text-sm">Something went wrong. Please try again or call us directly.</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-shine flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {activeMode === 'call' ? 'Book a Call' : activeMode === 'meeting' ? 'Schedule a Meeting' : 'Request a Callback'}
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #F6F2E9;
          font-size: 0.9375rem;
          font-family: var(--font-body);
          transition: border-color 0.3s, background-color 0.3s;
          outline: none;
        }
        .form-input::placeholder {
          color: rgba(169,170,163,0.5);
        }
        .form-input:focus {
          border-color: rgba(197,164,109,0.5);
          background: rgba(255,255,255,0.08);
        }
        .form-input option {
          background: #183D32;
          color: #F6F2E9;
        }
      `}</style>
    </section>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] tracking-[0.15em] uppercase text-gold/70 font-medium">{label}</label>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}