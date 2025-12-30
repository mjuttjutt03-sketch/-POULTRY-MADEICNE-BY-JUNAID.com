
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

const ShopView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Vaccines', 'Antibiotics', 'Vitamins', 'Dewormers'];

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Avian Pharmacy</h2>
          <p className="text-slate-600">Premium medicines and supplements for healthy flocks.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-2 right-2">
                <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{product.description}</p>
              
              <div className="mt-auto">
                <div className="mb-4">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-1">Indications</div>
                  <div className="text-xs text-slate-600 italic">{product.indication}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-plus text-xs"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopView;
