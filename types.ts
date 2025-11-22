export enum UserRole {
  CLIENT = 'CLIENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: UserRole;
}

export interface Menu {
  id: string;
  title: string;
  description: string;
  pricePerPerson: number;
  minPeople: number;
  photo: string;
  theme: string;
  diet: string;
  stock: number;
  allergens: string[];
}

export interface Order {
  id: string;
  userId: string;
  menuId: string;
  menuTitle: string;
  datePrestation: string;
  timePrestation: string;
  deliveryAddress: string;
  distanceKm: number;
  nbPeople: number;
  totalPrice: number;
  status: 'En attente' | 'En préparation' | 'En cours de livraison' | 'Livré' | 'Terminée';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  menuId: string;
  rating: number;
  comment: string;
  isValid: boolean;
}
