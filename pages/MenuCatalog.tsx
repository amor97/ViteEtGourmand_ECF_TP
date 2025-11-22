import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMenus } from '../services/mockData';
import { Menu } from '../types';
import { Filter, Users, Tag } from 'lucide-react';

const MenuCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<string>('');

  useEffect(() => {
    const data = getMenus();
    setMenus(data);
    setFilteredMenus(data);
  }, []);

  useEffect(() => {
    let result = menus;
    if (maxPrice) result = result.filter(m => m.pricePerPerson <= maxPrice);
    if (selectedTheme) result = result.filter(m => m.theme === selectedTheme);
    if (selectedDiet) result = result.filter(m => m.diet === selectedDiet);
    setFilteredMenus(result);
  }, [maxPrice, selectedTheme, selectedDiet, menus]);

  const handleCommand = (menuId: string) => {
    const user = localStorage.getItem('vg_currentUser');
    if (user) {
      navigate(`/order/${menuId}`);
    } else {
      navigate('/login', { state: { from: `/order/${menuId}` } });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-10 text-center">Nos Menus</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <div className="flex items-center mb-4 text-slate-800 font-semibold">
            <Filter className="w-5 h-5 mr-2 text-amber-500" /> Filtres
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix max ({maxPrice}€)</label>
              <input type="range" min="10" max="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-amber-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
              <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="w-full border rounded p-2">
                <option value="">Tous</option>
                {Array.from(new Set(menus.map(m => m.theme))).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Régime</label>
              <select value={selectedDiet} onChange={(e) => setSelectedDiet(e.target.value)} className="w-full border rounded p-2">
                <option value="">Tous</option>
                {Array.from(new Set(menus.map(m => m.diet))).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenus.map((menu) => (
            <div key={menu.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <img src={menu.photo} alt={menu.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{menu.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{menu.description}</p>
                <div className="mt-auto flex justify-between items-center mb-4">
                  <span className="font-bold text-amber-600">{menu.pricePerPerson}€ / pers</span>
                  <span className="text-sm text-gray-500 flex items-center"><Users className="w-4 h-4 mr-1"/> Min. {menu.minPeople}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to={`/menus/${menu.id}`} className="px-4 py-2 border border-slate-300 text-slate-700 text-center rounded hover:bg-slate-50">Détails</Link>
                  <button onClick={() => handleCommand(menu.id)} className="px-4 py-2 bg-amber-500 text-slate-900 text-center rounded hover:bg-amber-400 font-bold">Commander</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MenuCatalog;
