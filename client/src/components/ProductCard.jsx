import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const discountedPrice = product.price * (1 - product.discount / 100);
  
  // Generate star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link to={`/product/${product._id}`}>
        <div className="h-48 overflow-hidden relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition mb-1 truncate">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          {renderStars(product.ratings)}
          <span className="text-xs text-gray-500 ml-1">({product.ratings})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
