export interface Project {
  id: string;
  name: string;
  location: string;
  category: 'residential' | 'villa' | 'commercial' | 'mixed-use' | 'upcoming';
  status: 'ready' | 'under-construction' | 'upcoming';
  description: string;
  highlights: string[];
  image: string;
  brochureUrl?: string;
  priceRange?: string;
  areaRange?: string;
  bedrooms?: string;
}

export const projects: Project[] = [
  {
    id: 'aurea-towers',
    name: 'Aurea Towers',
    location: 'Downtown Manhattan, New York',
    category: 'residential',
    status: 'ready',
    description: 'A landmark residential tower offering panoramic skyline views, world-class amenities, and residences crafted for those who demand nothing less than extraordinary.',
    highlights: ['42 Floors', '186 Residences', '360° Skyline Views', 'Private Elevator Lobbies', 'Concierge Services'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=1000&fit=crop&q=80',
    priceRange: '$1.2M — $8.5M',
    areaRange: '1,200 — 4,800 sq ft',
    bedrooms: '1-4 BHK',
    brochureUrl: '#',
  },
  {
    id: 'the-pavilions',
    name: 'The Pavilions',
    location: 'Beverly Hills, Los Angeles',
    category: 'villa',
    status: 'ready',
    description: 'An exclusive enclave of ultra-luxury villas nestled among mature landscaping, offering unparalleled privacy and architectural distinction in one of the world\'s most coveted addresses.',
    highlights: ['24 Premium Villas', 'Private Gardens', 'Infinity Pools', 'Smart Home Integration', 'Gated Community'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1000&fit=crop&q=80',
    priceRange: '$4.5M — $18M',
    areaRange: '5,500 — 12,000 sq ft',
    bedrooms: '4-6 BHK',
    brochureUrl: '#',
  },
  {
    id: 'meridian-hub',
    name: 'Meridian Hub',
    location: 'Financial District, Chicago',
    category: 'commercial',
    status: 'under-construction',
    description: 'A Grade A commercial development designed for forward-thinking enterprises. LEED Platinum certified with cutting-edge infrastructure and flexible workspace solutions.',
    highlights: ['30 Floors', '750,000 sq ft', 'LEED Platinum', 'Flexible Floor Plans', 'Rooftop Conference Center'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=1000&fit=crop&q=80',
    priceRange: 'Starting $85/sq ft',
    areaRange: '2,500 — 25,000 sq ft',
    brochureUrl: '#',
  },
  {
    id: 'verdant-heights',
    name: 'Verdant Heights',
    location: 'Williamsburg, Brooklyn',
    category: 'mixed-use',
    status: 'under-construction',
    description: 'A vibrant mixed-use community seamlessly blending luxury residences, curated retail, and creative office spaces in one of Brooklyn\'s most dynamic neighborhoods.',
    highlights: ['220 Residences', '45,000 sq ft Retail', '28,000 sq ft Office', 'Central Courtyard', 'Art Gallery'],
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=1000&fit=crop&q=80',
    priceRange: '$750K — $3.8M',
    areaRange: '800 — 3,200 sq ft',
    bedrooms: 'Studio-3 BHK',
    brochureUrl: '#',
  },
  {
    id: 'azure-bay',
    name: 'Azure Bay',
    location: 'Miami Beach, Florida',
    category: 'residential',
    status: 'upcoming',
    description: 'A breathtaking oceanfront residential masterpiece offering resort-style living with direct beach access, panoramic ocean views, and a level of luxury that redefines waterfront living.',
    highlights: ['35 Floors', '120 Residences', 'Direct Beach Access', 'Marina & Yacht Club', 'Wellness Center'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop&q=80',
    priceRange: '$2.1M — $12M',
    areaRange: '1,800 — 6,500 sq ft',
    bedrooms: '2-5 BHK',
    brochureUrl: '#',
  },
  {
    id: 'solara-residences',
    name: 'Solara Residences',
    location: 'Tribeca, New York',
    category: 'residential',
    status: 'ready',
    description: 'Tribeca\'s most prestigious address. Meticulously crafted residences that honor the neighborhood\'s architectural heritage while embracing contemporary sophistication.',
    highlights: ['86 Residences', 'Lobby by Yabu Pushelberg', 'Private Cinema', 'Wine Cellar', 'Children\'s Atelier'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop&q=80',
    priceRange: '$1.8M — $7.2M',
    areaRange: '1,400 — 4,200 sq ft',
    bedrooms: '1-4 BHK',
    brochureUrl: '#',
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'villa', label: 'Villas' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'mixed-use', label: 'Mixed-Use' },
  { id: 'upcoming', label: 'Upcoming' },
];

export const statusLabels: Record<string, { label: string; color: string }> = {
  'ready': { label: 'Ready to Move', color: 'bg-green-800 text-green-100' },
  'under-construction': { label: 'Under Construction', color: 'bg-gold/20 text-gold' },
  'upcoming': { label: 'Upcoming', color: 'bg-stone/20 text-ivory' },
};