// src/hooks/useLaborHubLogic.ts
import { useState, useEffect, useMemo } from 'react';
import { PostType, ViewMode, contractorsData, initialMyPosts, cities, areas, contractorTypes, specializations, itemsPerPage } from '../constants/data';

interface LaborHubState {
  currentCoords: { lat: number; lng: number } | null;
  selectedCity: string;
  selectedArea: string;
  selectedType: string;
  selectedSpecialization: string;
  searchText: string;
  currentPage: number;
  viewMode: ViewMode;
  showPostModal: boolean;
  myPosts: PostType[];
  postData: Omit<PostType, 'id' | 'postedDate' | 'status' | 'applicants'>;
  paginatedContractors: typeof contractorsData;
  totalContractorPages: number;
  filteredPosts: PostType[];
}

interface LaborHubActions {
  setCurrentCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSpecialization: React.Dispatch<React.SetStateAction<string>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPostData: React.Dispatch<React.SetStateAction<Omit<PostType, 'id' | 'postedDate' | 'status' | 'applicants'>>>;
  handleCityChange: (newCity: string) => void;
  handleAreaChange: (newArea: string) => void;
  handlePostSubmit: () => void;
}

export const useLaborHubLogic = (userRole: 'laborer' | 'contractor'): LaborHubState & LaborHubActions => {
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCity, setSelectedCity] = useState('Patna');
  const [selectedArea, setSelectedArea] = useState('Danapur');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postData, setPostData] = useState<Omit<PostType, 'id' | 'postedDate' | 'status' | 'applicants'>>({ title: '', details: '', city: 'Patna', area: 'Danapur', requiredLabor: '' });
  
  // Initial view based on role
  const initialView: ViewMode = userRole === 'laborer' ? 'find-work' : 'find-labor';
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  
  const [myPosts, setMyPosts] = useState<PostType[]>(initialMyPosts);

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    if (areas[newCity] && areas[newCity].length > 0) {
      setSelectedArea(areas[newCity][0]);
    } else {
      setSelectedArea('');
    }
    setCurrentPage(1);
  };
  
  const handleAreaChange = (newArea: string) => {
    setSelectedArea(newArea);
    setCurrentPage(1);
  };

  // --- Geolocation Logic (for initial location setting) ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { setCurrentCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // --- Filtering Logic ---
  const filteredContractors = useMemo(() => {
    return contractorsData.filter((c) => {
      const typeMatch = selectedType === 'All' || c.type === selectedType;
      const specMatch = selectedSpecialization === 'All' || c.specialization === selectedSpecialization;
      const searchMatch = c.name.toLowerCase().includes(searchText.toLowerCase());
      const cityAreaMatch = selectedArea === '' || (c.location.toLowerCase().includes(selectedCity.toLowerCase()) && c.location.toLowerCase().includes(selectedArea.toLowerCase()));
      return typeMatch && specMatch && searchMatch && cityAreaMatch; 
    });
  }, [selectedType, selectedSpecialization, searchText, selectedCity, selectedArea]);

  const totalContractorPages = Math.ceil(filteredContractors.length / itemsPerPage);
  const paginatedContractors = filteredContractors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filteredPosts = useMemo(() => {
    return myPosts.filter(post => 
      post.city.toLowerCase().includes(selectedCity.toLowerCase()) &&
      post.area.toLowerCase().includes(selectedArea.toLowerCase()) &&
      post.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (viewMode === 'find-work' ? post.status === 'Active' : true) 
    );
  }, [myPosts, selectedCity, selectedArea, searchText, viewMode]);

  // --- Post Submission Logic ---
  const handlePostSubmit = () => {
    const newPost: PostType = {
      id: Date.now(),
      title: postData.title,
      details: postData.details,
      city: postData.city,
      area: postData.area,
      requiredLabor: parseInt(postData.requiredLabor as string) || 1,
      postedDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Active',
      applicants: 0
    };
    setMyPosts([newPost, ...myPosts]);
    setShowPostModal(false);
    setPostData({ title: '', details: '', city: selectedCity, area: selectedArea, requiredLabor: '' });
    alert('Labor requirement posted successfully!');
  };

  // Reset pagination/filters when switching tabs
  useEffect(() => {
    setCurrentPage(1);
    setSearchText('');
    setSelectedType('All');
    setSelectedSpecialization('All');
  }, [viewMode]);


  return {
    currentCoords,
    selectedCity,
    selectedArea,
    selectedType,
    selectedSpecialization,
    searchText,
    currentPage,
    viewMode,
    showPostModal,
    myPosts,
    postData,
    paginatedContractors,
    totalContractorPages,
    filteredPosts,
    setCurrentCoords,
    setSelectedCity,
    setSelectedArea,
    setSelectedType,
    setSelectedSpecialization,
    setSearchText,
    setCurrentPage,
    setViewMode,
    setShowPostModal,
    setPostData,
    handleCityChange,
    handleAreaChange,
    handlePostSubmit,
  };
};