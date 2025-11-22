import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenus, saveOrder } from '../services/mockData';
import { Menu, User, Order } from '../types';
import { Calculator, MapPin, Users, AlertCircle } from 'lucide-react';

const OrderProcess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [nbPeople, setNbPeople] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('vg_currentUser');
    if (!storedUser) { navigate('/login'); return; }
    setUser(JSON.parse(storedUser));
    const menus = getMenus();
    const found = menus.find(m => m.id === id);
    if (found) { setMenu(found); setNbPeople(found.minPeople); }
  }, [id, navigate]);

  useEffect(() => {
    if (!menu) return;
    const shipping = 5 + (0.59 * distanceKm);
    setShippingCost(shipping);
    const baseCost = menu.pricePerPerson * nbPeople;
    let discountAmount = 0;
    if (nbPeople > (menu.minPeople + 5)) discountAmount = baseCost * 0.10;
    setDiscount(discountAmount);
    setGrandTotal(baseCost - discountAmount + shipping);
  }, [distanceKm, nbPeople, menu]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menu || !user) return;
    const newOrder: Order = {
      id: "ord-" + Date.now(),
      userId: user.id,
      menuId: menu.id,
      menuTitle: menu.title,
      datePrestation: date,
      timePrestation: time,
      deliveryAddress: address,
      distanceKm,
      nbPeople,
      totalPrice: Number(grandTotal.toFixed(2)),
      status: 'En attente',
      createdAt: new Date().toISOString()
    };
    saveOrder(newOrder);
    alert('Commande enregistrée !');
    navigate('/');
  };

  if (!menu || !user) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-6 text-white">
          <h1 className="text-2xl font-bold">Finaliser votre commande: {menu.title}</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded p-2" />
                <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
                <input type="number" required value={distanceKm} onChange={(e) => setDistanceKm(Number(e.target.value))} className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Convives</label>
                <input type="number" min={menu.minPeople} required value={nbPeople} onChange={(e) => setNbPeople(Number(e.target.value))} className="w-full border rounded p-2" />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 mt-6">Valider</button>
            </form>
          </div>
          <div className="bg-gray-50 p-8 border-l border-gray-200">
            <h2 className="text-lg font-semibold mb-6">Récapitulatif</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>Menu x {nbPeople}</span><span>{(menu.pricePerPerson * nbPeople).toFixed(2)} €</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Remise</span><span>- {discount.toFixed(2)} €</span></div>}
              <div className="flex justify-between text-blue-600"><span>Livraison</span><span>+ {shippingCost.toFixed(2)} €</span></div>
              <div className="border-t-2 border-slate-900 my-4 pt-4 flex justify-between text-xl font-bold"><span>Total</span><span>{grandTotal.toFixed(2)} €</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderProcess;
