// src/components/ContractorPostForm.tsx

import React, { useState } from 'react';
import type{ JobPost } from '../hooks/useHubLogic'
import { Send, XCircle } from 'lucide-react';

interface ContractorPostFormProps {
  onPostSubmit: (newPost: Omit<JobPost, 'id' | 'postedDate' | 'status' | 'contractorId'>) => void;
  onCancel: () => void;
}

const laborTypes = ['Mason', 'Electrician', 'Carpenter', 'Plumber', 'Welder', 'Painter', 'General Labor'];
const locations = ['Danapur, Patna', 'Kankarbagh, Patna', 'Boring Road, Patna', 'Rajendra Nagar, Patna'];

const ContractorPostForm: React.FC<ContractorPostFormProps> = ({ onPostSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    location: locations[0],
    laborType: laborTypes[0],
    requiredCount: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'requiredCount' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.details || formData.requiredCount < 1) {
        alert("Please fill out all required fields.");
        return;
    }
    // Omit the fields handled by the hook
    const { requiredCount, ...rest } = formData;
    onPostSubmit({ ...rest, requiredCount });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-green-600 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Send className="w-6 h-6 mr-3 text-green-600" /> Post New Job Requirement
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title (e.g., Need 5 Masons)</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="laborType" className="block text-sm font-medium text-gray-700">Labor Type</label>
            <select
              id="laborType"
              name="laborType"
              value={formData.laborType}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer"
            >
              {laborTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="requiredCount" className="block text-sm font-medium text-gray-700">Required Count</label>
            <input
              type="number"
              id="requiredCount"
              name="requiredCount"
              value={formData.requiredCount}
              onChange={handleChange}
              min="1"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Project Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer"
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Job Details</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Provide a detailed description of the work, duration, and payment terms."
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            <XCircle className="w-5 h-5 mr-2" /> Cancel
          </button>
          <button
            type="submit"
            className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            <Send className="w-5 h-5 mr-2" /> Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractorPostForm;