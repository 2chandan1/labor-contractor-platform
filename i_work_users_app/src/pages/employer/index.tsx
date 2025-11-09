import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Briefcase, Users, X, Filter, ChevronDown } from 'lucide-react';

export default function index() {
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8" />
              <h1 className="text-2xl font-bold">LaborHub</h1>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              List Your Service
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 bg-white rounded-lg shadow-lg p-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for contractors, labor, services..."
                  className="flex-1 bg-transparent outline-none text-gray-800"
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition"
                >
                  <MapPin className="w-5 h-5" />
                  {selectedArea}
                  {selectedArea && (
                    <X
                      className="w-4 h-4 hover:text-purple-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArea('');
                      }}
                    />
                  )}
                </button>
                
                {showAreaDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <div className="p-3 border-b">
                      <p className="text-sm font-semibold text-gray-700">Select City</p>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Select Area</p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {(areas[selectedCity] || []).map(area => (
                          <button
                            key={area}
                            onClick={() => {
                              setSelectedArea(area);
                              setShowAreaDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded hover:bg-purple-50 text-gray-700 text-sm"
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                Search
              </button>
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