import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Briefcase, Users, X, Filter, ChevronDown } from 'lucide-react';

export default function LaborContractorFinder() {
  const [selectedCity, setSelectedCity] = useState('Patna');
  const [selectedArea, setSelectedArea] = useState('Danapur');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const cities = ['Patna', 'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad'];
  const areas = {
    Patna: ['Danapur', 'Kankarbagh', 'Boring Road', 'Rajendra Nagar', 'Patna City'],
    Delhi: ['Connaught Place', 'Dwarka', 'Rohini', 'Saket'],
    Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane'],
  };

  const contractorTypes = ['All', 'Individual Contractor', 'Company', 'Labor Supplier'];
  const specializations = [
    'All', 'Civil Work', 'Electrical', 'Plumbing', 'Carpentry', 
    'Painting', 'Masonry', 'Welding', 'General Labor'
  ];

  const contractors = [
    {
      id: 1,
      name: 'Kumar Construction Services',
      type: 'Company',
      specialization: 'Civil Work',
      rating: 4.8,
      reviews: 156,
      experience: '15 years',
      location: 'Danapur, Patna',
      description: 'Expert in residential and commercial construction projects',
      laborCount: 50,
      priceRange: '₹500 - ₹1500/day',
      verified: true,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Rajesh Electrical Works',
      type: 'Individual Contractor',
      specialization: 'Electrical',
      rating: 4.6,
      reviews: 89,
      experience: '10 years',
      location: 'Danapur, Patna',
      description: 'Licensed electrician specializing in home and office wiring',
      laborCount: 8,
      priceRange: '₹600 - ₹1200/day',
      verified: true,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Singh Labor Suppliers',
      type: 'Labor Supplier',
      specialization: 'General Labor',
      rating: 4.5,
      reviews: 203,
      experience: '12 years',
      location: 'Kankarbagh, Patna',
      description: 'Providing skilled and unskilled labor for all types of projects',
      laborCount: 150,
      priceRange: '₹400 - ₹800/day',
      verified: true,
      image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Modern Plumbing Solutions',
      type: 'Company',
      specialization: 'Plumbing',
      rating: 4.7,
      reviews: 124,
      experience: '8 years',
      location: 'Danapur, Patna',
      description: 'Complete plumbing solutions for residential and commercial spaces',
      laborCount: 20,
      priceRange: '₹700 - ₹1500/day',
      verified: true,
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Sharma Painting Contractors',
      type: 'Individual Contractor',
      specialization: 'Painting',
      rating: 4.4,
      reviews: 76,
      experience: '7 years',
      location: 'Boring Road, Patna',
      description: 'Interior and exterior painting with quality finish',
      laborCount: 12,
      priceRange: '₹500 - ₹1000/day',
      verified: false,
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Yadav Carpentry Works',
      type: 'Individual Contractor',
      specialization: 'Carpentry',
      rating: 4.9,
      reviews: 142,
      experience: '18 years',
      location: 'Danapur, Patna',
      description: 'Custom furniture and woodwork specialist',
      laborCount: 6,
      priceRange: '₹800 - ₹1800/day',
      verified: true,
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&h=300&fit=crop'
    }
  ];

  const filteredContractors = contractors.filter(c => {
    const typeMatch = selectedType === 'All' || c.type === selectedType;
    const specMatch = selectedSpecialization === 'All' || c.specialization === selectedSpecialization;
    return typeMatch && specMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between gap-4 max-w-full">
            {/* Logo and City Dropdown */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Briefcase className="w-7 h-7" />
                <span className="text-xl font-bold whitespace-nowrap">LaborHub</span>
              </div>
              
              {/* City Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                  className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 px-3 py-1.5 rounded text-sm font-medium transition whitespace-nowrap"
                >
                  Hire In {selectedCity}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showAreaDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-200 text-gray-800">
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2">SELECT CITY</p>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {cities.map(city => (
                          <button
                            key={city}
                            onClick={() => {
                              setSelectedCity(city);
                              setSelectedArea(areas[city]?.[0] || '');
                            }}
                            className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-purple-50 ${
                              selectedCity === city ? 'bg-purple-50 text-purple-600 font-semibold' : ''
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-3xl bg-white rounded-full shadow-lg overflow-hidden">
              <div className="flex items-center">
                <div className="flex-1 flex items-center px-4 py-2">
                  <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for contractors, labor, services..."
                    className="flex-1 outline-none text-gray-800 text-sm"
                  />
                </div>
                
                {/* Location Pill */}
                <div className="flex items-center gap-2 px-2 flex-shrink-0">
                  {selectedArea && (
                    <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3" />
                      {selectedArea}
                      <button
                        onClick={() => setSelectedArea('')}
                        className="hover:bg-purple-200 rounded-full p-0.5 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                    className="text-purple-600 hover:bg-purple-50 rounded-full px-2 py-1 text-xs font-medium border border-purple-300 transition whitespace-nowrap"
                  >
                    + Add
                  </button>
                </div>
                
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 font-semibold transition text-sm flex-shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="hidden xl:flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Download App
              </button>
              
              <button className="bg-pink-500 hover:bg-pink-600 px-3 py-1.5 rounded text-xs font-semibold transition whitespace-nowrap">
                List Your Service
                <span className="ml-1 bg-white text-pink-500 text-[10px] px-1 py-0.5 rounded">Free</span>
              </button>
              
              <button className="hidden xl:flex items-center gap-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Saved
              </button>
              
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            {/* Top Row - Logo and Actions */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  <span className="text-lg font-bold">LaborHub</span>
                </div>
                
                {/* City Dropdown - Mobile */}
                <div className="relative">
                  <button
                    onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                    className="flex items-center gap-1 bg-purple-700 hover:bg-purple-800 px-2 py-1 rounded text-xs font-medium transition"
                  >
                    Hire In {selectedCity}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {showAreaDropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200 text-gray-800">
                      <div className="p-3">
                        <p className="text-xs font-semibold text-gray-500 mb-2">SELECT CITY</p>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                          {cities.map(city => (
                            <button
                              key={city}
                              onClick={() => {
                                setSelectedCity(city);
                                setSelectedArea(areas[city]?.[0] || '');
                                setShowAreaDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-purple-50 ${
                                selectedCity === city ? 'bg-purple-50 text-purple-600 font-semibold' : ''
                              }`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-pink-500 hover:bg-pink-600 px-2 py-1 rounded text-xs font-semibold transition whitespace-nowrap">
                  List Service
                  <span className="ml-1 bg-white text-pink-500 text-[10px] px-1 py-0.5 rounded">Free</span>
                </button>
                
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-1.5 rounded transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Bar - Mobile */}
            <div className="bg-white rounded-full shadow-lg overflow-hidden">
              <div className="flex items-center">
                <div className="flex-1 flex items-center px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search contractors, labor..."
                    className="flex-1 outline-none text-gray-800 text-sm"
                  />
                </div>
                
                {/* Location Pill - Mobile */}
                <div className="flex items-center gap-1 px-2">
                  {selectedArea && (
                    <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3" />
                      <span className="hidden sm:inline">{selectedArea}</span>
                      <button
                        onClick={() => setSelectedArea('')}
                        className="hover:bg-purple-200 rounded-full p-0.5 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                    className="text-purple-600 hover:bg-purple-50 rounded-full px-2 py-1 text-xs font-medium border border-purple-300 transition"
                  >
                    + Add
                  </button>
                </div>
                
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 font-semibold transition text-sm">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 overflow-x-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none cursor-pointer hover:border-purple-500"
            >
              {contractorTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none cursor-pointer hover:border-purple-500"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              Experience
              <ChevronDown className="inline w-4 h-4 ml-1" />
            </button>
            
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              Price Range
              <ChevronDown className="inline w-4 h-4 ml-1" />
            </button>
            
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              Verified Only
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredContractors.length}</span> contractors in <span className="font-semibold">{selectedArea}, {selectedCity}</span>
          </p>
          <select className="px-4 py-2 border rounded-lg outline-none cursor-pointer">
            <option>Sort by: Relevance</option>
            <option>Rating: High to Low</option>
            <option>Price: Low to High</option>
            <option>Experience</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredContractors.map(contractor => (
            <div key={contractor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-200">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                  <img
                    src={contractor.image}
                    alt={contractor.name}
                    className="w-full h-full object-cover"
                  />
                  {contractor.verified && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      ✓ Verified
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {contractor.type}
                  </div>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{contractor.name}</h3>
                      <p className="text-sm text-gray-600">{contractor.specialization}</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{contractor.rating}</span>
                      <span className="text-gray-500 text-xs">({contractor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                      <Users className="w-4 h-4" />
                      {contractor.laborCount} workers
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {contractor.location}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3">{contractor.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Price Range</p>
                      <p className="font-semibold text-purple-600">{contractor.priceRange}</p>
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Experience: <span className="font-semibold text-gray-700">{contractor.experience}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you a contractor or labor supplier?</h2>
          <p className="text-lg mb-6 opacity-90">Join our platform and connect with thousands of customers</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Register Your Service for FREE
          </button>
        </div>
      </div>
    </div>
  );
}