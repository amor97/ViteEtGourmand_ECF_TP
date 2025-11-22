import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, User as UserIcon, LogOut, UtensilsCrossed } from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('vg_currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('vg_currentUser');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-amber-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Vite & <span className="text-amber-500">Gourmand</span></span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-amber-500 transition-colors">Accueil</Link>
              <Link to="/menus" className="hover:text-amber-500 transition-colors">Nos Menus</Link>
              <Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
              
              {user ? (
                <div className="flex items-center space-x-4 ml-4 border-l border-slate-700 pl-4">
                  <span className="text-sm text-gray-400">Bonjour, {user.firstName}</span>
                  {(user.role === UserRole.ADMIN || user.role === UserRole.EMPLOYEE) && (
                    <Link to="/admin" className="px-3 py-1 bg-amber-600 rounded hover:bg-amber-700 text-sm font-medium">
                      Espace Pro
                    </Link>
                  )}
                  {user.role === UserRole.CLIENT && (
                    <Link to="/profile" className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 text-sm font-medium flex items-center">
                      <UserIcon className="w-4 h-4 mr-1" /> Mon Espace
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-gray-400 hover:text-white" title="Déconnexion">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded hover:bg-amber-400 transition-colors">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Connexion
                </Link>
              )}
            </nav>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="hover:text-amber-500">Accueil</Link>
              <Link to="/menus" className="hover:text-amber-500">Nos Menus</Link>
              <Link to="/contact" className="hover:text-amber-500">Contact</Link>
              {user ? (
                 <>
                  <div className="border-t border-slate-700 pt-2">
                    <p className="text-sm text-gray-400 mb-2">Compte : {user.firstName}</p>
                    <button onClick={handleLogout} className="text-red-400">Déconnexion</button>
                  </div>
                 </>
              ) : (
                <Link to="/login" className="text-amber-500 font-bold">Connexion</Link>
              )}
            </div>
          </div>
        )}
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">Vite & Gourmand</h3>
            <p className="text-gray-400">Traiteur d'exception à Bordeaux depuis 25 ans.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">Horaires</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Lundi - Vendredi : 9h - 19h</li>
              <li>Samedi : 10h - 18h</li>
              <li>Dimanche : Fermé</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">Légal</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Mentions Légales</li>
              <li>CGV</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600 pt-8 border-t border-slate-800">
          © {new Date().getFullYear()} Vite & Gourmand.
        </div>
      </footer>
    </div>
  );
};
export default Layout;
