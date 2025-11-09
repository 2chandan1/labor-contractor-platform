import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
  handleLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate= useNavigate();
  const handleLogin=()=>{
    navigate("/login")
  }

  return (
    <header
      className={cn(
       "w-full sticky top-0 z-50 backdrop-blur-md bg-[#0A0F1C]/80  border-white/10 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left Section: Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="w-10 h-10 rounded-xl shadow-md"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm opacity-80">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium hover:text-blue-200 transition-colors">
              About Us
            </button>
            <button className="text-sm font-medium hover:text-blue-200 transition-colors border border-white/30 px-3 py-1 rounded-lg hover:bg-white/10">
              Contact Support
            </button>
          </nav>

          {/* Login Button (Always Visible) */}
          <Button
            onClick={handleLogin}
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-4 sm:px-5 py-2 rounded-xl"
          >
            Login
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-blue-500/30 transition"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700/95 backdrop-blur-sm px-6 py-4 space-y-3 animate-slide-down">
          <button className="block w-full text-left text-white/90 hover:text-white transition">
            About Us
          </button>
          <button className="block w-full text-left text-white/90 hover:text-white transition">
            Contact Support
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
