
import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import DiagnosticView from './views/DiagnosticView';
import ExpertView from './views/ExpertView';
import ResourceView from './views/ResourceView';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);

  const renderView = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <HomeView setRoute={setCurrentRoute} />;
      case AppRoute.SHOP:
        return <ShopView />;
      case AppRoute.DIAGNOSTIC:
        return <DiagnosticView />;
      case AppRoute.EXPERT:
        return <ExpertView />;
      case AppRoute.RESOURCES:
        return <ResourceView />;
      default:
        return <HomeView setRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRoute={currentRoute} setRoute={setCurrentRoute} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-feather text-blue-500 text-xl"></i>
              <span className="text-xl font-bold text-white">PoultryGuard AI</span>
            </div>
            <p className="text-sm leading-relaxed">
              Leading the way in digital avian healthcare. Empowering farmers with AI-driven diagnostics and high-quality medicines.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Vaccines</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Antibiotics</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Nutraceuticals</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Biosecurity</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Vet Directory</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Dosage Calculator</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest poultry health alerts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 PoultryGuard AI. Not a replacement for physical veterinary examination.
        </div>
      </footer>
    </div>
  );
};

export default App;
