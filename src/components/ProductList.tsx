



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit, ChevronDown, Search, X } from 'lucide-react';

interface Product {
  id: string;
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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Fetch product list
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/${type === 'mobile' ? 'mobiles' : 'laptops'}`
      );
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete product by ID
  const handleDelete = async (id: string) => {
  try {
    setIsLoading(true);
    await axios.delete(
      `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/delete/${type}/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    setProducts(products.filter(p => p.id !== id));
  } catch (err) {
    console.error('Failed to delete product:', err);
    // Add error notification for user
  } finally {
    setIsLoading(false);
    setConfirmDeleteId(null);
  }
};

  useEffect(() => {
    fetchProducts();
  }, [type]);

  // Filter by search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Loading State */}
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
                            >
                              <Trash2 />
                            </button>
                            <button 
                              className="btn-icon" 
                              onClick={() => setConfirmDeleteId(null)}
                              title="Cancel"
                            >
                              <X />
                            </button>
                          </>
                        ) : (
                          <button 
                            className="btn-icon" 
                            onClick={() => setConfirmDeleteId(product.id)}
                            title="Delete"
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