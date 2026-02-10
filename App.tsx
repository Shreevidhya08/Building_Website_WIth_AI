
import React, { useState } from 'react';
import { useStore } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Reservations } from './pages/Reservations';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            settings={store.settings} 
            menu={store.menu} 
            testimonials={store.testimonials}
            onNavigate={handleNavigate}
          />
        );
      case 'menu':
        return <Menu menu={store.menu} settings={store.settings} />;
      case 'reservations':
        return (
          <Reservations 
            settings={store.settings} 
            onSubmit={store.addReservation} 
          />
        );
      case 'admin':
        return (
          <Admin 
            reservations={store.reservations}
            onUpdateReservation={store.updateReservationStatus}
            menu={store.menu}
            onUpdateMenu={store.updateMenu}
            settings={store.settings}
            onUpdateSettings={store.updateSettings}
            contacts={store.contacts}
          />
        );
      case 'contact':
        return (
          <div className="pt-32 pb-24 container mx-auto px-6">
            <h1 className="text-5xl font-bold serif mb-10">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <p className="text-lg text-neutral-600 mb-8">We would love to hear from you. For press inquiries, private events, or feedback, please reach out.</p>
                  <div className="space-y-4">
                     <div>
                        <div className="font-bold text-neutral-400 text-xs uppercase tracking-widest mb-1">Email</div>
                        <div>{store.settings.email}</div>
                     </div>
                     <div>
                        <div className="font-bold text-neutral-400 text-xs uppercase tracking-widest mb-1">Call</div>
                        <div>{store.settings.phone}</div>
                     </div>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-lg border">
                  <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-6">
                    <input placeholder="Name" className="w-full p-4 border rounded-xl" required />
                    <input type="email" placeholder="Email" className="w-full p-4 border rounded-xl" required />
                    <textarea placeholder="Message" rows={4} className="w-full p-4 border rounded-xl" required></textarea>
                    <button className="w-full py-4 text-white rounded-xl font-bold" style={{ backgroundColor: store.settings.primaryColor }}>Send Message</button>
                  </form>
               </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="pt-32 pb-24 container mx-auto px-6 text-center max-w-4xl">
             <h1 className="text-6xl font-bold serif mb-10">About Signature Table</h1>
             <div className="prose prose-lg mx-auto text-neutral-600 leading-relaxed space-y-8">
                <p>Founded in 2018, Signature Table was born out of a desire to create a dining destination that celebrates the purity of ingredients. Our philosophy is rooted in the belief that great food begins with great relationships—with the land, the farmers, and our community.</p>
                <img src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1200" className="rounded-3xl shadow-xl my-12" />
                <p>Chef Alessandro Romano leads a team of dedicated culinary artisans who treat every plate as a canvas. With a commitment to zero-waste practices and supporting local biodiversity, we strive not just to be the best restaurant in the city, but the best restaurant for the city.</p>
             </div>
          </div>
        );
      default:
        return <div className="pt-48 text-center min-h-screen">Page under development.</div>;
    }
  };

  // Admin page doesn't use the standard site layout for a clean dashboard look
  if (currentPage === 'admin') {
    return renderPage();
  }

  return (
    <Layout settings={store.settings} activePage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
};

export default App;
