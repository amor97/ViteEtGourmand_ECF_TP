
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMenus } from '../services/mockData';
import { Menu } from '../types';
import { Filter, Users, Tag, Loader2 } from 'lucide-react'; // 'Euro' a été retiré ici

const MenuCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Nouveau state de chargement

  // Filter States
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<string>('');

  useEffect(() => {
    const loadMenus = async () => {
      setLoading(true); // Démarre le chargement
      const data = await getMenus(); // Appel asynchrone à l'API PHP
      setMenus(data);
      setFilteredMenus(data);
      setLoading(false); // Arrête le chargement
    };
    loadMenus();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = menus;

    if (maxPrice) {
      result = result.filter(m => m.pricePerPerson <= maxPrice);
    }
    if (selectedTheme) {
      result = result.filter(m => m.theme === selectedTheme);
    }
    if (selectedDiet) {
      result = result.filter(m => m.diet === selectedDiet);
    }

    setFilteredMenus(result);
  }, [maxPrice, selectedTheme, selectedDiet, menus]);

  // Extract unique themes and diets for select options
  const themes = Array.from(new Set(menus.map(m => m.theme)));
  const diets = Array.from(new Set(menus.map(m => m.diet)));

  const handleCommand = (menuId: string) => {
    const user = localStorage.getItem('vg_currentUser');
    if (user) {
      navigate(`/order/${menuId}`);
    } else {
      // Pass the intended destination in state to redirect after login
      navigate('/login', { state: { from: `/order/${menuId}` } });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Nos Menus</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos compositions culinaires adaptées à toutes vos envies et tous vos événements.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <div className="flex items-center mb-4 text-slate-800 font-semibold">
            <Filter className="w-5 h-5 mr-2 text-amber-500" />
            Filtres
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix max par personne ({maxPrice}€)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Theme Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full border-gray-300 border rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Tous les thèmes</option>
                {themes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Diet Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Régime</label>
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="w-full border-gray-300 border rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Tous les régimes</option>
                {diets.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-4" />
            <p className="text-gray-600 text-lg">Chargement des menus...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu) => (
                <div key={menu.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                  <div className="relative h-48">
                    <img src={menu.photo} alt={menu.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow">
                      {menu.pricePerPerson}€ / pers
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{menu.title}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <Tag className="w-3 h-3 mr-1" /> {menu.theme}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {menu.diet}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{menu.description}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" /> Min. {menu.minPeople} pers.
                      </span>
                      <span className="flex items-center text-blue-600">
                        Stock: {menu.stock}
                      </span>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <Link 
                        to={`/menus/${menu.id}`}
                        className="px-4 py-2 border border-slate-300 text-slate-700 text-center rounded hover:bg-slate-50 font-medium transition-colors"
                      >
                        Détails
                      </Link>
                      <button 
                        onClick={() => handleCommand(menu.id)}
                        className="px-4 py-2 bg-amber-500 text-slate-900 text-center rounded hover:bg-amber-400 font-bold transition-colors shadow-sm"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">Aucun menu ne correspond à vos filtres.</p>
                <button 
                  onClick={() => { setMaxPrice(100); setSelectedTheme(''); setSelectedDiet(''); }}
                  className="mt-4 text-amber-600 underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCatalog;
