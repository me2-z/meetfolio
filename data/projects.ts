export interface Project {
  slug: string;
  title: string;
  description: string;
  color: string;
  planetType: 'terrestrial' | 'gas-giant' | 'ice-giant';
  hasRings: boolean;
  screenshot?: string;
}

export const projects: Project[] = [
  {
    slug: 'nebula-explorer',
    title: 'Nebula Explorer',
    description: 'Interactive visualization of deep-space nebula formations using real astronomical data.',
    color: '#ff6b6b',
    planetType: 'gas-giant',
    hasRings: true,
  },
  {
    slug: 'orbit-tracker',
    title: 'Orbit Tracker',
    description: 'Real-time satellite and spacecraft tracking application with predictive orbital mechanics.',
    color: '#4ecdc4',
    planetType: 'terrestrial',
    hasRings: false,
  },
  {
    slug: 'star-mapper',
    title: 'Star Mapper',
    description: '3D star constellation mapper with historical mythology and modern astronomical data.',
    color: '#a55eea',
    planetType: 'ice-giant',
    hasRings: true,
  },
  {
    slug: 'exoplanet-hunter',
    title: 'Exoplanet Hunter',
    description: 'Machine learning pipeline for detecting exoplanets from telescope light curve data.',
    color: '#f7b731',
    planetType: 'terrestrial',
    hasRings: false,
  },
];
