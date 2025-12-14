// src/hooks/useHubLogic.ts

import { useState, useMemo, useCallback } from 'react';

// --- TYPES & MOCK DATA ---
export type Role = 'laborer' | 'contractor';

export type JobPost = {
  id: number;
  title: string;
  details: string;
  location: string;
  laborType: string;
  requiredCount: number;
  postedDate: string;
  status: 'Open' | 'Closed' | 'Archived';
  contractorId: number; // Links to the Contractor
};

export type UserProfile = {
  id: number;
  name: string;
  role: Role;
  specialization?: string;
  rating: number;
  experience: string;
  location: string;
  contact: string;
  lastActive: string;
  recentPosts?: number; // Only for Contractors
};

const MOCK_JOB_POSTS: JobPost[] = [
  { id: 101, title: 'Need 5 Masons for 3 Months', details: 'Commercial building project near Danapur. Long term work available.', location: 'Danapur, Patna', laborType: 'Mason', requiredCount: 5, postedDate: '2025-12-10', status: 'Open', contractorId: 1 },
  { id: 102, title: 'Urgent: Electrician for Residential Wiring', details: 'Individual electrician needed for house wiring. Must have own tools.', location: 'Kankarbagh, Patna', laborType: 'Electrician', requiredCount: 1, postedDate: '2025-12-01', status: 'Closed', contractorId: 2 },
  { id: 103, title: 'General Labor for Site Cleanup', details: '10 General Laborers required for site cleanup and material movement for 1 week.', location: 'Boring Road, Patna', laborType: 'General Labor', requiredCount: 10, postedDate: '2025-12-05', status: 'Open', contractorId: 1 },
  { id: 104, title: 'Carpenters for Interior Fit-out', details: 'Two skilled carpenters needed for a 2-month interior fit-out project.', location: 'Rajendra Nagar, Patna', laborType: 'Carpenter', requiredCount: 2, postedDate: '2025-12-12', status: 'Open', contractorId: 3 },
];

const MOCK_USERS: UserProfile[] = [
  // Contractors
  { id: 1, name: 'Kumar Construction', role: 'contractor', specialization: 'Civil Work', rating: 4.8, experience: '15 years', location: 'Patna', contact: '+91-9876543210', lastActive: '5 mins ago', recentPosts: 2 },
  { id: 2, name: 'Rajesh Electrical Works', role: 'contractor', specialization: 'Electrical', rating: 4.6, experience: '10 years', location: 'Patna', contact: '+91-9000011111', lastActive: '1 day ago', recentPosts: 0 },
  { id: 3, name: 'Singh Interiors', role: 'contractor', specialization: 'Carpentry', rating: 4.5, experience: '8 years', location: 'Patna', contact: '+91-9123456789', lastActive: '2 hours ago', recentPosts: 1 },
  // Laborers
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },
  { id: 10, name: 'Amit Kumar', role: 'laborer', specialization: 'Mason', rating: 4.9, experience: '7 years', location: 'Danapur, Patna', contact: '+91-8000000001', lastActive: '30 mins ago' },
  { id: 11, name: 'Vijay Paswan', role: 'laborer', specialization: 'Electrician', rating: 4.7, experience: '5 years', location: 'Kankarbagh, Patna', contact: '+91-8000000002', lastActive: '10 mins ago' },
  { id: 12, name: 'Raju Pandit', role: 'laborer', specialization: 'General Labor', rating: 4.4, experience: '3 years', location: 'Boring Road, Patna', contact: '+91-8000000003', lastActive: '1 hour ago' },

];

// --- CORE LOGIC HOOK ---

export const useHubLogic = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>(MOCK_JOB_POSTS);
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);
  
  // Filtering States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType, setFilterType] = useState('All'); // Labor Type (JobPost) or Specialization (User)
  
  const locations = useMemo(() => ['All', ...new Set(users.map(u => u.location))], [users]);
  const laborTypes = useMemo(() => ['All', ...new Set(MOCK_JOB_POSTS.map(p => p.laborType))], []);
  const specializations = useMemo(() => ['All', ...new Set(users.filter(u => u.role === 'laborer').map(u => u.specialization || 'N/A'))], [users]);

  // Contractor's Data View (Find Laborers)
  const availableLaborers = useMemo(() => {
    return users.filter(user => user.role === 'laborer');
  }, [users]);
  
  const filteredLaborers = useMemo(() => {
    return availableLaborers.filter(laborer => {
      const matchesSearch = laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (laborer.specialization?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = filterLocation === 'All' || laborer.location.includes(filterLocation);
      const matchesType = filterType === 'All' || laborer.specialization === filterType;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [availableLaborers, searchTerm, filterLocation, filterType]);

  // Laborer's Data View (Find Jobs)
  const openJobPosts = useMemo(() => {
    return jobPosts.filter(post => post.status === 'Open');
  }, [jobPosts]);
  
  const filteredJobPosts = useMemo(() => {
    return openJobPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.details.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filterLocation === 'All' || post.location.includes(filterLocation);
      const matchesType = filterType === 'All' || post.laborType === filterType;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [openJobPosts, searchTerm, filterLocation, filterType]);

  // Action: Add a new job post (for Contractor)
  const addJobPost = useCallback((newPost: Omit<JobPost, 'id' | 'postedDate' | 'status'>, contractorId: number) => {
    const post: JobPost = {
      ...newPost,
      id: Date.now(),
      postedDate: new Date().toISOString().split('T')[0],
      status: 'Open',
      contractorId: contractorId,
    };
    setJobPosts(prev => [post, ...prev]);
    alert(`Job Post "${post.title}" created successfully!`);
  }, []);

  return {
    // Data
    jobPosts,
    users,
    filteredLaborers,
    filteredJobPosts,
    
    // Filters & States
    searchTerm,
    setSearchTerm,
    filterLocation,
    setFilterLocation,
    filterType,
    setFilterType,
    
    // Filter Options
    locations,
    laborTypes,
    specializations,

    // Actions
    addJobPost,
  };
};

export type HubLogic = ReturnType<typeof useHubLogic>;