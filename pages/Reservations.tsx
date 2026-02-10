
import React, { useState } from 'react';
import { SiteSettings } from '../types';

interface ReservationsProps {
  settings: SiteSettings;
  onSubmit: (res: any) => void;
}

export const Reservations: React.FC<ReservationsProps> = ({ settings, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: 2,
    serviceType: 'Dining',
    specialRequest: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 container mx-auto px-6 text-center min-h-screen">
        <div className="max-w-xl mx-auto">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-4xl font-bold serif mb-6">Reservation Received</h1>
          <p className="text-neutral-600 mb-10 leading-relaxed text-lg">
            Thank you for choosing {settings.brandName}. We have received your request for {formData.date} at {formData.time} for {formData.guests} guests. 
            <br/><br/>
            Our team will review your booking and send a confirmation to <strong>{formData.email}</strong> shortly.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-4 rounded-full text-white font-bold"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold serif mb-8 leading-tight">Reserve Your Table</h1>
          <p className="text-neutral-600 text-lg mb-12 leading-relaxed">
            Join us for an unforgettable culinary experience. Please fill out the form, and our hosts will ensure your table is ready.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-2 text-neutral-400">Opening Hours</h3>
              <p className="text-neutral-700">{settings.hours.weekday}</p>
              <p className="text-neutral-700">{settings.hours.weekend}</p>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-2 text-neutral-400">Reservation Policy</h3>
              <p className="text-sm text-neutral-500 max-w-sm">
                We hold tables for 15 minutes past reservation time. Please notify us if you are running late. For groups larger than 10, please contact us directly.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-neutral-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Phone</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Date</label>
              <input 
                required
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Time</label>
              <select 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
              >
                <option>17:00</option><option>17:30</option><option>18:00</option><option>18:30</option>
                <option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option>
                <option>21:00</option><option>21:30</option><option>22:00</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Guests</label>
              <input 
                required
                type="number" min="1" max="20"
                value={formData.guests}
                onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
              />
            </div>
          </div>
          <div className="space-y-2 mb-8">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Service Type</label>
            <div className="flex gap-4">
              {['Dining', 'Private Event', 'Business Lunch'].map(type => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({...formData, serviceType: type as any})}
                  className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                    formData.serviceType === type 
                      ? 'bg-neutral-900 text-white' 
                      : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 mb-10">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Special Requests</label>
            <textarea 
              rows={4}
              value={formData.specialRequest}
              onChange={e => setFormData({...formData, specialRequest: e.target.value})}
              placeholder="Allergies, anniversaries, preferred seating..."
              className="w-full border-neutral-200 rounded-lg p-3 focus:ring-1 focus:ring-neutral-400 outline-none border"
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full py-5 rounded-full text-white font-bold text-lg shadow-xl hover:brightness-110 transition-all"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Confirm Reservation Request
          </button>
        </form>
      </div>
    </div>
  );
};
