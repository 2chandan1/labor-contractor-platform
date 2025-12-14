import React, { useState, useEffect } from 'react';
import { Phone, Star, Users, MapPin, Plus, Briefcase, Clock, CheckCircle, Search, List, Send, Archive } from 'lucide-react';

// --- TYPES & DATA ---

type ViewMode = 'find-labor' | 'my-posts' | 'find-work' | 'view-contractors'; 

type PostType = {
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

const contractorsData = [
  { id: 1, name: 'Kumar Construction Services', type: 'Company', specialization: 'Civil Work', rating: 4.8, reviews: 156, experience: '15 years', location: 'Danapur, Patna', laborCount: 50, priceRange: '₹500 - ₹1500/day', verified: true, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', lat: 25.6020, lng: 85.1376 },
  { id: 2, name: 'Rajesh Electrical Works', type: 'Individual Contractor', specialization: 'Electrical', rating: 4.6, reviews: 89, experience: '10 years', location: 'Danapur, Patna', laborCount: 8, priceRange: '₹600 - ₹1200/day', verified: true, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', lat: 25.6015, lng: 85.1370 },
  { id: 3, name: 'Singh Labor Suppliers', type: 'Labor Supplier', specialization: 'General Labor', rating: 4.5, reviews: 203, experience: '12 years', location: 'Kankarbagh, Patna', laborCount: 150, priceRange: '₹400 - ₹800/day', verified: true, image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=400&h=300&fit=crop', lat: 25.5930, lng: 85.1260 },
  { id: 4, name: 'Verma Plumbing Services', type: 'Company', specialization: 'Plumbing', rating: 4.3, reviews: 78, experience: '8 years', location: 'Boring Road, Patna', laborCount: 20, priceRange: '₹450 - ₹900/day', verified: true, image: 'https://images.unsplash.com/photo-1596204970369-85c1f299f5e5?w=400&h=300&fit=crop', lat: 25.5970, lng: 85.1400 },
];

const initialMyPosts: PostType[] = [
  { id: 101, title: 'Need 5 Masons for 3 Months', details: 'Looking for experienced masons for a commercial building project near Danapur. Long term work available for the right team.', city: 'Patna', area: 'Danapur', requiredLabor: 5, postedDate: '10/Dec/2025', status: 'Active', applicants: 12 },
  { id: 102, title: 'Urgent: Electrician for Residential Wiring', details: 'Individual electrician needed for house wiring in Kankarbagh. Must have own tools and 3+ years experience.', city: 'Patna', area: 'Kankarbagh', requiredLabor: 1, postedDate: '01/Dec/2025', status: 'Completed', applicants: 5 },
  { id: 103, title: 'General Labor for Site Cleanup', details: '10 General Laborers required for site cleanup and material movement in Boring Road for 1 week.', city: 'Patna', area: 'Boring Road', requiredLabor: 10, postedDate: '05/Dec/2025', status: 'Active', applicants: 25 },
];

function deg2rad(deg: number) { return deg * (Math.PI / 180); }
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// --- MODULAR COMPONENTS (Unchanged) ---

const Filters = ({ selectedType, setSelectedType, selectedSpecialization, setSelectedSpecialization, contractorTypes, specializations }: any) => (
  <>
    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
    className="px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-800 shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-300 outline-none appearance-none cursor-pointer">
      {contractorTypes.map((type: string) => <option key={type} value={type}>{type}</option>)}
    </select>
    <select value={selectedSpecialization} onChange={(e) => setSelectedSpecialization(e.target.value)}
      className="px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-800 shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-300 outline-none appearance-none cursor-pointer">
      {specializations.map((spec: string) => <option key={spec} value={spec}>{spec}</option>)}
    </select>
  </>
);

const LocationSelectors = ({ selectedCity, selectedArea, handleCityChange, handleAreaChange, cities, areas }: any) => (
  <>
    <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}
    className="px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-800 shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-300 outline-none appearance-none cursor-pointer">
      {cities.map((city: string) => <option key={city} value={city}>{city}</option>)}
    </select>
    <select value={selectedArea} onChange={(e) => handleAreaChange(e.target.value)}
    className='px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-800 shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-300 outline-none appearance-none cursor-pointer'>
      {areas[selectedCity]?.map((area: string) => <option key={area} value={area}>{area}</option>)}
    </select>
  </>
);

const Pagination = ({ currentPage, totalPages, setCurrentPage }: any) => (
  totalPages > 1 ? (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md ${currentPage === i + 1 ? 'bg-indigo-600 text-white ring-2 ring-indigo-300' : 'bg-white border border-gray-300 text-indigo-600 hover:bg-indigo-100 hover:shadow-lg'}`}>
          {i + 1}
        </button>
      ))}
    </div>
  ) : null
);

const ContractorTable = ({ data }: any) => (
  <div className="overflow-x-auto shadow-2xl rounded-xl">
    <table className="min-w-full border-collapse text-left bg-white rounded-xl">
      <thead className="bg-indigo-700 text-white sticky top-0">
        <tr>
          <th className="py-3 px-4 rounded-tl-xl">Name</th>
          <th className="py-3 px-4">Specialization</th>
          <th className="py-3 px-4">Location</th>
          <th className="py-3 px-4">Rating</th>
          <th className="py-3 px-4">Labor Count</th>
          <th className="py-3 px-4">Price Range</th>
          <th className="py-3 px-4 rounded-tr-xl">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && <tr><td colSpan={7} className="text-center py-10 text-xl text-gray-500">No contractors found matching your criteria.</td></tr>}
        {data.map((c: any, index: number) => (
          <tr key={c.id} className={`border-b border-gray-100 transition-all duration-200 hover:bg-indigo-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="py-3 px-4 font-semibold flex items-center gap-3">
              <img src={c.image} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300 shadow-md" /> 
              <div className="flex flex-col">
                <span className="text-gray-900">{c.name}</span>
                <span className="text-xs text-gray-500 font-normal">{c.type} - {c.experience}</span>
              </div>
            </td>
            <td className="py-3 px-4 text-indigo-700 font-medium">{c.specialization}</td>
            <td className="py-3 px-4 gap-1 text-gray-600"><MapPin className="w-4 h-4 text-indigo-500 inline mr-1" />{c.location}</td>
            <td className="py-3 px-4 gap-1 text-yellow-500 font-bold"><Star className="w-4 h-4 inline mr-1" />{c.rating}</td>
            <td className="py-3 px-4 gap-1 text-gray-600"><Users className="w-4 h-4 text-indigo-500 inline mr-1" />{c.laborCount}</td>
            <td className="py-3 px-4 font-extrabold text-indigo-800">{c.priceRange}</td>
            <td className="py-3 px-4">
              <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-full shadow-md hover:bg-indigo-700 flex items-center gap-1 transition-colors duration-200 transform hover:scale-105">
                <Phone className="w-4 h-4" />Contact
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState = ({ icon: Icon, title, description, buttonText, onButtonClick }: any) => (
  <div className="bg-white rounded-xl shadow-lg p-12 text-center border-t-4 border-indigo-500">
    <Icon className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6">{description}</p>
    {buttonText && (
      <button onClick={onButtonClick}
      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
        {buttonText}
      </button>
    )}
  </div>
);

const PostCard = ({ post, isLaborView = false }: { post: PostType, isLaborView?: boolean }) => {
  const statusColor = post.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-0.5 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {isLaborView ? 'Open' : post.status}
        </span>
        
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.details}</p>
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span>{post.area}, {post.city}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4 text-indigo-500" />
          <span>{post.requiredLabor} {isLaborView ? 'positions available' : 'workers needed'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>Posted on {post.postedDate}</span>
        </div>
      </div>

      {isLaborView ? (
        <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md">
          <Send className="w-5 h-5" />
          Apply Now
        </button>
      ) : (
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm font-semibold text-indigo-600">{post.applicants} applicants</p>
          <button className="text-sm text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
            <List className="w-4 h-4" /> View Applicants
          </button>
        </div>
      )}
    </div>
  );
};

const PostList = ({ posts, isLaborView, handlePostClick, emptyIcon, emptyTitle, emptyDescription, emptyButtonText, onEmptyButtonClick }: {
  posts: PostType[];
  isLaborView: boolean;
  handlePostClick?: (post: PostType) => void;
  emptyIcon: any;
  emptyTitle: string;
  emptyDescription: string;
  emptyButtonText?: string;
  onEmptyButtonClick?: () => void;
}) => {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        buttonText={emptyButtonText}
        onButtonClick={onEmptyButtonClick}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <div key={post.id} onClick={() => handlePostClick && handlePostClick(post)}>
          <PostCard post={post} isLaborView={isLaborView} />
        </div>
      ))}
    </div>
  );
};

