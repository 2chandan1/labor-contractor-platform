import { useState } from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleHome = () => navigate("/");

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
          </nav>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 sm:px-5 py-2 rounded-xl shadow-md hover:shadow-blue-500/30 transition-all"
          >
            Login
          </Button>

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
         
        </div>
      )}
    </header>
  );
};

export default Header;
