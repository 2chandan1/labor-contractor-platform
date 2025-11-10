import { ChevronRight } from "lucide-react";

const RoleCard = ({ title, description, icon: Icon, gradient, border, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`xs:max-w-xs group relative overflow-hidden rounded-3xl sm:p-10 p-4 text-center cursor-pointer
                  transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5
                  border ${border} bg-gradient-to-br ${gradient}`}
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl 
                      transition-all duration-700 bg-gradient-to-tr"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg transition-transform 
                        duration-300 group-hover:scale-110 bg-white/10">
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        <h2 className="text-xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="text-white/80 text-xs sm:text-lg max-w-sm mx-auto">
          {description}
        </p>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          mt-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 
                          px-5 py-2 rounded-lg flex items-center gap-2 sm:text-base text-xs font-medium">
          Get Started
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RoleCard;
