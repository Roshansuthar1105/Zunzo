import { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope, FaSearch, FaCheck } from 'react-icons/fa';
import { getContacts, deleteContact } from '../../api';
import toast from 'react-hot-toast';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  
  useEffect(() => {
    fetchContacts();
  }, []);
  
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.username?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.message?.toLowerCase().includes(searchLower)
    );
  });
  
  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    
    try {
      setLoading(true);
      await deleteContact(contactId);
      
      // Update local state
      setContacts(contacts.filter((contact) => contact._id !== contactId));
      
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact(null);
      }
      
      toast.success('Contact message deleted successfully');
    } catch (err) {
      console.error('Error deleting contact:', err);
      toast.error('Failed to delete contact message');
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };
  
  if (loading && contacts.length === 0) {
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
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      
      {/* Search */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
        
        <div>
          <span className="text-gray-600">
            Total Messages: <span className="font-semibold">{contacts.length}</span>
          </span>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Contacts List */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-y-auto max-h-[600px]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr 
                      key={contact._id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedContact && selectedContact._id === contact._id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleViewContact(contact)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaEnvelope className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{contact.username}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact._id);
                          }}
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
        </div>
        
        {/* Contact Details */}
        <div className="lg:w-1/2">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selectedContact.username}</h2>
                  <p className="text-gray-600">{selectedContact.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-2">Message:</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedContact.message}</p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    // Here you would implement a function to mark as read/unread
                    toast.success('Message marked as read');
                  }}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <FaCheck className="mr-1" /> Mark as Read
                </button>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-64">
              <FaEnvelope className="text-gray-400 text-4xl mb-4" />
              <p className="text-gray-500 text-center">
                Select a message to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
