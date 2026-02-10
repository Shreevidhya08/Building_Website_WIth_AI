
import { MenuItem, BlogPost, Testimonial, SiteSettings, ReservationStatus, Reservation } from './types';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Scallops',
    description: 'Pan-seared scallops with black truffle butter and microgreens.',
    price: 32,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    isPopular: true
  },
  {
    id: '2',
    name: 'Wagyu Ribeye',
    description: 'A5 Wagyu beef served with roasted bone marrow and red wine reduction.',
    price: 120,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isPopular: true
  },
  {
    id: '3',
    name: 'Chocolate Fondant',
    description: 'Warm dark chocolate cake with a molten center and vanilla bean gelato.',
    price: 18,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62adda51?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  },
  {
    id: '4',
    name: 'Heirloom Tomato Salad',
    description: 'Locally sourced tomatoes, buffalo mozzarella, and aged balsamic.',
    price: 24,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  }
];

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: '1',
    title: 'The Secret to the Perfect Steak',
    slug: 'perfect-steak-secrets',
    excerpt: 'Our Head Chef reveals the journey from farm to table...',
    content: 'Full article content about steak selection and cooking techniques.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-15',
    published: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Food Critic',
    content: 'The ambiance is only matched by the impeccable service and divine Wagyu. A true gem.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Regular Patron',
    content: 'Our go-to spot for anniversary dinners. The wine selection is unparalleled.',
    rating: 5
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'Signature Table',
  primaryColor: '#7c2d12', // Warm Red/Orange
  accentColor: '#064e3b', // Emerald Green
  fontHeading: 'Playfair Display',
  fontBody: 'Inter',
  address: '123 Fine Dining Ave, Metropolis, NY 10001',
  phone: '+1 (555) 000-1234',
  email: 'info@signaturetable.com',
  hours: {
    weekday: 'Mon - Fri: 5:00 PM - 11:00 PM',
    weekend: 'Sat - Sun: 11:00 AM - 12:00 AM'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com'
  },
  logo: 'https://picsum.photos/seed/restaurant/200/200'
};

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res_1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
    date: '2024-06-20',
    time: '19:00',
    guests: 4,
    serviceType: 'Dining',
    status: ReservationStatus.CONFIRMED,
    createdAt: new Date().toISOString()
  }
];
