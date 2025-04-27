import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zunzo</h3>
            <p className="text-gray-300 mb-4">
              Everything you need, one click away. Shop the latest products with fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-white transition">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-300 hover:text-white transition">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-300 hover:text-white transition">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="text-gray-300 hover:text-white transition">Beauty & Personal Care</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt />
                <span className="text-gray-300">123 E-Commerce St, Digital City</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <span className="text-gray-300">support@zunzo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Zunzo. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-300 hover:text-white transition">Shipping Info</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
