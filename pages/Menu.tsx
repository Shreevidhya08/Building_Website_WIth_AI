
import React, { useState } from 'react';
import { MenuItem, SiteSettings } from '../types';

interface MenuProps {
  menu: MenuItem[];
  settings: SiteSettings;
}

export const Menu: React.FC<MenuProps> = ({ menu, settings }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];
  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold serif mb-6">Culinary Selection</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto italic">
            Each dish is crafted with precision, passion, and the finest seasonal ingredients.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'text-white shadow-lg scale-105' 
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
              }`}
              style={{ backgroundColor: activeCategory === cat ? settings.primaryColor : undefined }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 xl:gap-20">
          {filteredMenu.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
              <div className="w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
              </div>
              <div className="flex-grow pt-2">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-2xl font-bold serif">{item.name}</h3>
                  <div className="flex-grow mx-4 border-b border-dotted border-neutral-300"></div>
                  <span className="text-xl font-bold" style={{ color: settings.accentColor }}>${item.price}</span>
                </div>
                <p className="text-neutral-500 mb-4">{item.description}</p>
                {item.isPopular && (
                  <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-200">
                    Chef's Favorite
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
