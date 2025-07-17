// import React, { useState } from 'react';
// import axios from 'axios';
// import { Upload, X, Info } from 'lucide-react';

// interface FormData {
//   id: string;
//   name: string;
//   brand: string;
//   image: File | null;
//   price: string;
//   originalPrice: string;
//   discount: string;
//   rating: number;
//   reviews: number;
//   features: string;
//   description: string;
//   category: string;
//   type: 'mobile' | 'laptop';
//   inStock: boolean;
// }

// const exampleProduct = {
//   id: 'iphone-15-pro-max',
//   name: 'iPhone 15 Pro Max',
//   brand: 'Apple',
//   image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
//   price: '1 479',
//   originalPrice: '1 579',
//   discount: '-100',
//   rating: 4.8,
//   reviews: 2847,
//   features: '256GB, Titane Naturel, ProRAW, Action Button',
//   description: 'Le iPhone 15 Pro Max redéfinit ce qu\'un smartphone peut faire avec le processeur A17 Pro révolutionnaire et un système de caméra professionnel avancé.',
//   category: 'Premium',
//   type: 'mobile',
//   inStock: true
// };

// const ProductForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     id: '',
//     name: '',
//     brand: '',
//     image: null,
//     price: '',
//     originalPrice: '',
//     discount: '',
//     rating: 0,
//     reviews: 0,
//     features: '',
//     description: '',
//     category: '',
//     type: 'mobile',
//     inStock: true,
//   });

//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [showExample, setShowExample] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;

