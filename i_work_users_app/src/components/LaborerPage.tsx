// src/components/LaborerPage.tsx

import React, { useState } from 'react';
import { Briefcase, User, MapPin, Star, MessageSquare, Search, Clock, Users } from 'lucide-react';
import type { JobPost, UserProfile } from '../hooks/useHubLogic';
import { useHubLogic } from '../hooks/useHubLogic';

const LaborerPage: React.FC = () => {
  const { 
    filteredJobPosts, 
    users, 
    searchTerm, setSearchTerm, 
    filterLocation, setFilterLocation, 
    filterType, setFilterType, 
    locations, 
    laborTypes,
    specializations
  } = useHubLogic();
  
  const [activeTab, setActiveTab] = useState<'findJobs' | 'viewContractors'>('findJobs');

  const availableContractors = users.filter(user => user.role === 'contractor');
  // NOTE: Laborer's contractor view does not use the hook's primary filters yet, 
  // but we pass them through to maintain consistency.

  // --- RENDERING COMPONENTS ---

  const JobPostCard: React.FC<{ post: JobPost }> = ({ post }) => {
    const contractor = users.find(u => u.id === post.contractorId);
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            {post.laborType}
          </span>
        </div>
        <p className="text-sm text-indigo-600 font-medium my-1">
          Required: {post.requiredCount} person(s)
        </p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.details}</p>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
          <p className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {post.location}</p>
          <p className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Posted: {post.postedDate}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-700">
            <Users className="w-4 h-4 mr-2 text-indigo-500" />
            Posted by: <span className="font-semibold ml-1">{contractor?.name || 'Unknown'}</span>
          </div>
          <button className="flex items-center bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md">
            <MessageSquare className="w-4 h-4 mr-1" /> Apply & Chat
          </button>
        </div>
      </div>
    );
  };

  const ContractorCard: React.FC<{ contractor: UserProfile }> = ({ contractor }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{contractor.name}</h3>
        <div className="flex items-center text-sm font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {contractor.rating}
        </div>
      </div>
      <p className="text-sm text-indigo-600 font-medium my-1">{contractor.specialization || 'General Contractor'}</p>
      <div className="text-sm text-gray-500 space-y-1 mt-3">
        <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-red-500" /> {contractor.location}</p>
        <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-green-500" /> {contractor.experience}</p>
        <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-blue-500" /> Recent Posts: {contractor.recentPosts}</p>
      </div>
      <button className="mt-4 w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md">
        <MessageSquare className="w-5 h-5 mr-2" /> Connect & Chat
      </button>
    </div>
  );

  // --- LABORER RENDER LOGIC ---

  const renderFindJobsView = () => (
    <>
      <div className="flex gap-4 p-4 bg-gray-50 rounded-xl shadow-inner mb-6 flex-wrap">
        <input 
          type="text" 
          placeholder="Search by job title or details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg flex-1 min-w-[200px] focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select 
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-white min-w-[150px] appearance-none cursor-pointer text-green-700"
        >
          {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>)}
        </select>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-white min-w-[150px] appearance-none cursor-pointer text-green-700"
        >
          {laborTypes.map(type => <option key={type} value={type}>{type === 'All' ? 'All Labor Types' : type}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobPosts.length > 0 ? (
          filteredJobPosts.map(post => (
            <JobPostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="lg:col-span-3 text-center p-10 bg-white rounded-xl shadow-lg text-gray-600">
            <Search className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
            <p>No open job posts match your current filters. Try broadening your search.</p>
          </div>
        )}
      </div>
    </>
  );

  const renderViewContractors = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableContractors.map(contractor => (
          <ContractorCard key={contractor.id} contractor={contractor} />
        ))}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">🔨 Laborer Hub</h1>
      
      <div className="flex border-b border-gray-200 mb-8">
        <TabButton 
          label="Find Open Jobs" 
          icon={<Briefcase className="w-5 h-5 mr-2" />} 
          isActive={activeTab === 'findJobs'} 
          onClick={() => setActiveTab('findJobs')} 
        />
        <TabButton 
          label="View Contractors" 
          icon={<Users className="w-5 h-5 mr-2" />} 
          isActive={activeTab === 'viewContractors'} 
          onClick={() => setActiveTab('viewContractors')} 
        />
      </div>

      {activeTab === 'findJobs' && renderFindJobsView()}
      {activeTab === 'viewContractors' && renderViewContractors()}
    </div>
  );
};

// Reusing the TabButton from ContractorPage
const TabButton: React.FC<{ label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
      isActive
        ? 'text-indigo-600 border-b-4 border-indigo-600'
        : 'text-gray-500 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-200'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default LaborerPage;