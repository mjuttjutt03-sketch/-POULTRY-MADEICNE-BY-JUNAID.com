
import React from 'react';
import { AppRoute } from '../types';

interface HomeViewProps {
  setRoute: (route: AppRoute) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setRoute }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=2000" 
            alt="Poultry Farm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-full text-sm font-semibold mb-6">
              AI-Powered Avian Health
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Protect Your Flock with <span className="text-blue-500">Intelligence</span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Instant diagnostic reports, expert medicine recommendations, and premium poultry healthcare products delivered to your farm gate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setRoute(AppRoute.DIAGNOSTIC)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/20"
              >
                Start AI Diagnosis
              </button>
              <button 
                onClick={() => setRoute(AppRoute.SHOP)}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold transition-all border border-white/20"
              >
                Browse Pharmacy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Accurate Diagnostics', value: '98%', icon: 'fa-check-circle' },
            { label: 'Veterinary Products', value: '500+', icon: 'fa-box-open' },
            { label: 'Happy Farmers', value: '10k+', icon: 'fa-users' },
            { label: 'Global Network', value: '25 Countries', icon: 'fa-globe' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-blue-600 mb-2 transition-transform group-hover:scale-110 duration-300">
                <i className={`fa-solid ${stat.icon} text-2xl`}></i>
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Health Management</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to maintain a productive and healthy poultry farm, integrated into one powerful platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-camera text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Visual Diagnosis</h3>
              <p className="text-slate-600 mb-6">Upload photos of droppings, comb changes, or symptomatic birds for instant disease screening using Gemini 3 Pro.</p>
              <button onClick={() => setRoute(AppRoute.DIAGNOSTIC)} className="text-blue-600 font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Try it now <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-pills text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Certified Pharmacy</h3>
              <p className="text-slate-600 mb-6">Access a full range of antibiotics, vaccines, and supplements with detailed dosage guides for all poultry species.</p>
              <button onClick={() => setRoute(AppRoute.SHOP)} className="text-green-600 font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Shop medicine <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-comment-dots text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">24/7 AI Expert</h3>
              <p className="text-slate-600 mb-6">Talk to Dr. Cluck, our specialized AI veterinarian, for management advice, outbreak prevention, and medical consultations.</p>
              <button onClick={() => setRoute(AppRoute.EXPERT)} className="text-purple-600 font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                Start chat <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
