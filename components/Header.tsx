
import React from 'react';
import { AppRoute } from '../types';

interface HeaderProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, setRoute }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRoute(AppRoute.HOME)}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fa-solid fa-feather text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              PoultryGuard AI
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {[
              { id: AppRoute.HOME, label: 'Home', icon: 'fa-house' },
              { id: AppRoute.SHOP, label: 'Pharmacy', icon: 'fa-pills' },
              { id: AppRoute.DIAGNOSTIC, label: 'AI Vet', icon: 'fa-stethoscope' },
              { id: AppRoute.EXPERT, label: 'Expert Chat', icon: 'fa-comment-medical' },
              { id: AppRoute.RESOURCES, label: 'Resources', icon: 'fa-book' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setRoute(item.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentRoute === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-blue-600">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button className="md:hidden text-slate-600">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
