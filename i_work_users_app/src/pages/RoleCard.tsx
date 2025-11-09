import { ChevronRight } from "lucide-react";

const RoleCard = ({ title, description, icon: Icon, gradient, border, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl p-12 text-center cursor-pointer
                  transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5
                  border ${border} bg-gradient-to-br ${gradient}`}
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl 
                      transition-all duration-700 bg-gradient-to-tr"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-transform 
                        duration-300 group-hover:scale-110 bg-white/10">
          <Icon className="w-12 h-12 text-white" strokeWidth={2} />
        </div>

        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-white/80 text-base sm:text-lg max-w-sm mx-auto">
          {description}
        </p>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          mt-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 
                          px-5 py-2 rounded-lg flex items-center gap-2 text-base font-medium">
          Get Started
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RoleCard;
