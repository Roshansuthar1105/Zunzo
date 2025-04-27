import { useState, useEffect } from 'react';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaComments, FaChartLine } from 'react-icons/fa';
import { getUsers, getProducts } from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    contacts: 0,
    revenue: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch users count
        const users = await getUsers();
        
        // Fetch products
        const products = await getProducts();
        
        // Update stats
        setStats({
          users: users.length,
          products: products.length,
          orders: 0, // You would fetch this from your API
          contacts: 0, // You would fetch this from your API
          revenue: 0, // You would calculate this from orders
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const statCards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: <FaUsers className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Products',
      value: stats.products,
      icon: <FaBoxOpen className="text-green-500" size={24} />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: <FaShoppingCart className="text-purple-500" size={24} />,
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Contacts',
      value: stats.contacts,
      icon: <FaComments className="text-yellow-500" size={24} />,
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: <FaChartLine className="text-red-500" size={24} />,
      bgColor: 'bg-red-100',
    },
  ];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-lg shadow-md p-6 flex items-center justify-between`}
          >
            <div>
              <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
            <div className="p-3 rounded-full bg-white">{card.icon}</div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className="p-2 rounded-full bg-blue-100 mr-4">
              <FaUsers className="text-blue-500" />
            </div>
            <div>
              <p className="font-medium">New user registered</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className="p-2 rounded-full bg-green-100 mr-4">
              <FaBoxOpen className="text-green-500" />
            </div>
            <div>
              <p className="font-medium">New product added</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className="p-2 rounded-full bg-purple-100 mr-4">
              <FaShoppingCart className="text-purple-500" />
            </div>
            <div>
              <p className="font-medium">New order placed</p>
              <p className="text-sm text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Add New Product
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
            View Orders
          </button>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
