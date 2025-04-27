import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    search: searchParams.get('search') || '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update filters from URL params
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    
    setFilters(prev => ({
      ...prev,
      category,
      search,
    }));
  }, [searchParams]);

  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Filter by price range
    if (filters.minPrice) {
      result = result.filter(product => product.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter(product => product.price <= Number(filters.maxPrice));
    }
    
    setFilteredProducts(result);
  }, [products, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update URL params for category
    if (name === 'category') {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('category', value);
      } else {
        params.delete('category');
      }
      setSearchParams(params);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Update URL params for search
    const params = new URLSearchParams(searchParams);
    if (filters.search) {
      params.set('search', filters.search);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
    setSearchParams({});
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={toggleFilters}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {showFilters ? (
              <>
                <FaTimes className="mr-2" /> Hide Filters
              </>
            ) : (
              <>
                <FaFilter className="mr-2" /> Show Filters
              </>
            )}
          </button>
        </div>
        
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Search</label>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-medium mb-2">Price Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-600">{filteredProducts.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
