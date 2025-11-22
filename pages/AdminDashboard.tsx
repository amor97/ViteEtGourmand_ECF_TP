import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../services/mockData';
import { Order, User, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('vg_currentUser');
    if (storedUser) {
      const u: User = JSON.parse(storedUser);
      if (u.role !== UserRole.ADMIN && u.role !== UserRole.EMPLOYEE) navigate('/');
    } else navigate('/login');

    const data = getOrders();
    setOrders(data);

    const revenueMap: Record<string, number> = {};
    data.forEach(order => {
      if (!revenueMap[order.menuTitle]) revenueMap[order.menuTitle] = 0;
      revenueMap[order.menuTitle] += order.totalPrice;
    });
    setChartData(Object.keys(revenueMap).map(key => ({ name: key.substring(0, 10), CA: revenueMap[key] })));
  }, [navigate]);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Admin</h1>
        <div className="bg-white p-6 rounded-lg shadow mb-8 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="CA" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50"><tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Client</th><th className="px-6 py-4">Menu</th><th className="px-6 py-4">Total</th><th className="px-6 py-4">Statut</th><th className="px-6 py-4">Action</th></tr></thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.userId}</td>
                  <td className="px-6 py-4">{order.menuTitle}</td>
                  <td className="px-6 py-4">{order.totalPrice} €</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">
                    <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value as any)} className="border rounded p-1">
                      <option value="En attente">En attente</option>
                      <option value="Terminée">Terminée</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
