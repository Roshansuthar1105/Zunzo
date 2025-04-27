import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen, FaHome } from 'react-icons/fa';

const OrderConfirmationPage = () => {
  const location = useLocation();

  // Get order number from location state or generate a fallback
  const orderNumber = location.state?.orderNumber || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderId = location.state?.orderId;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your purchase</p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Order Number:</span>
            <span className="text-gray-800 font-semibold">#{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Order Date:</span>
            <span className="text-gray-800 font-semibold">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="text-gray-800 font-semibold">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <FaBoxOpen className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Order Processing</h3>
                <p className="text-gray-600">
                  We're preparing your order for shipment. You'll receive an email confirmation with tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            A confirmation email has been sent to your email address. Please check your inbox for order details and tracking information.
          </p>
          <p className="text-gray-600">
            If you have any questions about your order, please contact our customer service team at <a href="mailto:support@zunzo.com" className="text-blue-600 hover:underline">support@zunzo.com</a> or call us at <a href="tel:+15551234567" className="text-blue-600 hover:underline">+1 (555) 123-4567</a>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {orderId ? (
            <Link
              to={`/profile/orders/${orderId}`}
              className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaBoxOpen className="mr-2" /> View Order Details
            </Link>
          ) : (
            <Link
              to="/profile"
              className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaBoxOpen className="mr-2" /> View Orders
            </Link>
          )}
          <Link
            to="/products"
            className="bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 transition flex items-center justify-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-semibold hover:bg-gray-300 transition flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
