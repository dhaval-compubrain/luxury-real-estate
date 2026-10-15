import { useState, useCallback, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import MarqueeStrip from './components/MarqueeStrip';
import EditorialDivider from './components/EditorialDivider';
import About from './components/About';
import FeaturedProjects from './components/FeaturedProjects';
import WhyChooseUs from './components/WhyChooseUs';
import Amenities from './components/Amenities';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import BrochureModal from './components/BrochureModal';
import ContactPage from './pages/ContactPage';
import { Project } from './data/projects';

export type ContactRequest = { mode: 'call' | 'meeting'; nonce: number } | null;
export type Page = 'home' | 'contact';

function pageFromHash(): Page {
  if (typeof window !== 'undefined' && window.location.hash.startsWith('#/contact')) {
    return 'contact';
  }
  return 'home';
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [brochureProject, setBrochureProject] = useState<Project | undefined>();
  const [contactRequest, setContactRequest] = useState<ContactRequest>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Initialise page from URL hash + keep back/forward buttons working
  useEffect(() => {
    setCurrentPage(pageFromHash());
    const onHashChange = () => {
      setCurrentPage(pageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goToPage = useCallback((page: Page) => {
    setCurrentPage(page);
    const hash = page === 'contact' ? '#/contact' : '#/';
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const sectionMap: Record<string, string> = {
      'home': 'home',
      'about': 'about',
      'projects': 'projects',
      'amenities': 'amenities',
      'journal': 'gallery',
      'gallery': 'gallery',
      'contact': 'contact',
    };
    const id = sectionMap[sectionId] || sectionId;

    // Contact lives on its own page — redirect there instead of scrolling
    if (id === 'contact') {
      setContactRequest(null);
      goToPage('contact');
      return;
    }

    // Any other section lives on home — go home first, then scroll
    if (currentPage !== 'home') {
      goToPage('home');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, goToPage]);

  const openBrochureModal = useCallback((project?: Project) => {
    setBrochureProject(project);
    setBrochureOpen(true);
  }, []);

  const openEnquiry = useCallback(() => {
    goToPage('contact');
  }, [goToPage]);

  const handleContactAction = useCallback((mode: 'general' | 'call' | 'meeting') => {
    if (mode === 'general') {
      setContactRequest(null);
      goToPage('contact');
      return;
    }
    setContactRequest({ mode, nonce: Date.now() });
    goToPage('contact');
    // After the contact page mounts, bring the form into view
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, [goToPage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (brochureOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [brochureOpen]);

  return (
    <div className="relative">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main content */}
      {!isLoading && (
        <>
          <Navbar
            onNavigate={scrollToSection}
            onEnquiryClick={openEnquiry}
            onContactAction={handleContactAction}
            currentPage={currentPage}
          />

          {currentPage === 'contact' ? (
            <ContactPage
              contactRequest={contactRequest}
              onNavigate={scrollToSection}
              onGoHome={() => goToPage('home')}
              onContactAction={handleContactAction}
            />
          ) : (
            <main>
              <Hero
                onExploreProjects={() => scrollToSection('projects')}
                onDownloadBrochure={() => openBrochureModal()}
              />
              <StatsBar />
              <MarqueeStrip
                items={[
                  'Luxury Residences',
                  'Premium Villas',
                  'Commercial Excellence',
                  'Mixed-Use Developments',
                  'Award-Winning Design',
                  'Sustainable Living',
                ]}
              />
              <About />
              <MarqueeStrip
                items={[
                  'New York',
                  'Los Angeles',
                  'Miami',
                  'Chicago',
                  'Brooklyn',
                  'Beverly Hills',
                ]}
                direction="right"
                speed={25}
              />
              <FeaturedProjects onDownloadBrochure={openBrochureModal} />
              <WhyChooseUs />
              <EditorialDivider
                quote="The details are not the details. They make the design."
                author="Charles Eames"
                bgImage="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=600&fit=crop&q=80"
              />
              <Amenities />
              <Testimonials />
              <Gallery />
              <MarqueeStrip
                items={[
                  'Architecture',
                  'Interior Design',
                  'Landscape',
                  'Innovation',
                  'Sustainability',
                  'Heritage',
                  'Craftsmanship',
                  'Legacy',
                ]}
                speed={22}
              />
              <FinalCTA
                onExploreProjects={() => scrollToSection('projects')}
                onDownloadBrochure={() => openBrochureModal()}
                onEnquiry={openEnquiry}
              />
            </main>
          )}

          <Footer onNavigate={scrollToSection} />

          {/* Brochure Modal */}
          <BrochureModal
            isOpen={brochureOpen}
            onClose={() => setBrochureOpen(false)}
            preSelectedProject={brochureProject}
          />
        </>
      )}
    </div>
  );
}
