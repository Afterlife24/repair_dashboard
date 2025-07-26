import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit, ChevronDown, Search, X } from 'lucide-react';

interface Product {
  id: string;
  _id?: string; // For MongoDB _id
  name: string;
  brand: string;
  price: string;
  type: 'mobile' | 'laptop';
  inStock: boolean;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [type, setType] = useState<'mobile' | 'laptop'>('mobile');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/${type === 'mobile' ? 'mobiles' : 'laptops'}`
      );

      const normalized = response.data.map((item: any) => ({
        ...item,
        id: item.id || item._id, // Handle both id and _id
      }));

      setProducts(normalized);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      setError('No product ID provided for deletion');
      return;
    }

    setIsDeleting(true);
    setError(null);
    try {
      // Using the generic delete endpoint
      await axios.delete(
        `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/delete/${type}/${id}`
      );
      
      // Optimistic update
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
      
      // Fallback to specific endpoints if generic fails
      try {
        const specificEndpoint = type === 'mobile' 
          ? `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/delete-mobile/${id}`
          : `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/delete-laptop/${id}`;

        await axios.delete(specificEndpoint);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (fallbackErr) {
        console.error('Fallback delete failed:', fallbackErr);
        setError('Failed to delete product. Please try again.');
        // Re-fetch to ensure consistency
        fetchProducts();
      }
    } finally {
      setIsDeleting(false);
      setConfirmDeleteId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [type]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h2>Product Inventory</h2>
          <div className="controls">
            <div className="search-box">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="type-selector">
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as 'mobile' | 'laptop')}
              >
                <option value="mobile">Mobiles</option>
                <option value="laptop">Laptops</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading && products.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        ) : (
          <div className="product-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td className="product-info">
                      <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-id">ID: {product.id}</div>
                      </div>
                    </td>
                    <td>{product.brand}</td>
                    <td>${product.price}</td>
                    <td>
                      <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="Edit">
                          <Edit />
                        </button>
                        {confirmDeleteId === product.id ? (
                          <>
                            <button 
                              className="btn-icon danger" 
                              onClick={() => handleDelete(product.id)}
                              title="Confirm Delete"
                              disabled={isDeleting}
                            >
                              <Trash2 />
                            </button>
                            <button 
                              className="btn-icon" 
                              onClick={() => setConfirmDeleteId(null)}
                              title="Cancel"
                              disabled={isDeleting}
                            >
                              <X />
                            </button>
                          </>
                        ) : (
                          <button 
                            className="btn-icon" 
                            onClick={() => setConfirmDeleteId(product.id)}
                            title="Delete"
                            disabled={isLoading || isDeleting}
                          >
                            <Trash2 />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;