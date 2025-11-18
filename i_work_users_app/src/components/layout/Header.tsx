import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Menu, Phone, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../utils/constants";
import {Trans, useTranslation} from 'react-i18next';
import i18n from "../../i18n";
interface HeaderProps {
  title: string;
  subtitle?: string;
}
type AppLanguage = "en" | "hi" | "mr" | "tm" | "bn"| "kn" |"ta";

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn]=useState(false);
   const {t}=useTranslation();
   const LANGUAGES:  Record<AppLanguage, string> = {
      en: "English",
      hi: "हिन्दी",
      mr: "मराठी",
      tm: "தமிழ்", // Tamil
      bn: "বাংলা",  // Bangali
      kn: "ಕನ್ನಡ", // Kannada
      ta: "తెలుగు", // Telugu
    };
  const navigate = useNavigate();
  useEffect(()=>{
    const checkAuth=()=>{
      const token=localStorage.getItem(STORAGE_KEYS.TOKEN);
      setIsLoggedIn(!!token)
    };
    checkAuth();
    window.addEventListener("login-status-changed",checkAuth)
    return()=>{
      window.removeEventListener("login-status-changed",checkAuth);
    }
  },[])

  const handleLogin = () => navigate("/login");
  const handleHome = () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!isLoggedIn || !userStr) {
      navigate("/");
      return;
    }
    const user = JSON.parse(userStr);
    switch (user.user.role){
      case "labour":
        navigate("/labour");
        break;
      case "contractor":
        navigate("/contractor");
        break;
      default:
        navigate("/");
    }
  }
  const handleLogout=()=>{
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    setIsLoggedIn(false)
    navigate("/")
  }
  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 backdrop-blur-md bg-[#0A0F1C]/80 border-b border-white/10 shadow-lg"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        <div
          onClick={handleHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/logo2.png"
            alt="Company Logo"
            className="w-10 h-10 rounded-xl shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="sm:block hidden" >
            <h1 className="text-lg sm:text-xl font-bold leading-tight text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-300">{subtitle}</p>
            )}
          </div>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">

            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              About Us
            </button>
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Contact Support
            </button>
            <a href="tel:18001080" className="inline-flex">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1.5 rounded-full shadow-md cursor-pointer select-none">
                <div className="bg-orange-700/40 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-semibold text-sm tracking-wide select-none">
                  1800 1080
                </span>
              </div>
            </a>
          </nav>
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-300 hover:text-white transition text-sm font-medium">
              🌐 {LANGUAGES[i18n.language as AppLanguage]}
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="
              absolute right-0 mt-2 w-32 
              bg-[#0A0F1C]/95 backdrop-blur-xl
              border border-white/10 rounded-xl shadow-lg 
              opacity-0 scale-95 translate-y-1 
              group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
              transition-all duration-200 
              z-50
              ">
              {Object.entries(LANGUAGES).map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  className={`
                    w-full text-left px-4 py-2 text-sm rounded-lg
                    hover:bg-white/10 transition
                    ${i18n.language === code ? "text-orange-400 font-semibold" : "text-gray-300"}
                  `}
                >
                  {label}
                </button>
              ))}
                
            </div>
          </div>
          {!isLoggedIn ? (
            <Button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 sm:px-5 py-2 rounded-xl shadow-md hover:shadow-blue-500/30 transition-all"
            >
              Login
            </Button>
            ):(
              <div className="flex items-center gap-3">
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl">
                Logout
                </Button>
              </div>
            )}
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-[#0A0F1C]/95 border-t border-white/10 backdrop-blur-md px-6 py-4 space-y-3 animate-slide-down text-gray-200"
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left hover:text-white transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left hover:text-white transition-colors"
          >
            Contact Support
          </button>
         

          <a href="tel:18001080" className="inline-flex">
            <Button variant="default" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1.5 rounded-full shadow-md cursor-pointer select-none">
              <div className="bg-orange-700/40 p-2 rounded-full">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide select-none">
                1800 1080
              </span>
            </Button>
          </a> 
        </div>
      )}
     <div className="w-full bg-orange-600/20 backdrop-blur-sm border-b border-orange-500/30">
        <div className="overflow-hidden whitespace-nowrap relative">
          <p className="marquee py-2 text-sm text-orange-400 font-medium">
            <Trans
              i18nKey="header.helpline"
              components={{
                strong: <span className="font-semibold text-white" />
              }}
            />
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
