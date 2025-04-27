import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        
        // Filter for featured products (e.g., highest rated)
        const featured = [...data].sort((a, b) => b.ratings - a.ratings).slice(0, 4);
        setFeaturedProducts(featured);
        
        // Filter for new arrivals (e.g., most recent)
        const arrivals = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
        setNewArrivals(arrivals);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need, One Click Away</h1>
              <p className="text-xl mb-6">Shop the latest products with fast delivery and excellent customer service.</p>
              <Link 
                to="/products" 
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition inline-flex items-center"
              >
                Shop Now <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Shopping" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/products?category=electronics" className="category-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Electronics" 
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">Electronics</h3>
            </Link>
            <Link to="/products?category=clothing" className="category-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Clothing" 
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">Clothing</h3>
            </Link>
            <Link to="/products?category=home" className="category-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Home & Kitchen" 
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">Home & Kitchen</h3>
            </Link>
            <Link to="/products?category=beauty" className="category-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Beauty & Personal Care" 
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">Beauty & Personal Care</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-gray-700 mb-4">"Excellent service and fast delivery. The products are of high quality and exactly as described. Will definitely shop here again!"</p>
              <div className="font-semibold">- Sarah Johnson</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-gray-700 mb-4">"I'm impressed with the variety of products available. The website is easy to navigate and the checkout process is smooth. Great experience overall!"</p>
              <div className="font-semibold">- Michael Brown</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-gray-700 mb-4">"Customer service is top-notch. Had an issue with my order and they resolved it promptly. The products are amazing and worth every penny!"</p>
              <div className="font-semibold">- Emily Davis</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
