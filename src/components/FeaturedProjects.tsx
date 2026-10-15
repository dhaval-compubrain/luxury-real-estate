import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, MapPin, Building2 } from 'lucide-react';
import { projects, categories, statusLabels, Project } from '../data/projects';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

interface FeaturedProjectsProps {
  onDownloadBrochure: (project?: Project) => void;
}

export default function FeaturedProjects({ onDownloadBrochure }: FeaturedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory || p.status === activeCategory);

  return (
    <section id="projects" className="relative bg-charcoal py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            label="Our Portfolio"
            title="Featured\nProjects"
            subtitle="Discover our collection of distinguished developments, each a testament to architectural excellence and refined living."
            light
          />

          {/* Category Filters */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-white/10 text-stone hover:border-gold/30 hover:text-ivory'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onViewDetails={setSelectedProject}
                onDownload={() => onDownloadBrochure(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onDownload={() => {
              onDownloadBrochure(selectedProject);
              setSelectedProject(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onViewDetails,
  onDownload,
}: {
  project: Project;
  index: number;
  onViewDetails: (p: Project) => void;
  onDownload: () => void;
}) {
  const status = statusLabels[project.status];

  return (
    <motion.div
      layout
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-charcoal-light overflow-hidden scroll-mt-28"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Category */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold/80 font-medium">
            {project.category}
          </span>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={12} className="text-gold" />
            <span className="text-[11px] tracking-wider text-stone-light/70">{project.location}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-ivory tracking-tight">
            {project.name}
          </h3>

          {/* Hover actions */}
          <motion.div
            className="flex gap-3 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
          >
            <button
              onClick={() => onViewDetails(project)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold text-charcoal text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-gold-light transition-colors"
            >
              View Project
              <ArrowRight size={14} />
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2.5 border border-ivory/20 text-ivory text-[11px] tracking-[0.15em] uppercase font-medium hover:border-gold/50 hover:text-gold transition-colors"
            >
              <Download size={14} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom details bar */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        {project.priceRange && (
          <span className="text-sm text-gold font-medium">{project.priceRange}</span>
        )}
        {project.areaRange && (
          <span className="text-xs text-stone">{project.areaRange}</span>
        )}
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
  onDownload,
}: {
  project: Project;
  onClose: () => void;
  onDownload: () => void;
}) {
  const status = statusLabels[project.status];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-charcoal-light overflow-y-auto"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-charcoal/80 text-ivory hover:text-gold transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Hero image */}
        <div className="relative aspect-video overflow-hidden">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-light to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-8">
            <span className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-gold" />
            <span className="text-sm text-stone-light">{project.location}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ivory tracking-tight mb-2">
            {project.name}
          </h2>
          <span className="text-xs tracking-[0.2em] uppercase text-gold">{project.category}</span>

          <p className="mt-6 text-stone-light/80 text-base leading-relaxed">
            {project.description}
          </p>

          {/* Details grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {project.priceRange && (
              <div className="p-4 border border-white/5">
                <div className="text-[10px] tracking-[0.2em] uppercase text-stone mb-1">Price Range</div>
                <div className="text-gold font-medium">{project.priceRange}</div>
              </div>
            )}
            {project.areaRange && (
              <div className="p-4 border border-white/5">
                <div className="text-[10px] tracking-[0.2em] uppercase text-stone mb-1">Area</div>
                <div className="text-ivory font-medium">{project.areaRange}</div>
              </div>
            )}
            {project.bedrooms && (
              <div className="p-4 border border-white/5">
                <div className="text-[10px] tracking-[0.2em] uppercase text-stone mb-1">Configurations</div>
                <div className="text-ivory font-medium">{project.bedrooms}</div>
              </div>
            )}
          </div>

          {/* Highlights */}
          <div className="mt-8">
            <h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-medium">Key Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <span key={h} className="px-4 py-2 bg-charcoal border border-white/5 text-ivory/80 text-sm">
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="btn-shine flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors"
            >
              <Download size={16} />
              Download Brochure
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-3 px-8 py-4 border border-white/15 text-ivory text-xs tracking-[0.2em] uppercase font-medium hover:border-gold/40 hover:text-gold transition-colors"
            >
              <Building2 size={16} />
              View All Projects
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}