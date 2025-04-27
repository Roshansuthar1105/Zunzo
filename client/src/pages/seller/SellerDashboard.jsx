import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaChartLine, FaPlus } from 'react-icons/fa';
import { getProducts } from '../../api';
import { AuthContext } from '../../context/AuthContext';

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products
        const products = await getProducts();

        // Filter products by seller ID
        const sellerProducts = products.filter(product => product.sellerid === user.id);

        // Get recent products
        const recent = [...sellerProducts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setRecentProducts(recent);

        // Update stats
        setStats({
          products: sellerProducts.length,
          orders: 0, // You would fetch this from your API
          revenue: 0, // You would calculate this from orders
        });
      } catch (err) {
        console.error('Error fetching seller data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: <FaBoxOpen className="text-green-500" size={24} />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: <FaClipboardList className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: <FaChartLine className="text-purple-500" size={24} />,
      bgColor: 'bg-purple-100',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link
          to="/seller/products/add"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Products</h2>
          <Link to="/seller/products" className="text-green-600 hover:text-green-800 font-medium">
            View All
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
            <Link
              to="/seller/products/add"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition inline-flex items-center"
            >
              <FaPlus className="mr-2" /> Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/40'}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${(product.price !== undefined && !isNaN(product.price)) ? Number(product.price).toFixed(2) : '0.00'}
                      </div>
                      {product.discount !== undefined && product.discount > 0 && (
                        <div className="text-xs text-red-500">{product.discount}% off</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock !== undefined ? product.stock : 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock !== undefined && product.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock !== undefined && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/seller/products/add"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition text-center"
          >
            Add New Product
          </Link>
          <Link
            to="/seller/orders"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-center"
          >
            View Orders
          </Link>
          <Link
            to="/seller/analytics"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition text-center"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
