import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenus } from '../services/mockData';
import { Menu } from '../types';
import { ArrowLeft, Check, AlertTriangle, Loader2 } from 'lucide-react';

const MenuDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Nouveau state de chargement

  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true); // Démarre le chargement
      const menus = await getMenus(); // Appel asynchrone à l'API PHP
      const found = menus.find(m => m.id === id);
      setMenu(found || null);
      setLoading(false); // Arrête le chargement
    };
    loadMenu();
  }, [id]);

  if (loading) { // Affiche un loader pendant le chargement
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-4" />
        <p className="text-lg text-gray-600">Chargement des détails du menu...</p>
      </div>
    );
  }

  if (!menu) return <div className="p-8 text-center text-red-600">Menu introuvable.</div>;

  const handleCommand = () => {
    const user = localStorage.getItem('vg_currentUser');
    if (user) {
      navigate(`/order/${menu.id}`);
    } else {
      navigate('/login', { state: { from: `/order/${menu.id}` } });
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="relative h-96">
        <img src={menu.photo} alt={menu.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <button 
          onClick={() => navigate('/menus')}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto text-white">
          <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-sm text-sm font-bold uppercase tracking-wider mb-2 inline-block">
            {menu.theme}
          </span>
          <h1 className="text-5xl font-bold mb-2">{menu.title}</h1>
          <p className="text-xl text-gray-200">{menu.pricePerPerson}€ par personne</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-amber-500 pl-4">Description</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{menu.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Composition</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Entrée de saison</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Plat principal</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Dessert gourmand</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Allergènes</h3>
              {menu.allergens.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {menu.allergens.map(a => (
                    <span key={a} className="bg-red-50 text-red-600 px-2 py-1 rounded text-sm border border-red-100 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" /> {a}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucun allergène majeur signalé.</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Réserver ce menu</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Minimum convives</span>
                <span className="font-bold">{menu.minPeople} pers.</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Type de régime</span>
                <span className="font-bold">{menu.diet}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Disponibilité</span>
                <span className="font-bold text-green-600">{menu.stock > 0 ? 'En stock' : 'Épuisé'}</span>
              </div>
            </div>

            <button 
              onClick={handleCommand}
              disabled={menu.stock === 0}
              className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Commander maintenant
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Paiement sécurisé à la validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;