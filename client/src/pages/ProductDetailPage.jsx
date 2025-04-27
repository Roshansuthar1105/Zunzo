import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts } from '../api';
import { CartContext } from '../context/CartContext';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        if (data && data.length > 0) {
          setProduct(data[0]);
          setSelectedColor(data[0].colors && data[0].colors.length > 0 ? data[0].colors[0] : '');
          setSelectedSize(data[0].size && data[0].size.length > 0 ? data[0].size[0] : '');
          
          // Fetch related products
          const allProducts = await getProducts();
          const related = allProducts
            .filter(p => p.category === data[0].category && p._id !== data[0]._id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        ...product,
        selectedColor,
        selectedSize,
      };
      addToCart(productToAdd, quantity);
    }
  };

  const nextImage = () => {
    if (product && product.images) {
      setSelectedImage((selectedImage + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl">{error}</p>
          <Link to="/products" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Product not found</p>
          <Link to="/products" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to={`/products?category=${product.category}`} className="text-gray-600 hover:text-blue-600">
                  {product.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="relative h-96 mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <>
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No image available
              </div>
            )}
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {renderStars(product.ratings)}
            </div>
            <span className="text-gray-600">({product.ratings})</span>
          </div>
          
          <div className="mb-4">
            {product.discount > 0 ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Product Status */}
          <div className="mb-6">
            <p className="text-gray-700">
              Status: 
              <span className={`ml-2 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
            {product.stock > 0 && (
              <p className="text-gray-700">
                Available: <span className="font-semibold">{product.stock}</span> items
              </p>
            )}
            <p className="text-gray-700">
              Brand: <span className="font-semibold">{product.brand || 'N/A'}</span>
            </p>
            <p className="text-gray-700">
              SKU: <span className="font-semibold">{product.sku}</span>
            </p>
          </div>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-700 font-semibold mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-600' : 'border-gray-300'}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={`Select ${color} color`}
                  ></button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.size && product.size.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-700 font-semibold mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${selectedSize === size ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-700'} rounded-md`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300 transition"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 h-8 text-center border-t border-b box-border border-gray-300 py-1 appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300 transition"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-md font-semibold ${
                product.stock > 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition`}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition"
            >
              <FaHeart /> Add to Wishlist
            </button>
          </div>
          
          {/* Share */}
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Share:</span>
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-blue-600">
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-blue-600 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Description
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Reviews
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Shipping Info
            </button>
          </nav>
        </div>
        <div className="py-6">
          <p className="text-gray-700">{product.description}</p>
          
          {/* Additional product details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.weight && (
              <div>
                <h4 className="font-semibold text-gray-700">Weight</h4>
                <p className="text-gray-600">{product.weight} kg</p>
              </div>
            )}
            {product.dimensions && (
              <div>
                <h4 className="font-semibold text-gray-700">Dimensions</h4>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
            )}
            {product.shippingInfo && (
              <div>
                <h4 className="font-semibold text-gray-700">Shipping Information</h4>
                <p className="text-gray-600">{product.shippingInfo}</p>
              </div>
            )}
            {product.returnPolicy && (
              <div>
                <h4 className="font-semibold text-gray-700">Return Policy</h4>
                <p className="text-gray-600">{product.returnPolicy}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link 
                key={relatedProduct._id} 
                to={`/product/${relatedProduct._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name} 
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                  {relatedProduct.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {relatedProduct.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition mb-1 truncate">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {renderStars(relatedProduct.ratings)}
                    </div>
                  </div>
                  <div>
                    {relatedProduct.discount > 0 ? (
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-800">
                          ${(relatedProduct.price * (1 - relatedProduct.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-800">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
