// src/constants/data.ts
export type ViewMode = 'find-labor' | 'my-posts' | 'find-work' | 'view-contractors'; 

export type PostType = {
  id: number;
  title: string;
  details: string;
  city: string;
  area: string;
  requiredLabor: number | string;
  postedDate: string;
  status: 'Active' | 'Completed' | 'Draft';
  applicants: number;
};

export const contractorsData = [
  { id: 1, name: 'Kumar Construction Services', type: 'Company', specialization: 'Civil Work', rating: 4.8, reviews: 156, experience: '15 years', location: 'Danapur, Patna', laborCount: 50, priceRange: '₹500 - ₹1500/day', verified: true, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', lat: 25.6020, lng: 85.1376 },
  { id: 2, name: 'Rajesh Electrical Works', type: 'Individual Contractor', specialization: 'Electrical', rating: 4.6, reviews: 89, experience: '10 years', location: 'Danapur, Patna', laborCount: 8, priceRange: '₹600 - ₹1200/day', verified: true, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', lat: 25.6015, lng: 85.1370 },
  { id: 3, name: 'Singh Labor Suppliers', type: 'Labor Supplier', specialization: 'General Labor', rating: 4.5, reviews: 203, experience: '12 years', location: 'Kankarbagh, Patna', laborCount: 150, priceRange: '₹400 - ₹800/day', verified: true, image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=400&h=300&fit=crop', lat: 25.5930, lng: 85.1260 },
  { id: 4, name: 'Verma Plumbing Services', type: 'Company', specialization: 'Plumbing', rating: 4.3, reviews: 78, experience: '8 years', location: 'Boring Road, Patna', laborCount: 20, priceRange: '₹450 - ₹900/day', verified: true, image: 'https://images.unsplash.com/photo-1596204970369-85c1f299f5e5?w=400&h=300&fit=crop', lat: 25.5970, lng: 85.1400 },
];

export const initialMyPosts: PostType[] = [
  { id: 101, title: 'Need 5 Masons for 3 Months', details: 'Looking for experienced masons for a commercial building project near Danapur. Long term work available for the right team.', city: 'Patna', area: 'Danapur', requiredLabor: 5, postedDate: '10/Dec/2025', status: 'Active', applicants: 12 },
  { id: 102, title: 'Urgent: Electrician for Residential Wiring', details: 'Individual electrician needed for house wiring in Kankarbagh. Must have own tools and 3+ years experience.', city: 'Patna', area: 'Kankarbagh', requiredLabor: 1, postedDate: '01/Dec/2025', status: 'Completed', applicants: 5 },
  { id: 103, title: 'General Labor for Site Cleanup', details: '10 General Laborers required for site cleanup and material movement in Boring Road for 1 week.', city: 'Patna', area: 'Boring Road', requiredLabor: 10, postedDate: '05/Dec/2025', status: 'Active', applicants: 25 },
];

export const cities = ['Patna', 'Delhi', 'Mumbai'];
export const areas: { [key: string]: string[] } = {
  Patna: ['Danapur', 'Kankarbagh', 'Boring Road', 'Rajendra Nagar', 'Patna City'],
  Delhi: ['Connaught Place', 'Dwarka', 'Rohini', 'Saket'],
  Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane'],
};
export const contractorTypes = ['All', 'Individual Contractor', 'Company', 'Labor Supplier'];
export const specializations = ['All', 'Civil Work', 'Electrical', 'Plumbing', 'Carpentry', 'Painting', 'Masonry', 'Welding', 'General Labor'];
export const itemsPerPage = 10;