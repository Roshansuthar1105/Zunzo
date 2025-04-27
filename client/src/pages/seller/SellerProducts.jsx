import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { getProducts, deleteProduct, updateProduct, addProduct } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SellerProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    discount: 0,
    images: [''],
    sku: '',
    brand: '',
    sellerid: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();

      // Filter products by seller ID
      const sellerProducts = data.filter(product => product.sellerid === user.id);

      setProducts(sellerProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower) ||
      product.brand?.toLowerCase().includes(searchLower) ||
      product.sku?.toLowerCase().includes(searchLower)
    );
  });

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowAddForm(true);
    setFormData({
      name: '',
      price: 0,
      description: '',
      category: '',
      stock: 0,
      discount: 0,
      images: [''],
      sku: `SKU-${Date.now()}`,
      brand: '',
      sellerid: user.id,
    });
  };

  const handleEdit = (product) => {
    setShowAddForm(false);
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price || 0,
      description: product.description || '',
      category: product.category || '',
      stock: product.stock || 0,
      discount: product.discount || 0,
      images: product.images || [''],
      sku: product.sku || '',
      brand: product.brand || '',
      sellerid: product.sellerid || user.id,
    });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ''],
    });
  };

  const removeImageField = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages.length ? newImages : [''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct._id, formData);

        // Update local state
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? { ...product, ...formData } : product
          )
        );

        toast.success('Product updated successfully');
      } else {
        // Add new product
        const newProduct = await addProduct({
          ...formData,
          ratings: 0,
          sellerid: user.id,
        });

        // Update local state
        setProducts([...products, newProduct]);

        toast.success('Product added successfully');
      }

      setEditingProduct(null);
      setShowAddForm(false);
    } catch (err) {
      console.error('Error saving product:', err);
      toast.error(editingProduct ? 'Failed to update product' : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setLoading(true);
      await deleteProduct(productId);

      // Update local state
      setProducts(products.filter((product) => product._id !== productId));

      toast.success('Product deleted successfully');
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
  };

  if (loading && products.length === 0) {
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
        <h1 className="text-3xl font-bold">My Products</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        <div>
          <span className="text-gray-600">
            Total Products: <span className="font-semibold">{products.length}</span>
          </span>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      {(showAddForm || editingProduct) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                  Price*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
                  Category*
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  list="category-options"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <datalist id="category-options">
                  <option value="Electronics" />
                  <option value="Clothing" />
                  <option value="Home & Kitchen" />
                  <option value="Books" />
                  <option value="Toys & Games" />
                  <option value="Beauty & Personal Care" />
                  <option value="Sports & Outdoors" />
                  <option value="Health & Wellness" />
                  <option value="Jewelry" />
                  <option value="Automotive" />
                  <option value="Pet Supplies" />
                  <option value="Office Supplies" />
                  <option value="Furniture" />
                  <option value="Food & Grocery" />
                </datalist>
              </div>
              <div>
                <label htmlFor="brand" className="block text-gray-700 font-medium mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  list="brand-options"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <datalist id="brand-options">
                  <option value="Apple" />
                  <option value="Samsung" />
                  <option value="Sony" />
                  <option value="Nike" />
                  <option value="Adidas" />
                  <option value="Puma" />
                  <option value="Dell" />
                  <option value="HP" />
                  <option value="Lenovo" />
                  <option value="LG" />
                  <option value="Philips" />
                  <option value="Bosch" />
                  <option value="Nestle" />
                  <option value="Coca-Cola" />
                  <option value="Pepsi" />
                  <option value="Amazon Basics" />
                </datalist>
              </div>
              <div>
                <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">
                  Stock*
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="discount" className="block text-gray-700 font-medium mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="sku" className="block text-gray-700 font-medium mb-1">
                  SKU*
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Product Images*
              </label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    required
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                    disabled={formData.images.length === 1}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 text-green-600 hover:text-green-800"
              >
                + Add Another Image
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 && !showAddForm ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">You don't have any products yet</h2>
          <p className="text-gray-600 mb-6">Start selling by adding your first product.</p>
          <button
            onClick={handleAddNew}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition flex items-center mx-auto"
          >
            <FaPlus className="mr-2" /> Add Your First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 object-cover rounded"
                            src={(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/40'}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${(product.price !== undefined && !isNaN(product.price)) ? Number(product.price).toFixed(2) : '0.00'}
                        {product.discount !== undefined && product.discount > 0 && (
                          <span className="ml-2 text-xs text-red-600">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock !== undefined && product.stock > 0 ? (
                          <span className="text-green-600">{product.stock} in stock</span>
                        ) : (
                          <span className="text-red-600">Out of stock</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