const ContractorDetailsCard = ({ contractor }: any) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.01] border-t-4 border-indigo-600">
    <div className="flex items-start gap-4 mb-4">
      <img src={contractor.image} alt={contractor.name} className="w-16 h-16 rounded-full object-cover border-3 border-indigo-400 shadow-md flex-shrink-0" />
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          {contractor.name}
          {contractor.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>}
        </h3>
        <p className="text-sm text-indigo-600 font-semibold mt-1">{contractor.specialization} - {contractor.type}</p>
      </div>
    </div>
    

    <div className="space-y-3 mb-5 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-yellow-500" />
        <span>Rating: <strong className="text-gray-800">{contractor.rating}</strong> ({contractor.reviews} reviews)</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-indigo-500" />
        <span>{contractor.location} ({contractor.experience} experience)</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-indigo-500" />
        <span>Team Size: <strong className="text-gray-800">{contractor.laborCount}+</strong></span>
      </div>
    </div>

    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
      <a href="tel:1234567890" className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 flex items-center gap-2 transition-colors duration-200 transform hover:scale-105 font-semibold">
        <Phone className="w-4 h-4" /> Call Contractor
      </a>
      <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
        View Full Profile
      </button>
    </div>
  </div>
);

const ViewContractors = ({ data, emptyIcon, emptyTitle, emptyDescription }: any) => {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((contractor: any) => (
        <ContractorDetailsCard key={contractor.id} contractor={contractor} />
      ))}
      
    </div>
  );
};


