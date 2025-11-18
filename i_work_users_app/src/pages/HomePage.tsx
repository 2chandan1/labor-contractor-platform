import { Users, Briefcase, Target, HeartHandshake, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoleCard from "./RoleCard";
import {Trans, useTranslation} from 'react-i18next';

export default function HomePage({ onSelect }) {
  const navigate = useNavigate();
  const {t}=useTranslation();
  const handleSelect = (type) => {
    localStorage.setItem("userType", type);
    onSelect(type);
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
     <section className="relative w-full flex flex-col justify-center items-center text-center pt-6 pb-16 px-3 sm:px-6 lg:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2  h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="inline-block bg-blue-500/20 text-blue-200 px-4 py-1 rounded-full font-medium text-sm mb-6 border border-blue-400/20">
            {t("home.tagline")} 
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            <Trans i18nKey="home.hero.heading" components={{
              blue:<span className="text-blue-400"/>,
              purple:<span className="text-purple-400"/>
            }}/>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("home.hero.description")}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto sm:mt-4 ">
          
          <RoleCard
            title={t("home.roles.labour.title")}
            icon={Users}
            gradient="from-blue-600 to-blue-800"
            border="border-blue-400/20"
            description={t("home.roles.labour.description")}
            onClick={() => handleSelect("labour")}
          />

          <RoleCard
            title={t("home.roles.contractor.title")}
            icon={Briefcase}
            gradient="from-purple-600 to-purple-800"
            border="border-purple-400/20"
            description={t("home.roles.contractor.description")}
            onClick={() => handleSelect("contractor")}
          />

        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-slate-800/50 border-t border-slate-700 sm:py-16 py-8 px-6 sm:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-6">
            About <span className="text-blue-400">i-Work</span>
          </h2>

          <p className="text-slate-300 sm:text-lg text-sm max-w-3xl mx-auto mb-10 leading-relaxed">
           {t("home.about.description")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard icon={Target} title={t("home.about.mission")} text={t("home.about.missionText")} />
            <FeatureCard icon={HeartHandshake} title={t("home.about.values")}text={t("home.about.valuesText")} />
            <FeatureCard icon={Globe2} title={t("home.about.vision")} text={t("home.about.visionText")} />
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="sm:p-6 p-4 bg-slate-900/60 border border-slate-700 rounded-2xl hover:border-blue-400/40 transition-all">
      <Icon className="mx-auto mb-3 w-8 h-8 text-blue-400" />
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{text}</p>
    </div>
  );
}
