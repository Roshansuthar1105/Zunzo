import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaUserShield, FaBoxOpen } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, logout, user, isAdmin, role } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Zunzo
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/products" className="hover:text-blue-200 transition">Products</Link>
            <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-1 rounded-l-md text-gray-800 focus:outline-none bg-gray-50  "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-100 transition"
              >
                <FaSearch className='text-black'  />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blue-200 transition cursor-pointer" onClick={() => {setIsProfileOpen(!isProfileOpen);}}>
                  <FaUser size={20} />
                  <span className="ml-1 hidden sm:inline">{user?.email?.split('@')[0]}</span>
                </button>
                  {
                    isProfileOpen && (
                      <>
                <div className="absolute right-0 mt-2 min-w-48 bg-white rounded-md shadow-lg py-1 z-10 block" onClick={() => {setIsProfileOpen(!isProfileOpen);}} >
                        <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200">
                          Signed in as <span className="font-semibold text-gray-700">{user?.email}</span>
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                        >
                          Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                          >
                            <FaUserShield className="mr-2" /> Admin Dashboard
                          </Link>
                        )}
                        {role === 'seller' && (
                          <Link
                            to="/seller"
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                          >
                            <FaBoxOpen className="mr-2" /> Seller Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                        >
                          Logout
                        </button>
                </div>
                      </>
                    )
                  }
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-blue-200 transition" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className="hover:text-blue-200 transition" onClick={toggleMenu}>
                Products
              </Link>
              <Link to="/contact" className="hover:text-blue-200 transition" onClick={toggleMenu}>
                Contact
              </Link>

              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-4 py-1 rounded-l-md text-gray-800 focus:outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-700 px-4 py-1 rounded-r-md hover:bg-blue-800 transition"
                >
                  <FaSearch />
                </button>
              </form>

              <div className="flex justify-between items-center">
                <Link to="/cart" className="relative" onClick={toggleMenu}>
                  <FaShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm text-blue-200 mb-1">
                      Signed in as <span className="font-semibold">{user?.email}</span>
                    </div>
                    <Link to="/profile" className="hover:text-blue-200 transition" onClick={toggleMenu}>
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="hover:text-blue-200 transition flex items-center" onClick={toggleMenu}>
                        <FaUserShield className="mr-2" /> Admin Dashboard
                      </Link>
                    )}
                    {role === 'seller' && (
                      <Link to="/seller" className="hover:text-blue-200 transition flex items-center" onClick={toggleMenu}>
                        <FaBoxOpen className="mr-2" /> Seller Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="hover:text-blue-200 transition text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" className="hover:text-blue-200 transition" onClick={toggleMenu}>
                      Login
                    </Link>
                    <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition text-center" onClick={toggleMenu}>
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
