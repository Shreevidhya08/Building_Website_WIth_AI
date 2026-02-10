
export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Beverages';
  image: string;
  isPopular: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  serviceType: 'Dining' | 'Private Event' | 'Business Lunch';
  specialRequest?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface SiteSettings {
  brandName: string;
  primaryColor: string; // Tailwind hex or class name
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  logo: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  resolved: boolean;
  createdAt: string;
}
