import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, AlertCircle } from 'lucide-react';
import { projects, Project } from '../data/projects';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProject?: Project;
}

export default function BrochureModal({ isOpen, onClose, preSelectedProject }: BrochureModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState(preSelectedProject?.id || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[+]?[\d\s()-]{7,20}$/.test(phone)) newErrors.phone = 'Invalid phone number';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log('Brochure download lead:', { name, phone, email, projectId });

      // Trigger download
      const project = projects.find((p) => p.id === projectId);
      if (project?.brochureUrl) {
        // In production, use real PDF URLs
        // window.open(project.brochureUrl, '_blank');
      }

      setStatus('success');

      // Reset after delay
      setTimeout(() => {
        setStatus('idle');
        setName('');
        setPhone('');
        setEmail('');
        setProjectId('');
        onClose();
      }, 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-lg bg-charcoal border border-white/5 shadow-2xl"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-stone hover:text-ivory transition-colors z-10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 flex items-center justify-center bg-gold/10">
                  <Download size={16} className="text-gold" />
                </div>
                <h3 className="font-display text-xl font-medium text-ivory">Download Brochure</h3>
              </div>
              <p className="text-sm text-stone-light/70">
                Fill in your details to receive the project brochure instantly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
              <ModalField
                label="Full Name *"
                error={errors.name}
                children={
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                    placeholder="Your full name"
                    className="modal-input"
                  />
                }
              />

              <ModalField
                label="Phone Number *"
                error={errors.phone}
                children={
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })); }}
                    placeholder="+1 (555) 000-0000"
                    className="modal-input"
                  />
                }
              />

              <ModalField
                label="Email Address *"
                error={errors.email}
                children={
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="your@email.com"
                    className="modal-input"
                  />
                }
              />

              <ModalField
                label="Select Project"
                children={
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="modal-input"
                  >
                    <option value="">Choose a project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.location}</option>
                    ))}
                  </select>
                }
              />

              <p className="text-[10px] text-stone/50 leading-relaxed">
                By downloading, you agree to receive communications from Aurea Estates. 
                Your data is secure and will not be shared.
              </p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-700/30 text-green-300 text-sm"
                  >
                    <Check size={16} />
                    Thank you! Your brochure is being sent to your email.
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-700/30 text-red-300 text-sm"
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Please try again.
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-shine flex items-center justify-center gap-3 w-full py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors disabled:opacity-60"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download Brochure
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <style>{`
            .modal-input {
              width: 100%;
              padding: 0.75rem 0.875rem;
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.1);
              color: #F6F2E9;
              font-size: 0.875rem;
              font-family: var(--font-body);
              transition: border-color 0.3s;
              outline: none;
            }
            .modal-input::placeholder {
              color: rgba(169,170,163,0.4);
            }
            .modal-input:focus {
              border-color: rgba(197,164,109,0.5);
            }
            .modal-input option {
              background: #171916;
              color: #F6F2E9;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] tracking-[0.15em] uppercase text-gold/60 font-medium">{label}</label>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-red-400"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}