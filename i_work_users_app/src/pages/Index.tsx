import { Users, Briefcase, ChevronRight, Target, HeartHandshake, Globe2 } from "lucide-react";
import AuthHeader from '@/components/auth/AuthHeader';
import Footer from '@/components/layout/Footer';

export default function Index({ onSelect, onNavigateToLogin }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* ✅ Header */}
      <AuthHeader
        title="Welcome to i-Work"
        subtitle="Connecting Labourers and Contractors Effortlessly"
        onNavigateToLogin={onNavigateToLogin}
      />

      {/* ✅ Hero + Role Selection in one view */}
      <section className="relative w-full flex flex-col justify-center items-center text-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Soft Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

        {/* Hero Text */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="inline-block bg-blue-500/20 text-blue-200 px-4 py-1 rounded-full font-medium text-sm mb-6 border border-blue-400/20">
            Empowering India’s Workforce
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Empowering <span className="text-blue-400">Labourers</span> & <span className="text-purple-400">Contractors</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join a new era of digital collaboration — connect, manage projects, and grow your future with i-Work.
          </p>
        </div>

        {/* Cards (Visible above the fold) */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
          {/* Labour Card */}
          <div
            onClick={() => onSelect('labour')}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center 
                      transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-blue-600/40 
                      cursor-pointer border border-blue-400/20"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-blue-600/10 to-transparent opacity-0 
                            group-hover:opacity-100 blur-2xl transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center 
                              transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-500/30">
                <Users className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-white">Labour</h2>
              <p className="text-white/80 text-base sm:text-lg max-w-sm mx-auto">
                Connect with contractors and grow your career with verified job opportunities.
              </p>

              {/* Button visible only on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="mt-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 
                                  px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-base font-medium">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contractor Card */}
          <div
            onClick={() => onSelect('contractor')}
            className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-12 text-center 
                      transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-purple-600/40 
                      cursor-pointer border border-purple-400/20"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/10 via-purple-600/10 to-transparent opacity-0 
                            group-hover:opacity-100 blur-2xl transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center 
                              transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-purple-500/30">
                <Briefcase className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-white">Contractor</h2>
              <p className="text-white/80 text-base sm:text-lg max-w-sm mx-auto">
                Post jobs, hire trusted labourers, and manage projects easily from one dashboard.
              </p>

              {/* Button visible only on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="mt-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 
                                  px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-base font-medium">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* ✅ About Section */}
      <section className="w-full bg-slate-800/50 border-t border-slate-700 py-16 px-6 sm:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            About <span className="text-blue-400">i-Work</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            i-Work bridges the gap between contractors and skilled labourers — making collaboration effortless, transparent, and fair for everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl hover:border-blue-400/40 transition-all">
              <Target className="mx-auto mb-3 text-blue-400 w-8 h-8" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-slate-400 text-sm">
                Empower workers and contractors through technology-driven solutions.
              </p>
            </div>
            <div className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl hover:border-purple-400/40 transition-all">
              <HeartHandshake className="mx-auto mb-3 text-purple-400 w-8 h-8" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-slate-400 text-sm">
                Transparency, trust, and growth for every individual.
              </p>
            </div>
            <div className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl hover:border-blue-400/40 transition-all">
              <Globe2 className="mx-auto mb-3 text-blue-400 w-8 h-8" />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-slate-400 text-sm">
                Build a unified network of skilled professionals worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