const PostModal = ({ show, onClose, postData, setPostData, cities, areas, onSubmit }: any) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl transform scale-100 transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-5 text-indigo-700">Post Labor Requirement</h2>
        <input type="text" placeholder="Title (e.g., Need 5 Masons for 3 months)" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
        <textarea placeholder="Detailed description of the job..." value={postData.details} onChange={(e) => setPostData({ ...postData, details: e.target.value })} className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" rows={3} />
        <input type="number" placeholder="Required Labor Count" value={postData.requiredLabor} onChange={(e) => setPostData({ ...postData, requiredLabor: e.target.value })} className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
        
        <select value={postData.city} onChange={(e) => setPostData({ ...postData, city: e.target.value, area: areas[e.target.value]?.[0] || postData.area })} className="w-full mb-3 p-3 border border-gray-300 rounded-lg bg-white outline-none appearance-none focus:ring-indigo-500 focus:border-indigo-500">
          {cities.map((city: string) => <option key={city} value={city}>{city}</option>)}
        </select>
        <select value={postData.area} onChange={(e) => setPostData({ ...postData, area: e.target.value })} className="w-full mb-5 p-3 border border-gray-300 rounded-lg bg-white outline-none appearance-none focus:ring-indigo-500 focus:border-indigo-500">
          {areas[postData.city]?.map((area: string) => <option key={area} value={area}>{area}</option>)}
        </select>
        
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition-colors duration-200">Post Requirement</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT (Updated) ---