//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setFormData({
//         ...formData,
//         image: file
//       });

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const loadExample = () => {
//     setFormData({
//       ...formData,
//       id: exampleProduct.id,
//       name: exampleProduct.name,
//       brand: exampleProduct.brand,
//       price: exampleProduct.price,
//       originalPrice: exampleProduct.originalPrice,
//       discount: exampleProduct.discount,
//       rating: exampleProduct.rating,
//       reviews: exampleProduct.reviews,
//       features: exampleProduct.features,
//       description: exampleProduct.description,
//       category: exampleProduct.category,
//       type: exampleProduct.type as 'mobile' | 'laptop',
//       inStock: exampleProduct.inStock
//     });
//     setPreviewImage(exampleProduct.image);
//     setShowExample(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append('id', formData.id);
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('brand', formData.brand);
//     if (formData.image) {
//       formDataToSend.append('image', formData.image);
//     }
//     formDataToSend.append('price', formData.price);
//     formDataToSend.append('originalPrice', formData.originalPrice);
//     formDataToSend.append('discount', formData.discount);
//     formDataToSend.append('rating', formData.rating.toString());
//     formDataToSend.append('reviews', formData.reviews.toString());
//     formDataToSend.append('features', formData.features);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('category', formData.category);
//     formDataToSend.append('type', formData.type);
//     formDataToSend.append('inStock', String(formData.inStock));

//     try {
//       const endpoint = formData.type === 'mobile'
//         ? 'https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/add-mobile'
//         : 'https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/add-laptop';

//       await axios.post(endpoint, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       alert('Product added successfully!');
//       setFormData({
//         id: '',
//         name: '',
//         brand: '',
//         image: null,
//         price: '',
//         originalPrice: '',
//         discount: '',
//         rating: 0,
//         reviews: 0,
//         features: '',
//         description: '',
//         category: '',
//         type: 'mobile',
//         inStock: true
//       });
//       setPreviewImage(null);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add product');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="card">
//         <div className="card-header">
//           <h2>Add New Product</h2>
//           <button 
//             className="btn btn-outline"
//             onClick={() => setShowExample(true)}
//           >
//             <Info /> Show Example
//           </button>
//         </div>
        
//         {showExample ? (
//           <div className="example-modal">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h3>Example Product</h3>
//                 <button onClick={() => setShowExample(false)} className="close-btn">
//                   <X />
//                 </button>
//               </div>
//               <div className="example-content">
//                 <div className="example-image">
//                   <img src={exampleProduct.image} alt={exampleProduct.name} />
//                 </div>
//                 <div className="example-details">
//                   <div className="detail-row">
//                     <span className="detail-label">ID:</span>
//                     <span>{exampleProduct.id}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Name:</span>
//                     <span>{exampleProduct.name}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Brand:</span>
//                     <span>{exampleProduct.brand}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Price:</span>
//                     <span>{exampleProduct.price}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Original Price:</span>
//                     <span>{exampleProduct.originalPrice}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Discount:</span>
//                     <span>{exampleProduct.discount}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Rating:</span>
//                     <span>{exampleProduct.rating}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Reviews:</span>
//                     <span>{exampleProduct.reviews}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Features:</span>
//                     <span>{exampleProduct.features}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Description:</span>
//                     <span>{exampleProduct.description}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Category:</span>
//                     <span>{exampleProduct.category}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Type:</span>
//                     <span>{exampleProduct.type}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">In Stock:</span>
//                     <span>{exampleProduct.inStock ? 'Yes' : 'No'}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button onClick={loadExample} className="btn btn-primary">
//                   Use This Example
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="form-grid" encType="multipart/form-data">
//             <div className="form-group">
//               <label>Product ID</label>
//               <input name="id" placeholder="e.g. iphone-15-pro-max" value={formData.id} onChange={handleChange} required />
//             </div>
            
//             <div className="form-group">
//               <label>Product Name</label>
//               <input name="name" placeholder="e.g. iPhone 15 Pro Max" value={formData.name} onChange={handleChange} required />
//             </div>
            
//             <div className="form-group">
//               <label>Brand</label>
//               <input name="brand" placeholder="e.g. Apple" value={formData.brand} onChange={handleChange} required />
//             </div>
            
//             <div className="form-group">
//               <label>Product Type</label>
//               <select name="type" value={formData.type} onChange={handleChange}>
//                 <option value="mobile">Mobile</option>
//                 <option value="laptop">Laptop</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Category</label>
//               <input name="category" placeholder="e.g. Premium" value={formData.category} onChange={handleChange} />
//             </div>
            
//             <div className="form-group">
//               <label>Current Price</label>
//               <input name="price" placeholder="e.g. 1 479" value={formData.price} onChange={handleChange} required />
//             </div>
            
//             <div className="form-group">
//               <label>Original Price</label>
//               <input name="originalPrice" placeholder="e.g. 1 579" value={formData.originalPrice} onChange={handleChange} />
//             </div>
            
//             <div className="form-group">
//               <label>Discount</label>
//               <input name="discount" placeholder="e.g. -100" value={formData.discount} onChange={handleChange} />
//             </div>
            
//             <div className="form-group">
//               <label>Rating (0-5)</label>
//               <input 
//                 name="rating" 
//                 type="number" 
//                 step="0.1" 
//                 min="0" 
//                 max="5" 
//                 value={formData.rating} 
//                 onChange={handleChange} 
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Number of Reviews</label>
//               <input 
//                 name="reviews" 
//                 type="number" 
//                 min="0" 
//                 value={formData.reviews} 
//                 onChange={handleChange} 
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Features (comma-separated)</label>
//               <input name="features" placeholder="e.g. 256GB, Titanium, ProRAW" value={formData.features} onChange={handleChange} />
//             </div>
            
//             <div className="form-group span-2">
//               <label>Description</label>
//               <textarea name="description" placeholder="Product description..." value={formData.description} onChange={handleChange}></textarea>
//             </div>

//             <div className="form-group span-2">
//               <label>Product Image</label>
//                 <div className="file-upload">
//                   <label className="upload-btn">
//                     <Upload /> Choose Image
//                   <input 
//                     type="file" 
//                     name="image"
//                     accept="image/png, image/jpeg, image/jpg" 
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
//                 </label>
//                 {previewImage && (
//                   <div className="image-preview">
//                     <img src={previewImage} alt="Preview" />
//                     <button type="button" onClick={() => {
//                       setPreviewImage(null);
//                       setFormData({...formData, image: null});
//                     }} className="remove-image">
//                       <X />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

            
//             <div className="form-group">
//               <label className="checkbox-label">
//                 <input 
//                   name="inStock" 
//                   type="checkbox" 
//                   checked={formData.inStock} 
//                   onChange={handleChange} 
//                   className="checkbox-input"
//                 />
//                 <span className="checkbox-custom"></span>
//                 In Stock
//               </label>
//             </div>
            
//             <div className="form-group span-2">
//               <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                 {isSubmitting ? 'Adding Product...' : 'Add Product'}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductForm;







import React, { useState } from 'react';
import axios from 'axios';
import { Upload, X, Info } from 'lucide-react';

interface FormData {
  id: string;
  name: string;
  brand: string;
  image: File | null;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  features: string;
  description: string;
  category: string;
  type: 'mobile' | 'laptop';
  inStock: boolean;
}

const exampleProduct = {
  id: 'iphone-15-pro-max',
  name: 'iPhone 15 Pro Max',
  brand: 'Apple',
  image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
  price: '1 479',
  originalPrice: '1 579',
  discount: '-100',
  rating: 4.8,
  reviews: 2847,
  features: '256GB, Titane Naturel, ProRAW, Action Button',
  description: 'Le iPhone 15 Pro Max redéfinit ce qu\'un smartphone peut faire avec le processeur A17 Pro révolutionnaire et un système de caméra professionnel avancé.',
  category: 'Premium',
  type: 'mobile',
  inStock: true
};

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    brand: '',
    image: null,
    price: '',
    originalPrice: '',
    discount: '',
    rating: 0,
    reviews: 0,
    features: '',
    description: '',
    category: '',
    type: 'mobile',
    inStock: true,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadExample = () => {
    setFormData({
      ...formData,
      id: exampleProduct.id,
      name: exampleProduct.name,
      brand: exampleProduct.brand,
      price: exampleProduct.price,
      originalPrice: exampleProduct.originalPrice,
      discount: exampleProduct.discount,
      rating: exampleProduct.rating,
      reviews: exampleProduct.reviews,
      features: exampleProduct.features,
      description: exampleProduct.description,
      category: exampleProduct.category,
      type: exampleProduct.type as 'mobile' | 'laptop',
      inStock: exampleProduct.inStock
    });
    setPreviewImage(exampleProduct.image);
    setShowExample(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('id', formData.id);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('brand', formData.brand);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    formDataToSend.append('price', formData.price);
    formDataToSend.append('originalPrice', formData.originalPrice);
    formDataToSend.append('discount', formData.discount);
    formDataToSend.append('rating', formData.rating.toString());
    formDataToSend.append('reviews', formData.reviews.toString());
    formDataToSend.append('features', formData.features);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('inStock', String(formData.inStock));

    try {
      const endpoint = formData.type === 'mobile'
        ? 'https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/add-mobile'
        : 'https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/products/add-laptop';

      await axios.post(endpoint, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Product added successfully!');
      setFormData({
        id: '',
        name: '',
        brand: '',
        image: null,
        price: '',
        originalPrice: '',
        discount: '',
        rating: 0,
        reviews: 0,
        features: '',
        description: '',
        category: '',
        type: 'mobile',
        inStock: true
      });
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h2>Add New Product</h2>
          <button 
            className="btn btn-outline"
            onClick={() => setShowExample(true)}
          >
            <Info /> Show Example
          </button>
        </div>
        
        {showExample ? (
          <div className="example-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Example Product</h3>
                <button onClick={() => setShowExample(false)} className="close-btn">
                  <X />
                </button>
              </div>
              <div className="example-content">
                <div className="example-image">
                  <img src={exampleProduct.image} alt={exampleProduct.name} />
                </div>
                <div className="example-details">
                  <div className="detail-row">
                    <span className="detail-label">ID:</span>
                    <span>{exampleProduct.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span>{exampleProduct.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Brand:</span>
                    <span>{exampleProduct.brand}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span>{exampleProduct.price}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Original Price:</span>
                    <span>{exampleProduct.originalPrice}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Discount:</span>
                    <span>{exampleProduct.discount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Rating:</span>
                    <span>{exampleProduct.rating}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Reviews:</span>
                    <span>{exampleProduct.reviews}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Features:</span>
                    <span>{exampleProduct.features}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <span>{exampleProduct.description}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span>{exampleProduct.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span>{exampleProduct.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">In Stock:</span>
                    <span>{exampleProduct.inStock ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={loadExample} className="btn btn-primary">
                  Use This Example
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-grid" encType="multipart/form-data">
            <div className="form-group">
              <label>Product ID</label>
              <input name="id" placeholder="e.g. iphone-15-pro-max" value={formData.id} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Product Name</label>
              <input name="name" placeholder="e.g. iPhone 15 Pro Max" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Brand</label>
              <input name="brand" placeholder="e.g. Apple" value={formData.brand} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Product Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <input name="category" placeholder="e.g. Premium" value={formData.category} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Current Price</label>
              <input name="price" placeholder="e.g. 1 479" value={formData.price} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Original Price</label>
              <input name="originalPrice" placeholder="e.g. 1 579" value={formData.originalPrice} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Discount</label>
              <input name="discount" placeholder="e.g. -100" value={formData.discount} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Rating (0-5)</label>
              <input 
                name="rating" 
                type="number" 
                step="0.1" 
                min="0" 
                max="5" 
                value={formData.rating} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Number of Reviews</label>
              <input 
                name="reviews" 
                type="number" 
                min="0" 
                value={formData.reviews} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Features (comma-separated)</label>
              <input name="features" placeholder="e.g. 256GB, Titanium, ProRAW" value={formData.features} onChange={handleChange} />
            </div>
            
            <div className="form-group span-2">
              <label>Description</label>
              <textarea name="description" placeholder="Product description..." value={formData.description} onChange={handleChange}></textarea>
            </div>

            <div className="form-group span-2">
              <label>Product Image</label>
                <div className="file-upload">
                  <label className="upload-btn">
                    <Upload /> Choose Image
                  <input 
                    type="file" 
                    name="image"
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Preview" />
                    <button type="button" onClick={() => {
                      setPreviewImage(null);
                      setFormData({...formData, image: null});
                    }} className="remove-image">
                      <X />
                    </button>
                  </div>
                )}
              </div>
            </div>

            
            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  name="inStock" 
                  type="checkbox" 
                  checked={formData.inStock} 
                  onChange={handleChange} 
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                In Stock
              </label>
            </div>
            
            <div className="form-group span-2">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductForm;