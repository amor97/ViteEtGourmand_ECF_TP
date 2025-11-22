import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MenuCatalog from './pages/MenuCatalog';
import MenuDetails from './pages/MenuDetails';
import Login from './pages/Login';
import OrderProcess from './pages/OrderProcess';
import AdminDashboard from './pages/AdminDashboard';

// Placeholder components
const Contact = () => <div className="p-20 text-center text-2xl">Page Contact (Formulaire)</div>;
const Register = () => <div className="p-20 text-center text-2xl">Page Inscription (Utiliser Login pour démo)</div>;
const Profile = () => <div className="p-20 text-center text-2xl">Espace Client (Historique des commandes)</div>;

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<MenuCatalog />} />
          <Route path="/menus/:id" element={<MenuDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order/:id" element={<OrderProcess />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
