import React, { useState, useEffect } from 'react';
import { Phone, Star, Users, MapPin, Plus } from 'lucide-react';

const contractorsData = [
  { id: 1, name: 'Kumar Construction Services', type: 'Company', specialization: 'Civil Work', rating: 4.8, reviews: 156, experience: '15 years', location: 'Danapur, Patna', laborCount: 50, priceRange: '₹500 - ₹1500/day', verified: true, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', lat: 25.6020, lng: 85.1376 },
  { id: 2, name: 'Rajesh Electrical Works', type: 'Individual Contractor', specialization: 'Electrical', rating: 4.6, reviews: 89, experience: '10 years', location: 'Danapur, Patna', laborCount: 8, priceRange: '₹600 - ₹1200/day', verified: true, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', lat: 25.6015, lng: 85.1370 },
  { id: 3, name: 'Singh Labor Suppliers', type: 'Labor Supplier', specialization: 'General Labor', rating: 4.5, reviews: 203, experience: '12 years', location: 'Kankarbagh, Patna', laborCount: 150, priceRange: '₹400 - ₹800/day', verified: true, image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=400&h=300&fit=crop', lat: 25.5930, lng: 85.1260 },
  { id: 4, name: 'Verma Plumbing Services', type: 'Company', specialization: 'Plumbing', rating: 4.3, reviews: 78, experience: '8 years', location: 'Boring Road, Patna', laborCount: 20, priceRange: '₹450 - ₹900/day', verified: true, image: 'https://images.unsplash.com/photo-1596204970369-85c1f299f5e5?w=400&h=300&fit=crop', lat: 25.5970, lng: 85.1400 },
  { id: 5, name: 'Patna Painting Experts', type: 'Individual Contractor', specialization: 'Painting', rating: 4.2, reviews: 45, experience: '5 years', location: 'Rajendra Nagar, Patna', laborCount: 10, priceRange: '₹400 - ₹700/day', verified: true, image: 'https://images.unsplash.com/photo-1581092795361-3d75ef6e2d05?w=400&h=300&fit=crop', lat: 25.5940, lng: 85.1320 },
  { id: 6, name: 'Sharma Carpentry', type: 'Labor Supplier', specialization: 'Carpentry', rating: 4.6, reviews: 90, experience: '10 years', location: 'Patna City', laborCount: 35, priceRange: '₹500 - ₹1000/day', verified: true, image: 'https://images.unsplash.com/photo-1615791020765-c68e9cd79f19?w=400&h=300&fit=crop', lat: 25.6090, lng: 85.1375 },
  { id: 7, name: 'Mishra Masonry', type: 'Company', specialization: 'Masonry', rating: 4.4, reviews: 60, experience: '12 years', location: 'Kankarbagh, Patna', laborCount: 40, priceRange: '₹500 - ₹1100/day', verified: true, image: 'https://images.unsplash.com/photo-1581092580499-b5e85b612ef5?w=400&h=300&fit=crop', lat: 25.5925, lng: 85.1280 },
  { id: 8, name: 'Patna Welding Works', type: 'Individual Contractor', specialization: 'Welding', rating: 4.7, reviews: 70, experience: '9 years', location: 'Boring Road, Patna', laborCount: 12, priceRange: '₹550 - ₹1200/day', verified: true, image: 'https://images.unsplash.com/photo-1596204992072-8cd28c92a0f2?w=400&h=300&fit=crop', lat: 25.5960, lng: 85.1410 },
  { id: 9, name: 'Ravi General Labor', type: 'Labor Supplier', specialization: 'General Labor', rating: 4.5, reviews: 110, experience: '7 years', location: 'Rajendra Nagar, Patna', laborCount: 60, priceRange: '₹400 - ₹800/day', verified: true, image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=400&h=300&fit=crop', lat: 25.5950, lng: 85.1330 },
  { id: 10, name: 'Ankit Electricals', type: 'Individual Contractor', specialization: 'Electrical', rating: 4.3, reviews: 50, experience: '6 years', location: 'Danapur, Patna', laborCount: 15, priceRange: '₹500 - ₹1000/day', verified: true, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', lat: 25.6030, lng: 85.1360 },
];


// Distance calculation
function deg2rad(deg: number) { return deg * (Math.PI / 180); }
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function LaborHubApp() {
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCity, setSelectedCity] = useState('Patna');
  const [selectedArea, setSelectedArea] = useState('Danapur');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postData, setPostData] = useState({ title: '', details: '', city: 'Patna', area: 'Danapur', requiredLabor: '' });

  const itemsPerPage = 10;

  const cities = ['Patna', 'Delhi', 'Mumbai'];
  const areas: { [key: string]: string[] } = {
    Patna: ['Danapur', 'Kankarbagh', 'Boring Road', 'Rajendra Nagar', 'Patna City'],
    Delhi: ['Connaught Place', 'Dwarka', 'Rohini', 'Saket'],
    Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane'],
  };
  const contractorTypes = ['All', 'Individual Contractor', 'Company', 'Labor Supplier'];
  const specializations = ['All', 'Civil Work', 'Electrical', 'Plumbing', 'Carpentry', 'Painting', 'Masonry', 'Welding', 'General Labor'];

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCurrentCoords({ lat, lng });

          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || 'Unknown';
          const area = data.address.suburb || data.address.neighbourhood || 'Unknown';
          setSelectedCity(city);
          setSelectedArea(area);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Filter contractors
  const filteredContractors = contractorsData.filter((c) => {
    const typeMatch = selectedType === 'All' || c.type === selectedType;
    const specMatch = selectedSpecialization === 'All' || c.specialization === selectedSpecialization;
    const searchMatch = c.name.toLowerCase().includes(searchText.toLowerCase());
    let distanceMatch = true;
    if (currentCoords && c.lat && c.lng) {
      const distance = getDistanceFromLatLonInKm(currentCoords.lat, currentCoords.lng, c.lat, c.lng);
      distanceMatch = distance <= 30;
    }
    return typeMatch && specMatch && searchMatch && distanceMatch;
  });

  const totalPages = Math.ceil(filteredContractors.length / itemsPerPage);
  const paginatedData = filteredContractors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePostSubmit = () => {
    console.log('Post Labor Requirement:', postData);
    setShowPostModal(false);
    setPostData({ title: '', details: '', city: selectedCity, area: selectedArea, requiredLabor: '' });
    alert('Labor requirement posted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-teal-700 text-white shadow-lg">
        <div className="px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide">LaborHub</h1>
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search labor by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 rounded-lg outline-none border border-teal-300 bg-teal-50 hover:bg-teal-100"
            />
            <select value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedArea(areas[e.target.value][0]); }} className="px-4 py-2 rounded-lg border border-teal-300 bg-teal-50 hover:bg-teal-100 outline-none">
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
            <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="px-4 py-2 rounded-lg border border-teal-300 bg-teal-50 hover:bg-teal-100 outline-none">
              {areas[selectedCity].map((area) => <option key={area} value={area}>{area}</option>)}
            </select>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-4 py-2 rounded-lg border border-teal-300 bg-teal-50 hover:bg-teal-100 outline-none">
              {contractorTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <select value={selectedSpecialization} onChange={(e) => setSelectedSpecialization(e.target.value)} className="px-4 py-2 rounded-lg border border-teal-300 bg-teal-50 hover:bg-teal-100 outline-none">
              {specializations.map((spec) => <option key={spec} value={spec}>{spec}</option>)}
            </select>
            <button onClick={() => setShowPostModal(true)} className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded text-white">
              <Plus className="w-4 h-4" /> Post Opening
            </button>
          </div>
        </div>
        {currentCoords && <p className="text-sm px-6 py-1 text-teal-100">Current Location: Lat {currentCoords.lat.toFixed(4)}, Lng {currentCoords.lng.toFixed(4)}</p>}
      </header>

      {/* Table */}
      <div className="container mx-auto px-6 py-8">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse text-left bg-white rounded-lg">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Specialization</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Labor Count</th>
                <th className="py-3 px-4">Price Range</th>
                <th className="py-3 px-4">Contact</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 && <tr><td colSpan={7} className="text-center py-6 text-gray-500">No contractors found</td></tr>}
              {paginatedData.map((c) => (
                <tr key={c.id} className="border-b hover:bg-teal-50 transition">
                  <td className="py-3 px-4 font-semibold flex items-center gap-2">
                    <img src={c.image} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" /> {c.name}
                  </td>
                  <td className="py-3 px-4 text-teal-700 font-medium">{c.specialization}</td>
                  <td className="py-3 px-4 flex items-center gap-1 text-gray-600"><MapPin className="w-4 h-4 text-teal-500" />{c.location}</td>
                  <td className="py-3 px-4 flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4" />{c.rating}</td>
                  <td className="py-3 px-4 flex items-center gap-1 text-gray-600"><Users className="w-4 h-4 text-teal-500" />{c.laborCount}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{c.priceRange}</td>
                  <td className="py-3 px-4">
                    <button className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 flex items-center gap-1"><Phone className="w-4 h-4" />Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-white border border-gray-300 hover:bg-teal-50'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post Labor Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Post Labor Requirement</h2>
            <input type="text" placeholder="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <textarea placeholder="Details" value={postData.details} onChange={(e) => setPostData({ ...postData, details: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="number" placeholder="Required Labor Count" value={postData.requiredLabor} onChange={(e) => setPostData({ ...postData, requiredLabor: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <select value={postData.city} onChange={(e) => setPostData({ ...postData, city: e.target.value, area: areas[e.target.value][0] })} className="w-full mb-2 p-2 border rounded">
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <select value={postData.area} onChange={(e) => setPostData({ ...postData, area: e.target.value })} className="w-full mb-4 p-2 border rounded">
              {areas[postData.city].map(area => <option key={area} value={area}>{area}</option>)}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPostModal(false)} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
              <button onClick={handlePostSubmit} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
