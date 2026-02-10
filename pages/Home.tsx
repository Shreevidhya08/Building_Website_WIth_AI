
import React from 'react';
import { SiteSettings, MenuItem, Testimonial } from '../types';

interface HomeProps {
  settings: SiteSettings;
  menu: MenuItem[];
  testimonials: Testimonial[];
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ settings, menu, testimonials, onNavigate }) => {
  const popularDishes = menu.filter(item => item.isPopular);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Signature dish background"
          />
        </div>
        <div className="relative z-10 max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl text-white font-bold mb-6 leading-tight">
            Experience Fine Dining <span className="serif italic">Redefined</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light">
            Indulge in a culinary journey where tradition meets innovation, served in an atmosphere of unparalleled elegance.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('reservations')}
              className="px-10 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform w-full md:w-auto"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Book a Table
            </button>
            <button 
              onClick={() => onNavigate('menu')}
              className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all w-full md:w-auto"
            >
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-neutral-100 border-y border-neutral-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold serif">4.9</div>
              <div>
                <div className="flex text-yellow-500">★★★★★</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">Google Reviews</div>
              </div>
            </div>
            <div className="text-neutral-500 font-medium italic">"The gold standard for modern cuisine in the city." — Culinary Gazette</div>
            <div className="flex space-x-12">
               <span className="font-bold opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">MICHELIN 2024</span>
               <span className="font-bold opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">JAMES BEARD</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
            className="rounded-2xl shadow-2xl z-10 relative"
            alt="Chef plating dish"
          />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border-8 border-neutral-200 rounded-2xl -z-0"></div>
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: settings.primaryColor }}>Our Story</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 serif">Passion in every plate, excellence in every detail.</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-6">
            Signature Table began with a simple vision: to create a sanctuary where the finest ingredients from local farms are transformed into artistic culinary experiences.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed mb-10">
            Under the guidance of Executive Chef Alessandro Romano, our kitchen emphasizes seasonality, sustainable sourcing, and a deep respect for classical techniques infused with modern creativity.
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://i.pravatar.cc/150?u=chef" className="w-16 h-16 rounded-full object-cover" alt="Chef" />
            <div>
              <div className="font-bold serif text-xl">Chef Alessandro Romano</div>
              <div className="text-neutral-500 text-sm italic">Executive Chef & Founder</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: settings.primaryColor }}>Recommended</span>
              <h2 className="text-4xl md:text-5xl font-bold serif">Signature Flavors</h2>
            </div>
            <button onClick={() => onNavigate('menu')} className="hidden md:block font-bold border-b-2 pb-1 hover:opacity-70 transition-opacity" style={{ borderColor: settings.primaryColor }}>View Full Menu</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDishes.slice(0, 3).map(dish => (
              <div key={dish.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-square">
                  <img 
                    src={dish.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={dish.name} 
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold serif">{dish.name}</h3>
                  <span className="font-medium" style={{ color: settings.accentColor }}>${dish.price}</span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed">{dish.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience / Gallery Preview */}
      <section className="h-[600px] relative overflow-hidden flex items-center">
         <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550966842-2849a2249865?auto=format&fit=crop&q=80&w=1000)' }}></div>
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&q=80&w=1000)' }}></div>
         </div>
         <div className="container mx-auto px-6 relative z-10 flex justify-center">
            <div className="bg-white/90 backdrop-blur-xl p-12 md:p-16 max-w-2xl text-center rounded-2xl shadow-2xl">
               <h2 className="text-4xl md:text-5xl font-bold serif mb-6">Elegant Atmosphere</h2>
               <p className="text-neutral-600 mb-10 leading-relaxed text-lg">
                  Whether it's an intimate date or a celebratory feast, our thoughtfully designed interior offers the perfect backdrop for unforgettable memories.
               </p>
               <button 
                  onClick={() => onNavigate('reservations')}
                  className="px-10 py-4 rounded-full text-white font-bold uppercase tracking-widest text-xs"
                  style={{ backgroundColor: settings.primaryColor }}
               >
                  Book the experience
               </button>
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-4xl font-bold serif mb-16">Kind Words from Guests</h2>
           <div className="flex overflow-x-auto space-x-8 pb-12 snap-x hide-scrollbar">
              {testimonials.map(t => (
                 <div key={t.id} className="min-w-[300px] md:min-w-[500px] p-10 bg-neutral-50 rounded-3xl snap-center text-left">
                    <div className="text-yellow-500 mb-6">★★★★★</div>
                    <p className="text-lg italic text-neutral-700 mb-8 leading-relaxed">"{t.content}"</p>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-neutral-500 uppercase tracking-widest">{t.role}</div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-neutral-900 text-white text-center">
         <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold serif mb-8">Ready for a table?</h2>
            <p className="text-neutral-400 text-xl mb-12">Reservations are recommended, especially for weekend dinner services.</p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
               <button 
                  onClick={() => onNavigate('reservations')}
                  className="px-12 py-5 rounded-full text-white font-bold text-lg hover:brightness-110 transition-all"
                  style={{ backgroundColor: settings.primaryColor }}
               >
                  Reserve Now
               </button>
               <button 
                  onClick={() => onNavigate('contact')}
                  className="px-12 py-5 rounded-full border border-neutral-700 text-white font-bold text-lg hover:bg-neutral-800 transition-all"
               >
                  Contact Us
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};
