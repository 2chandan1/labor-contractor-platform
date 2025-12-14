// src/components/ContractorPage.tsx

import React, { useState } from 'react';
import { Briefcase, User, MapPin, Star, MessageSquare, PlusCircle, Search, Clock } from 'lucide-react';
import type {  JobPost, UserProfile, Role } from '../hooks/useHubLogic';
import { useHubLogic } from '../hooks/useHubLogic';
import ContractorPostForm from './ContractorPostForm'; // Will be defined below

interface ContractorPageProps {
  currentUserId: number;
}

const ContractorPage: React.FC<ContractorPageProps> = ({ currentUserId }) => {
  const { 
    filteredLaborers, 
    jobPosts, 
    searchTerm, setSearchTerm, 
    filterLocation, setFilterLocation, 
    filterType, setFilterType, 
    locations, 
    specializations, 
    addJobPost 
  } = useHubLogic();
  
  const [activeTab, setActiveTab] = useState<'findLabor' | 'myPosts'>('findLabor');

  // Filter contractor's own posts
  const myJobPosts = jobPosts.filter(post => post.contractorId === currentUserId);

  // --- RENDERING COMPONENTS ---

  const LaborerCard: React.FC<{ laborer: UserProfile }> = ({ laborer }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{laborer.name}</h3>
        <div className="flex items-center text-sm font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {laborer.rating}
        </div>
      </div>
      <p className="text-sm text-indigo-600 font-medium my-1">{laborer.specialization}</p>
      <div className="text-sm text-gray-500 space-y-1 mt-3">
        <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-red-500" /> {laborer.location}</p>
        <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-green-500" /> {laborer.experience}</p>
        <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> Active: {laborer.lastActive}</p>
      </div>
      <button className="mt-4 w-full flex items-center justify-center bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md">
        <MessageSquare className="w-5 h-5 mr-2" /> Connect & Chat
      </button>
    </div>
  );

  const PostCard: React.FC<{ post: JobPost }> = ({ post }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${post.status === 'Open' ? 'border-green-500' : 'border-gray-400'}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${post.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {post.status}
        </span>
      </div>
      <p className="text-sm text-indigo-600 font-medium my-1">{post.laborType} ({post.requiredCount} required)</p>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.details}</p>
      <div className="flex justify-between items-center text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
        <p className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {post.location}</p>
        <p>Posted: {post.postedDate}</p>
      </div>
    </div>
  );

  // --- CONTRACTOR RENDER LOGIC ---

  const renderFindLaborView = () => (
    <>
      <div className="flex gap-4 p-4 bg-gray-50 rounded-xl shadow-inner mb-6 flex-wrap text-green-800 ">
        <input 
          type="text" 
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg flex-1 min-w-[200px] focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select 
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-white min-w-[150px] appearance-none cursor-pointer"
        >
          {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>)}
        </select>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-white min-w-[150px] appearance-none cursor-pointer"
        >
          {specializations.map(spec => <option key={spec} value={spec}>{spec === 'All' ? 'All Specializations' : spec}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaborers.length > 0 ? (
          filteredLaborers.map(laborer => (
            <LaborerCard key={laborer.id} laborer={laborer} />
          ))
        ) : (
          <div className="lg:col-span-3 text-center p-10 bg-white rounded-xl shadow-lg text-gray-600">
            <Search className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
            <p>No laborers match your current filters. Try broadening your search.</p>
          </div>
        )}
      </div>
    </>
  );

  const renderMyPostsView = () => (
    <>
      <div className="flex justify-end mb-6">
        {/* Toggle form visibility on button click */}
        <button 
          onClick={() => setActiveTab('newPost')}
          className="flex items-center bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Create New Post
        </button>
      </div>
      
      {myJobPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myJobPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg text-gray-600">
          <Briefcase className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
          <p>You have not created any job posts yet. Click 'Create New Post' to start finding labor.</p>
        </div>
      )}
    </>
  );

  const renderNewPostForm = () => (
    <ContractorPostForm 
      onPostSubmit={(newPost) => {
        addJobPost(newPost, currentUserId);
        setActiveTab('myPosts'); // Switch back to 'My Posts' after submission
      }}
      onCancel={() => setActiveTab('myPosts')}
    />
  );


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">👷 Contractor Dashboard</h1>
      
      <div className="flex border-b border-gray-200 mb-8">
        <TabButton 
          label="Find Laborers" 
          icon={<User className="w-5 h-5 mr-2" />} 
          isActive={activeTab === 'findLabor'} 
          onClick={() => setActiveTab('findLabor')} 
        />
        <TabButton 
          label="My Job Posts" 
          icon={<Briefcase className="w-5 h-5 mr-2" />} 
          isActive={activeTab === 'myPosts' || activeTab === 'newPost'} 
          onClick={() => setActiveTab('myPosts')} 
        />
      </div>

      {activeTab === 'findLabor' && renderFindLaborView()}
      {activeTab === 'myPosts' && renderMyPostsView()}
      {activeTab === 'newPost' && renderNewPostForm()}
    </div>
  );
};

// Simple reusable tab component
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

export default ContractorPage;