export default function LaborHubApp({ userRole }: { userRole: 'laborer' | 'contractor' }) {
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCity, setSelectedCity] = useState('Patna');
  const [selectedArea, setSelectedArea] = useState('Danapur');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postData, setPostData] = useState<Omit<PostType, 'id' | 'postedDate' | 'status' | 'applicants'>>({ title: '', details: '', city: 'Patna', area: 'Danapur', requiredLabor: '' });
  
  // **UPDATED LOGIC:** Set initial view based on userRole prop
  const [viewMode, setViewMode] = useState<ViewMode>(
    userRole === 'laborer' ? 'find-work' : 'find-labor'
  );
  
  const [myPosts, setMyPosts] = useState<PostType[]>(initialMyPosts);

  const itemsPerPage = 10;

  const cities = ['Patna', 'Delhi', 'Mumbai'];
  const areas: { [key: string]: string[] } = {
    Patna: ['Danapur', 'Kankarbagh', 'Boring Road', 'Rajendra Nagar', 'Patna City'],
    Delhi: ['Connaught Place', 'Dwarka', 'Rohini', 'Saket'],
    Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane'],
  };
  const contractorTypes = ['All', 'Individual Contractor', 'Company', 'Labor Supplier'];
  const specializations = ['All', 'Civil Work', 'Electrical', 'Plumbing', 'Carpentry', 'Painting', 'Masonry', 'Welding', 'General Labor'];

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

  useEffect(() => {
    // Geolocation logic (kept for context)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCurrentCoords({ lat, lng });

          try {
            const city = 'Patna'; 
            const area = 'Danapur'; 
            
            if (cities.includes(city)) {
              setSelectedCity(city);
              if (areas[city]?.includes(area)) {
                setSelectedArea(area);
              } else {
                setSelectedArea(areas[city]?.[0] || '');
              }
            }
          } catch (error) {
            console.error("Error fetching location details:", error);
          }
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // --- Filtering Logic for Contractors ---
  const filteredContractors = contractorsData.filter((c) => {
    const typeMatch = selectedType === 'All' || c.type === selectedType;
    const specMatch = selectedSpecialization === 'All' || c.specialization === selectedSpecialization;
    const searchMatch = c.name.toLowerCase().includes(searchText.toLowerCase());
    const cityAreaMatch = selectedArea === '' || c.location.toLowerCase().includes(selectedCity.toLowerCase()) && c.location.toLowerCase().includes(selectedArea.toLowerCase());

    return typeMatch && specMatch && searchMatch && cityAreaMatch; 
  });

  const totalPages = Math.ceil(filteredContractors.length / itemsPerPage);
  const paginatedData = filteredContractors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- Filtering Logic for Job Posts ---
  const filteredPosts = myPosts.filter(post => 
    post.city.toLowerCase().includes(selectedCity.toLowerCase()) &&
    post.area.toLowerCase().includes(selectedArea.toLowerCase()) &&
    post.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (viewMode === 'find-work' ? post.status === 'Active' : true) 
  );

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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="sticky top-0 z-10 bg-indigo-600 text-white shadow-xl transition-colors duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
              <h1 className="text-3xl font-extrabold tracking-tight cursor-pointer hover:text-indigo-200 transition-colors">LaborHub</h1>
              {currentCoords && <p className="text-sm text-indigo-200 mt-1 lg:mt-0">Location: {selectedArea}, {selectedCity}</p>}
            </div>
			

            <div className="flex gap-2 bg-indigo-700 p-1 rounded-lg">
              <button onClick={() => setViewMode('find-labor')} className={`px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'find-labor' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-indigo-600'}`}>
                Find Labor
              </button>
              <button onClick={() => setViewMode('my-posts')} className={`px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'my-posts' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-indigo-600'}`}>
                My Posts
              </button>
              <button onClick={() => setViewMode('find-work')} className={`px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'find-work' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-indigo-600'}`}>
                Find Work (Jobs)
              </button>
              <button onClick={() => setViewMode('view-contractors')} className={`px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'view-contractors' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-indigo-600'}`}>
                View Contractors
              </button>
            </div>
          </div>

          {(viewMode === 'find-labor' || viewMode === 'find-work' || viewMode === 'view-contractors') && (
            <div className="flex gap-3 flex-wrap justify-center lg:justify-end mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    viewMode === 'find-labor' ? "Search Labor..." :
                    viewMode === 'view-contractors' ? "Search Employer/Company..." :
                    "Search Job Openings..."
                  }
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg outline-none border border-indigo-300 bg-white text-indigo-800 placeholder-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-300 transition-all duration-200 w-full lg:w-64"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              </div>
              
              <LocationSelectors 
                selectedCity={selectedCity}
                selectedArea={selectedArea}
                handleCityChange={handleCityChange}
                handleAreaChange={handleAreaChange}
                cities={cities}
                areas={areas}
              />

              {(viewMode === 'find-labor' || viewMode === 'view-contractors') && ( 
                <Filters 
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  selectedSpecialization={selectedSpecialization}
                  setSelectedSpecialization={setSelectedSpecialization}
                  contractorTypes={contractorTypes}
                  specializations={specializations}
                />
              )}
              
              {viewMode === 'find-labor' && (
                <button onClick={() => setShowPostModal(true)} 
                className="flex items-center gap-1 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-transparent hover:border-indigo-700">
                  <Plus className="w-4 h-4" /> Post Opening
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'find-labor' && (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-indigo-800 flex items-center gap-2">
                <Users className="w-6 h-6"/> Available Labor & Contractors
            </h2>
            <ContractorTable data={paginatedData} />
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </>
        )}

        {viewMode === 'my-posts' && (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-indigo-800 flex items-center gap-2">
                <List className="w-6 h-6"/> My Posted Requirements
            </h2>
            <PostList
                posts={filteredPosts}
                isLaborView={false} 
                emptyIcon={Briefcase}
                emptyTitle="No Posts Yet"
                emptyDescription="Start posting your labor requirements to connect with workers"
                emptyButtonText="Post Your First Requirement"
                onEmptyButtonClick={() => { setViewMode('find-labor'); setShowPostModal(true); }}
            />
          </>
        )}
        
        {viewMode === 'find-work' && (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-indigo-800 flex items-center gap-2">
                <Briefcase className="w-6 h-6"/> Find Work (Job Openings)
            </h2>
            <PostList
                posts={filteredPosts}
                isLaborView={true} 
                emptyIcon={Search}
                emptyTitle="No Active Job Openings"
                emptyDescription="Try adjusting your location or check back later for new posts."
            />
          </>
        )}
        
        {viewMode === 'view-contractors' && (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-indigo-800 flex items-center gap-2">
                <Users className="w-6 h-6"/> Find Potential Employers
            </h2>
            <ViewContractors
              data={paginatedData} 
              emptyIcon={Search}
              emptyTitle="No Contractors Found"
              emptyDescription="Adjust your specialization or location filters to broaden your search."
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </>
        )}
      </div>

      <PostModal 
        show={showPostModal}
        onClose={() => setShowPostModal(false)}
        postData={postData}
        setPostData={setPostData}
        cities={cities}
        areas={areas}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
}

// Example usage when calling the component (not part of the component itself):
// <LaborHubApp userRole="laborer" /> // Will default to 'find-work'
// <LaborHubApp userRole="contractor" /> // Will default to 'find-labor'