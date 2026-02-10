
import { useState, useEffect } from 'react';
import { MenuItem, BlogPost, Testimonial, SiteSettings, Reservation, ContactSubmission } from './types';
import { INITIAL_MENU, INITIAL_BLOG, INITIAL_TESTIMONIALS, INITIAL_SETTINGS, INITIAL_RESERVATIONS } from './constants';

const STORAGE_KEY = 'signature_table_cms_data';

export const useStore = () => {
  const [data, setData] = useState<{
    menu: MenuItem[];
    blog: BlogPost[];
    testimonials: Testimonial[];
    settings: SiteSettings;
    reservations: Reservation[];
    contacts: ContactSubmission[];
  }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      menu: INITIAL_MENU,
      blog: INITIAL_BLOG,
      testimonials: INITIAL_TESTIMONIALS,
      settings: INITIAL_SETTINGS,
      reservations: INITIAL_RESERVATIONS,
      contacts: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateSettings = (settings: SiteSettings) => setData(prev => ({ ...prev, settings }));
  
  const addReservation = (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const newRes: Reservation = {
      ...res,
      id: `res_${Math.random().toString(36).substr(2, 9)}`,
      status: 'PENDING' as any,
      createdAt: new Date().toISOString()
    };
    setData(prev => ({ ...prev, reservations: [newRes, ...prev.reservations] }));
    return newRes;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setData(prev => ({
      ...prev,
      reservations: prev.reservations.map(r => r.id === id ? { ...r, status } : r)
    }));
  };

  const addContact = (contact: Omit<ContactSubmission, 'id' | 'resolved' | 'createdAt'>) => {
    const newContact: ContactSubmission = {
      ...contact,
      id: `cont_${Math.random().toString(36).substr(2, 9)}`,
      resolved: false,
      createdAt: new Date().toISOString()
    };
    setData(prev => ({ ...prev, contacts: [newContact, ...prev.contacts] }));
  };

  const updateMenu = (menu: MenuItem[]) => setData(prev => ({ ...prev, menu }));
  const updateBlog = (blog: BlogPost[]) => setData(prev => ({ ...prev, blog }));
  const updateTestimonials = (testimonials: Testimonial[]) => setData(prev => ({ ...prev, testimonials }));

  return {
    ...data,
    updateSettings,
    addReservation,
    updateReservationStatus,
    addContact,
    updateMenu,
    updateBlog,
    updateTestimonials
  };
};
