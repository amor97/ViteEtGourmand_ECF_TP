import { Menu, Order, Review, User, UserRole } from '../types';

const INITIAL_MENUS: Menu[] = [
  {
    id: '1',
    title: 'Menu Festin de Noël',
    description: 'Dinde rôtie aux marrons, bûche glacée vanille-framboise.',
    pricePerPerson: 45,
    minPeople: 4,
    photo: 'https://picsum.photos/id/429/800/600',
    theme: 'Noel',
    diet: 'Classique',
    stock: 50,
    allergens: ['Lait', 'Oeuf', 'Gluten']
  },
  {
    id: '2',
    title: 'Douceur Printanière (Végétarien)',
    description: 'Risotto aux asperges vertes, tartelette aux fraises.',
    pricePerPerson: 32,
    minPeople: 2,
    photo: 'https://picsum.photos/id/493/800/600',
    theme: 'Paques',
    diet: 'Vegetarien',
    stock: 20,
    allergens: ['Lait']
  },
  {
    id: '3',
    title: 'Buffet Campagnard',
    description: 'Assortiment de charcuteries, fromages affinés, pain de campagne.',
    pricePerPerson: 25,
    minPeople: 10,
    photo: 'https://picsum.photos/id/292/800/600',
    theme: 'Evenement',
    diet: 'Classique',
    stock: 100,
    allergens: ['Gluten']
  },
  {
    id: '4',
    title: 'Océan Atlantique',
    description: 'Plateau de fruits de mer, saumon gravlax, sorbet citron.',
    pricePerPerson: 55,
    minPeople: 2,
    photo: 'https://picsum.photos/id/365/800/600',
    theme: 'Classique',
    diet: 'Pescatarien',
    stock: 15,
    allergens: ['Crustacés', 'Poisson']
  }
];

const INITIAL_REVIEWS: Review[] = [
  { id: '1', userId: '101', userName: 'Sophie Martin', menuId: '1', rating: 5, comment: 'Excellent repas de Noël !', isValid: true },
  { id: '2', userId: '102', userName: 'Pierre Durand', menuId: '3', rating: 4, comment: 'Très copieux.', isValid: true },
  { id: '3', userId: '103', userName: 'Lucie Bernard', menuId: '2', rating: 5, comment: 'Une option végétarienne délicieuse.', isValid: true },
  { id: '4', userId: '104', userName: 'Jean Dupont', menuId: '1', rating: 2, comment: 'Livraison en retard.', isValid: false }
];

const INITIAL_USERS: User[] = [
  {
    id: 'admin',
    email: 'admin@vite-gourmand.com',
    password: 'admin',
    firstName: 'Julie',
    lastName: 'Admin',
    phone: '0600000000',
    address: 'Bordeaux',
    role: UserRole.ADMIN
  },
  {
    id: 'client',
    email: 'client@test.com',
    password: 'client',
    firstName: 'Jean',
    lastName: 'Client',
    phone: '0612345678',
    address: '10 Rue de la Paix, Bordeaux',
    role: UserRole.CLIENT
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    userId: 'client',
    menuId: '1',
    menuTitle: 'Menu Festin de Noël',
    datePrestation: '2023-12-24',
    timePrestation: '19:00',
    deliveryAddress: '10 Rue de la Paix, Bordeaux',
    distanceKm: 5,
    nbPeople: 6,
    totalPrice: 277.95,
    status: 'Terminée',
    createdAt: '2023-12-01'
  },
  {
    id: 'ord-2',
    userId: 'client',
    menuId: '3',
    menuTitle: 'Buffet Campagnard',
    datePrestation: '2024-05-20',
    timePrestation: '12:00',
    deliveryAddress: '30 Av. de la Marne',
    distanceKm: 10,
    nbPeople: 20,
    totalPrice: 460.9,
    status: 'En préparation',
    createdAt: '2024-05-10'
  }
];

export const getMenus = (): Menu[] => {
  const stored = localStorage.getItem('vg_menus');
  if (!stored) {
    localStorage.setItem('vg_menus', JSON.stringify(INITIAL_MENUS));
    return INITIAL_MENUS;
  }
  return JSON.parse(stored);
};

export const getReviews = (): Review[] => {
  const stored = localStorage.getItem('vg_reviews');
  if (!stored) {
    localStorage.setItem('vg_reviews', JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  return JSON.parse(stored);
};

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem('vg_orders');
  if (!stored) {
    localStorage.setItem('vg_orders', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  return JSON.parse(stored);
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('vg_orders', JSON.stringify(orders));
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    localStorage.setItem('vg_orders', JSON.stringify(orders));
  }
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem('vg_users');
  if (!stored) {
    localStorage.setItem('vg_users', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  return JSON.parse(stored);
};

export const registerUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('vg_users', JSON.stringify(users));
};
