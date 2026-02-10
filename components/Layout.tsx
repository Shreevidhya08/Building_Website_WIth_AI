
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, settings, activePage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'Reservations', id: 'reservations' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-2xl font-bold serif ${isScrolled ? 'text-neutral-900' : 'text-white'}`}
          >
            {settings.brandName}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                  activePage === item.id ? 'underline underline-offset-8' : ''
                } ${isScrolled ? 'text-neutral-700' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => onNavigate('reservations')}
              className="px-6 py-2 rounded-full text-white text-sm font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className={`w-6 h-6 ${isScrolled ? 'text-neutral-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-neutral-900 absolute top-full left-0 w-full shadow-lg p-6 flex flex-col space-y-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                className="text-lg text-left font-medium"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => { onNavigate('reservations'); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-md text-white font-bold"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Book a Table
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold serif">{settings.brandName}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Elevating fine dining to an art form. Experience culinary excellence in every bite.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-neutral-500">Links</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><button onClick={() => onNavigate('home')}>Home</button></li>
                <li><button onClick={() => onNavigate('menu')}>Menu</button></li>
                <li><button onClick={() => onNavigate('reservations')}>Reservations</button></li>
                <li><button onClick={() => onNavigate('about')}>About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-neutral-500">Contact</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>{settings.address}</li>
                <li>{settings.phone}</li>
                <li>{settings.email}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-neutral-500">Newsletter</h4>
              <p className="text-sm text-neutral-400 mb-4">Subscribe for special events and menu updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-neutral-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-neutral-500"
                />
                <button 
                  className="px-4 py-2 rounded-r-md text-white text-sm font-bold"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:row justify-between items-center text-xs text-neutral-500 space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
            <div className="flex space-x-6">
              <button onClick={() => onNavigate('privacy')}>Privacy Policy</button>
              <button onClick={() => onNavigate('terms')}>Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Quick Access */}
      <button 
        onClick={() => onNavigate('admin')}
        className="fixed bottom-4 right-4 bg-neutral-900/10 hover:bg-neutral-900/20 text-neutral-400 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 hover:opacity-100"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
      </button>
    </div>
  );
};
