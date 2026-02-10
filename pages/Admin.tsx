
import React, { useState } from 'react';
import { Reservation, ReservationStatus, MenuItem, SiteSettings, ContactSubmission } from '../types';

interface AdminProps {
  reservations: Reservation[];
  onUpdateReservation: (id: string, status: ReservationStatus) => void;
  menu: MenuItem[];
  onUpdateMenu: (menu: MenuItem[]) => void;
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  contacts: ContactSubmission[];
}

export const Admin: React.FC<AdminProps> = ({ 
  reservations, onUpdateReservation, menu, onUpdateMenu, settings, onUpdateSettings, contacts 
}) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'settings' | 'contacts'>('reservations');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold serif mb-6 text-center">Admin Access</h1>
          <p className="text-neutral-500 mb-8 text-center">Please enter the administrative password to manage Signature Table.</p>
          <input 
            type="password"
            placeholder="Password (try 'admin')"
            className="w-full p-4 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-neutral-200"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button 
            onClick={() => password === 'admin' ? setIsAuthenticated(true) : alert('Wrong password')}
            className="w-full py-4 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-all"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 text-white p-6 space-y-8">
        <div className="text-2xl font-bold serif mb-10">Dashboard</div>
        <nav className="space-y-2">
          {[
            { id: 'reservations', label: 'Reservations', icon: '📅' },
            { id: 'menu', label: 'Menu Items', icon: '🍽️' },
            { id: 'settings', label: 'Site Settings', icon: '⚙️' },
            { id: 'contacts', label: 'Inquiries', icon: '✉️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left p-4 rounded-xl flex items-center space-x-4 transition-all ${
                activeTab === tab.id ? 'bg-white/10 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <button 
          onClick={() => window.location.reload()}
          className="mt-20 w-full text-left p-4 text-neutral-500 hover:text-white flex items-center space-x-4"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold serif capitalize">{activeTab} Management</h2>
          <div className="text-sm text-neutral-500">Welcome, Administrator</div>
        </header>

        {activeTab === 'reservations' && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase text-neutral-400">Guest</th>
                  <th className="p-4 text-xs font-bold uppercase text-neutral-400">Date/Time</th>
                  <th className="p-4 text-xs font-bold uppercase text-neutral-400">Status</th>
                  <th className="p-4 text-xs font-bold uppercase text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reservations.map(res => (
                  <tr key={res.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold">{res.name}</div>
                      <div className="text-xs text-neutral-500">{res.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{res.date}</div>
                      <div className="text-xs font-medium text-neutral-400">{res.time} • {res.guests} guests</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        res.status === ReservationStatus.CONFIRMED ? 'bg-green-100 text-green-700' :
                        res.status === ReservationStatus.PENDING ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button onClick={() => onUpdateReservation(res.id, ReservationStatus.CONFIRMED)} className="text-xs text-green-600 hover:underline">Confirm</button>
                      <button onClick={() => onUpdateReservation(res.id, ReservationStatus.CANCELLED)} className="text-xs text-red-600 hover:underline">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <button 
              className="px-6 py-2 bg-neutral-900 text-white rounded-lg text-sm font-bold"
              onClick={() => alert('Feature to add new menu item would open a modal here.')}
            >
              + Add Menu Item
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl border flex flex-col">
                  <img src={item.image} className="w-full h-32 object-cover rounded-lg mb-4" />
                  <div className="font-bold mb-1">{item.name}</div>
                  <div className="text-xs text-neutral-500 mb-4 line-clamp-2">{item.description}</div>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="font-bold">${item.price}</span>
                    <button className="text-neutral-400 hover:text-neutral-900 text-sm">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-10 rounded-2xl border shadow-sm">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500">Restaurant Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg"
                  value={settings.brandName}
                  onChange={e => onUpdateSettings({...settings, brandName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-500">Primary Color (Hex)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg"
                    value={settings.primaryColor}
                    onChange={e => onUpdateSettings({...settings, primaryColor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-500">Accent Color (Hex)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg"
                    value={settings.accentColor}
                    onChange={e => onUpdateSettings({...settings, accentColor: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500">Address</label>
                <textarea 
                  className="w-full p-3 border rounded-lg"
                  value={settings.address}
                  onChange={e => onUpdateSettings({...settings, address: e.target.value})}
                />
              </div>
              <button className="w-full py-4 bg-neutral-900 text-white rounded-xl font-bold">
                Save All Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl border p-8 text-center text-neutral-400">
            {contacts.length === 0 ? "No inquiries yet." : (
              <div className="text-left space-y-4 text-neutral-900">
                {contacts.map(c => (
                  <div key={c.id} className="p-4 border rounded-lg">
                    <div className="font-bold">{c.name}</div>
                    <div className="text-sm">{c.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
