// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Trash2, Edit, ChevronDown, Search, X, Plus } from 'lucide-react';
// import './css/RepairList.css';

// interface RepairOption {
//   name: string;
//   estimatedCost: number;
//   description: string;
//   screenType?: string;
//   includesKeyboard?: boolean;
//   includesStylus?: boolean;
//   includesControllers?: boolean;
// }

// interface Repair {
//   _id: string;
//   brand: string;
//   model: string;
//   repairOptions: RepairOption[];
//   createdAt: string;
//   updatedAt: string;
// }

// const RepairList: React.FC = () => {
//   const [repairs, setRepairs] = useState<Repair[]>([]);
//   const [type, setType] = useState<'mobile' | 'laptop' | 'tablet' | 'console'>('mobile');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);

//   // Map type to API endpoint
//   const getEndpoint = () => {
//     switch (type) {
//       case 'mobile': return 'mobiles';
//       case 'laptop': return 'laptops';
//       case 'tablet': return 'tablets';
//       case 'console': return 'consoles';
//       default: return 'mobiles';
//     }
//   };

//   // Fetch repair list
//   const fetchRepairs = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}`
//       );
//       setRepairs(response.data);
//     } catch (err) {
//       console.error('Failed to fetch repairs:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Delete repair by ID
//   const handleDelete = async (id: string) => {
//     try {
//       setIsLoading(true);
//       await axios.delete(`https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${id}`);
//       setRepairs(repairs.filter(r => r._id !== id));
//     } catch (err) {
//       console.error('Failed to delete repair:', err);
//     } finally {
//       setIsLoading(false);
//       setConfirmDeleteId(null);
//     }
//   };

//   // Open edit modal
//   const handleEdit = (repair: Repair) => {
//     setCurrentRepair(repair);
//     setIsEditModalOpen(true);
//   };

//   // Open add modal
//   const handleAddNew = () => {
//     setCurrentRepair(null);
//     setIsAddModalOpen(true);
//   };

//   // Close all modals
//   const closeModals = () => {
//     setIsEditModalOpen(false);
//     setIsAddModalOpen(false);
//     setCurrentRepair(null);
//   };

//   // Save changes (for both add and edit)
//   const handleSave = async (updatedRepair: Repair) => {
//     try {
//       setIsLoading(true);
//       if (updatedRepair._id) {
//         // Update existing repair
//         await axios.put(
//           `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${updatedRepair._id}`,
//           updatedRepair
//         );
//       } else {
//         // Add new repair
//         await axios.post(
//           `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs`,
//           { ...updatedRepair, category: type }
//         );
//       }
//       closeModals();
//       fetchRepairs(); // Refresh the list
//     } catch (err) {
//       console.error('Failed to save repair:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRepairs();
//   }, [type]);

//   // Filter by search term
//   const filteredRepairs = repairs.filter(repair =>
//     repair.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     repair.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     repair._id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   // Count repair options
//   const countRepairOptions = (options: RepairOption[]) => {
//     return options.length;
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="card">
//         <div className="card-header">
//           <h2>Repair Services Management</h2>
//           <div className="controls">
//             <div className="search-box">
//               <Search className="search-icon" />
//               <input 
//                 type="text" 
//                 placeholder="Search repairs..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="type-selector">
//               <select 
//                 value={type} 
//                 onChange={(e) => setType(e.target.value as any)}
//               >
//                 <option value="mobile">Mobiles</option>
//                 <option value="laptop">Laptops</option>
//                 <option value="tablet">Tablets</option>
//                 <option value="console">Consoles</option>
//               </select>
//               <ChevronDown className="select-arrow" />
//             </div>
//             <button className="btn-primary" onClick={handleAddNew}>
//               <Plus size={16} /> Add New
//             </button>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && repairs.length === 0 ? (
//           <div className="loading-state">
//             <div className="spinner"></div>
//             <p>Loading repairs...</p>
//           </div>
//         ) : filteredRepairs.length === 0 ? (
//           <div className="empty-state">
//             <p>No repairs found</p>
//           </div>
//         ) : (
//           <div className="repair-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Brand</th>
//                   <th>Model</th>
//                   <th>Repair Options</th>
//                   <th>Last Updated</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRepairs.map(repair => (
//                   <tr key={repair._id}>
//                     <td>{repair.brand}</td>
//                     <td className="model-cell">{repair.model}</td>
//                     <td>
//                       <span className="badge">
//                         {countRepairOptions(repair.repairOptions)} services
//                       </span>
//                     </td>
//                     <td>{formatDate(repair.updatedAt)}</td>
//                     <td>
//                       <div className="action-buttons">
//                         <button 
//                           className="btn-icon" 
//                           title="Edit"
//                           onClick={() => handleEdit(repair)}
//                         >
//                           <Edit size={18} />
//                         </button>
//                         {confirmDeleteId === repair._id ? (
//                           <>
//                             <button 
//                               className="btn-icon danger" 
//                               onClick={() => handleDelete(repair._id)}
//                               title="Confirm Delete"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                             <button 
//                               className="btn-icon" 
//                               onClick={() => setConfirmDeleteId(null)}
//                               title="Cancel"
//                             >
//                               <X size={18} />
//                             </button>
//                           </>
//                         ) : (
//                           <button 
//                             className="btn-icon" 
//                             onClick={() => setConfirmDeleteId(repair._id)}
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && currentRepair && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Edit Repair</h3>
//             <RepairForm 
//               repair={currentRepair} 
//               onSave={handleSave} 
//               onCancel={closeModals} 
//               type={type}
//             />
//           </div>
//         </div>
//       )}

//       {/* Add Modal */}
//       {isAddModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Add New Repair</h3>
//             <RepairForm 
//               repair={null} 
//               onSave={handleSave} 
//               onCancel={closeModals} 
//               type={type}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Simple Repair Form Component (to be implemented)
// const RepairForm: React.FC<{
//   repair: Repair | null;
//   onSave: (repair: Repair) => void;
//   onCancel: () => void;
//   type: string;
// }> = ({ repair, onSave, onCancel, type }) => {
//   const [formData, setFormData] = useState<Repair>(repair || {
//     _id: '',
//     brand: '',
//     model: '',
//     repairOptions: [],
//     createdAt: '',
//     updatedAt: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Brand</label>
//         <input 
//           type="text" 
//           value={formData.brand}
//           onChange={(e) => setFormData({...formData, brand: e.target.value})}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label>Model</label>
//         <input 
//           type="text" 
//           value={formData.model}
//           onChange={(e) => setFormData({...formData, model: e.target.value})}
//           required
//         />
//       </div>
//       {/* Add repair options management here */}
//       <div className="form-actions">
//         <button type="button" className="btn-secondary" onClick={onCancel}>
//           Cancel
//         </button>
//         <button type="submit" className="btn-primary">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default RepairList;




































// perfectly working - without drop down

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit, ChevronDown, Search, X, Plus } from 'lucide-react';
import './css/RepairList.css';

interface RepairOption {
  _id?: string;
  name: string;
  estimatedCost: number;
  description: string;
  screenType?: string;
  includesKeyboard?: boolean;
  includesStylus?: boolean;
  includesControllers?: boolean;
}

interface Repair {
  _id: string;
  brand: string;
  model: string;
  repairOptions: RepairOption[];
  createdAt: string;
  updatedAt: string;
}

const RepairList: React.FC = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [type, setType] = useState<'mobile' | 'laptop' | 'tablet' | 'console'>('mobile');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);
  const [currentOption, setCurrentOption] = useState<RepairOption | null>(null);
  const [isNewOption, setIsNewOption] = useState(false);

  // Map type to API endpoint
  const getEndpoint = () => {
    switch (type) {
      case 'mobile': return 'mobiles';
      case 'laptop': return 'laptops';
      case 'tablet': return 'tablets';
      case 'console': return 'consoles';
      default: return 'mobiles';
    }
  };

  // Fetch repair list
  const fetchRepairs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}`
      );
      setRepairs(response.data);
    } catch (err) {
      console.error('Failed to fetch repairs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete repair by ID
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${id}`);
      setRepairs(repairs.filter(r => r._id !== id));
    } catch (err) {
      console.error('Failed to delete repair:', err);
    } finally {
      setIsLoading(false);
      setConfirmDeleteId(null);
    }
  };

  // Open edit modal
  const handleEdit = (repair: Repair) => {
    setCurrentRepair(repair);
    setIsEditModalOpen(true);
  };

  // Open add modal
  const handleAddNew = () => {
    setCurrentRepair({
      _id: '',
      brand: '',
      model: '',
      repairOptions: [],
      createdAt: '',
      updatedAt: ''
    });
    setIsAddModalOpen(true);
  };

  // Open option edit modal
  const handleEditOption = (repair: Repair, option: RepairOption, isNew = false) => {
    setCurrentRepair(repair);
    setCurrentOption(option);
    setIsNewOption(isNew);
    setIsOptionModalOpen(true);
  };

  // Close all modals
  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setIsOptionModalOpen(false);
    setCurrentRepair(null);
    setCurrentOption(null);
  };

  // Save repair
  const handleSaveRepair = async (updatedRepair: Repair) => {
    try {
      setIsLoading(true);
      if (updatedRepair._id) {
        // Update existing repair
        await axios.put(
          `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${updatedRepair._id}`,
          updatedRepair
        );
      } else {
        // Add new repair
        await axios.post(
          `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs`,
          { ...updatedRepair, category: type }
        );
      }
      closeModals();
      fetchRepairs(); // Refresh the list
    } catch (err) {
      console.error('Failed to save repair:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Save repair option
  const handleSaveOption = async (option: RepairOption) => {
    try {
      setIsLoading(true);
      if (!currentRepair) return;

      if (isNewOption) {
        // Add new option
        await axios.post(
          `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${currentRepair._id}/options`,
          option
        );
      } else if (option._id) {
        // Update existing option
        await axios.put(
          `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${currentRepair._id}/options/${option._id}`,
          option
        );
      }
      closeModals();
      fetchRepairs(); // Refresh the list
    } catch (err) {
      console.error('Failed to save repair option:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete repair option
  const handleDeleteOption = async (repairId: string, optionId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${repairId}/options/${optionId}`
      );
      fetchRepairs(); // Refresh the list
    } catch (err) {
      console.error('Failed to delete repair option:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, [type]);

  // Filter by search term
  const filteredRepairs = repairs.filter(repair =>
    repair.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repair.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repair._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h2>Repair Services Management</h2>
          <div className="controls">
            <div className="search-box">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search repairs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="type-selector">
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="mobile">Mobiles</option>
                <option value="laptop">Laptops</option>
                <option value="tablet">Tablets</option>
                <option value="console">Consoles</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>
            <button className="btn-primary" onClick={handleAddNew}>
              <Plus size={16} /> Add New
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && repairs.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading repairs...</p>
          </div>
        ) : filteredRepairs.length === 0 ? (
          <div className="empty-state">
            <p>No repairs found</p>
          </div>
        ) : (
          <div className="repair-table">
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Repair Options</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRepairs.map(repair => (
                  <tr key={repair._id}>
                    <td>{repair.brand}</td>
                    <td className="model-cell">{repair.model}</td>
                    <td>
                      <div className="options-list">
                        {repair.repairOptions.map(option => (
                          <div key={option._id} className="option-item">
                            <div className="option-header">
                              <span className="option-name">{option.name}</span>
                              <span className="option-cost">${option.estimatedCost}</span>
                            </div>
                            <div className="option-actions">
                              <button 
                                className="btn-icon small" 
                                onClick={() => handleEditOption(repair, option)}
                                title="Edit option"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                className="btn-icon small danger" 
                                onClick={() => option._id && handleDeleteOption(repair._id, option._id)}
                                title="Delete option"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button 
                          className="btn-text small"
                          onClick={() => handleEditOption(repair, {
                            name: '',
                            estimatedCost: 0,
                            description: ''
                          }, true)}
                        >
                          <Plus size={14} /> Add Option
                        </button>
                      </div>
                    </td>
                    <td>{formatDate(repair.updatedAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-icon" 
                          title="Edit"
                          onClick={() => handleEdit(repair)}
                        >
                          <Edit size={18} />
                        </button>
                        {confirmDeleteId === repair._id ? (
                          <>
                            <button 
                              className="btn-icon danger" 
                              onClick={() => handleDelete(repair._id)}
                              title="Confirm Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button 
                              className="btn-icon" 
                              onClick={() => setConfirmDeleteId(null)}
                              title="Cancel"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <button 
                            className="btn-icon" 
                            onClick={() => setConfirmDeleteId(repair._id)}
                            title="Delete"
                          >
                            <Trash2 size={18} />
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

      {/* Repair Edit Modal */}
      {isEditModalOpen && currentRepair && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{currentRepair._id ? 'Edit Repair' : 'Add New Repair'}</h3>
            <RepairForm 
              repair={currentRepair} 
              onSave={handleSaveRepair} 
              onCancel={closeModals} 
              type={type}
            />
          </div>
        </div>
      )}

      {/* Repair Option Edit Modal */}
      {isOptionModalOpen && currentOption && currentRepair && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isNewOption ? 'Add New Repair Option' : 'Edit Repair Option'}</h3>
            <RepairOptionForm 
              option={currentOption} 
              type={type}
              onSave={handleSaveOption} 
              onCancel={closeModals}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Repair Form Component
const RepairForm: React.FC<{
  repair: Repair;
  onSave: (repair: Repair) => void;
  onCancel: () => void;
  type: string;
}> = ({ repair, onSave, onCancel, type }) => {
  const [formData, setFormData] = useState<Repair>(repair);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Brand</label>
        <input 
          type="text" 
          value={formData.brand}
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Model</label>
        <input 
          type="text" 
          value={formData.model}
          onChange={(e) => setFormData({...formData, model: e.target.value})}
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

// Repair Option Form Component
const RepairOptionForm: React.FC<{
  option: RepairOption;
  type: string;
  onSave: (option: RepairOption) => void;
  onCancel: () => void;
}> = ({ option, type, onSave, onCancel }) => {
  const [formData, setFormData] = useState<RepairOption>(option);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Service Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Estimated Cost ($)</label>
        <input 
          type="number" 
          value={formData.estimatedCost}
          onChange={(e) => setFormData({...formData, estimatedCost: Number(e.target.value)})}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
          rows={3}
        />
      </div>
      
      {/* Type-specific fields */}
      {type === 'mobile' || type === 'tablet' ? (
        <div className="form-group">
          <label>Screen Type</label>
          <select
            value={formData.screenType || ''}
            onChange={(e) => setFormData({...formData, screenType: e.target.value})}
          >
            <option value="">Select screen type</option>
            <option value="OLED">OLED</option>
            <option value="AMOLED">AMOLED</option>
            <option value="LCD">LCD</option>
          </select>
        </div>
      ) : type === 'laptop' ? (
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.includesKeyboard || false}
              onChange={(e) => setFormData({...formData, includesKeyboard: e.target.checked})}
            />
            Includes Keyboard Replacement
          </label>
        </div>
      ) : type === 'tablet' ? (
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.includesStylus || false}
              onChange={(e) => setFormData({...formData, includesStylus: e.target.checked})}
            />
            Includes Stylus Replacement
          </label>
        </div>
      ) : type === 'console' ? (
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.includesControllers || false}
              onChange={(e) => setFormData({...formData, includesControllers: e.target.checked})}
            />
            Includes Controllers
          </label>
        </div>
      ) : null}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default RepairList;























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Trash2, Edit, ChevronDown, Search, X, Plus } from 'lucide-react';
// import './css/RepairList.css';

// interface RepairOption {
//   _id?: string;
//   name: string;
//   estimatedCost: number | null;
//   description: string;
//   screenType?: string;
//   includesKeyboard?: boolean;
//   includesStylus?: boolean;
//   includesControllers?: boolean;
// }

// interface Repair {
//   _id: string;
//   brand: string;
//   model: string;
//   repairOptions: RepairOption[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface ServiceTemplate {
//   name: string;
//   cost: number | null;
//   description: string;
// }

// const serviceTemplates: ServiceTemplate[] = [
//   { name: "Vitre + écran LCD compatible", cost: 159, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Vitre + écran OLED similaire à l'original", cost: 259, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Batterie", cost: 149, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Connecteur de charge", cost: 159, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Micro", cost: 159, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Caméra avant", cost: 89, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Caméra arrière", cost: 159, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Vitre camera arrière", cost: 59, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Vitre arrière", cost: 169, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Bouton power", cost: 149, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Bouton volume", cost: 149, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Vibreur", cost: 79, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Ecouteur Interne", cost: 79, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Haut parleur", cost: 79, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Nappe NFC", cost: 149, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Lecteur sim", cost: null, description: "réparation en 1 heure en atelier. Garantie 3 mois." },
//   { name: "Tiroir sim", cost: 10, description: "Sur commande en 24h-48h." },
//   { name: "Desoxydation", cost: 49, description: "résultat en 24h-48h selon les dégâts." },
//   { name: "Transfert de donnees", cost: 20, description: "" },
//   { name: "Recuperation de donnees", cost: 30, description: "Forfait démontage de 20€ supplémentaires si l'appareil est endommagé ou non fonctionnel." },
//   { name: "Recherche de panne", cost: 0, description: "Résultat sous 24h. Déductible des éventuelles réparations." }
// ];

// const RepairList: React.FC = () => {
//   const [repairs, setRepairs] = useState<Repair[]>([]);
//   const [brands, setBrands] = useState<string[]>([]);
//   const [type, setType] = useState<'mobile' | 'laptop' | 'tablet' | 'console'>('mobile');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
//   const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);
//   const [currentOption, setCurrentOption] = useState<RepairOption | null>(null);
//   const [isNewOption, setIsNewOption] = useState(false);

//   // Map type to API endpoint
//   const getEndpoint = () => {
//     switch (type) {
//       case 'mobile': return 'mobiles';
//       case 'laptop': return 'laptops';
//       case 'tablet': return 'tablets';
//       case 'console': return 'consoles';
//       default: return 'mobiles';
//     }
//   };

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const brandsRes = await axios.get(`https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/brands/${type}`);
//         setBrands(brandsRes.data.map((b: any) => b.name));
//         fetchRepairs();
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [type]);

//   // Fetch repairs
//   const fetchRepairs = async () => {
//     try {
//       const response = await axios.get(
//         `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}`
//       );
//       setRepairs(response.data);
//     } catch (err) {
//       console.error('Failed to fetch repairs:', err);
//     }
//   };

//   // Delete repair by ID
//   const handleDelete = async (id: string) => {
//     try {
//       setIsLoading(true);
//       await axios.delete(`https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${id}`);
//       setRepairs(repairs.filter(r => r._id !== id));
//     } catch (err) {
//       console.error('Failed to delete repair:', err);
//     } finally {
//       setIsLoading(false);
//       setConfirmDeleteId(null);
//     }
//   };

//   // Open edit modal
//   const handleEdit = (repair: Repair) => {
//     setCurrentRepair(repair);
//     setIsEditModalOpen(true);
//   };

//   // Open add modal
//   const handleAddNew = () => {
//     setCurrentRepair({
//       _id: '',
//       brand: '',
//       model: '',
//       repairOptions: [],
//       createdAt: '',
//       updatedAt: ''
//     });
//     setIsAddModalOpen(true);
//   };

//   // Open option edit modal
//   const handleEditOption = (repair: Repair, option: RepairOption, isNew = false) => {
//     setCurrentRepair(repair);
//     setCurrentOption(option);
//     setIsNewOption(isNew);
//     setIsOptionModalOpen(true);
//   };

//   // Close all modals
//   const closeModals = () => {
//     setIsEditModalOpen(false);
//     setIsAddModalOpen(false);
//     setIsOptionModalOpen(false);
//     setCurrentRepair(null);
//     setCurrentOption(null);
//   };

//   // Handle service template selection
//   const handleServiceTemplateChange = (templateName: string) => {
//     const template = serviceTemplates.find(t => t.name === templateName);
//     if (template && currentOption) {
//       setCurrentOption({
//         ...currentOption,
//         name: template.name,
//         estimatedCost: template.cost,
//         description: template.description
//       });
//     }
//   };

//   // Save repair
//   const handleSaveRepair = async (updatedRepair: Repair) => {
//     try {
//       setIsLoading(true);
//       if (updatedRepair._id) {
//         // Update existing repair
//         await axios.put(
//           `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${updatedRepair._id}`,
//           updatedRepair
//         );
//       } else {
//         // Add new repair
//         await axios.post(
//           `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs`,
//           { ...updatedRepair, category: type }
//         );
//       }
//       closeModals();
//       fetchRepairs();
//     } catch (err) {
//       console.error('Failed to save repair:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Save repair option
//   const handleSaveOption = async () => {
//     if (!currentOption || !currentRepair) return;
    
//     try {
//       setIsLoading(true);
//       const endpoint = getEndpoint();
      
//       if (isNewOption) {
//         await axios.post(
//           `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${endpoint}/${currentRepair._id}/options`,
//           currentOption
//         );
//       } else if (currentOption._id) {
//         await axios.put(
//           `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${endpoint}/${currentRepair._id}/options/${currentOption._id}`,
//           currentOption
//         );
//       }
      
//       closeModals();
//       fetchRepairs();
//     } catch (err) {
//       console.error('Failed to save repair option:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Delete repair option
//   const handleDeleteOption = async (repairId: string, optionId: string) => {
//     try {
//       setIsLoading(true);
//       await axios.delete(
//         `https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/repairs/${getEndpoint()}/${repairId}/options/${optionId}`
//       );
//       fetchRepairs();
//     } catch (err) {
//       console.error('Failed to delete repair option:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRepairs();
//   }, [type]);

//   // Filter by search term
//   const filteredRepairs = repairs.filter(repair =>
//     repair.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     repair.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     repair._id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="card">
//         <div className="card-header">
//           <h2>Repair Services Management</h2>
//           <div className="controls">
//             <div className="search-box">
//               <Search className="search-icon" />
//               <input 
//                 type="text" 
//                 placeholder="Search repairs..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="type-selector">
//               <select 
//                 value={type} 
//                 onChange={(e) => setType(e.target.value as any)}
//               >
//                 <option value="mobile">Mobiles</option>
//                 <option value="laptop">Laptops</option>
//                 <option value="tablet">Tablets</option>
//                 <option value="console">Consoles</option>
//               </select>
//               <ChevronDown className="select-arrow" />
//             </div>
//             <button className="btn-primary" onClick={handleAddNew}>
//               <Plus size={16} /> Add New
//             </button>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && repairs.length === 0 ? (
//           <div className="loading-state">
//             <div className="spinner"></div>
//             <p>Loading repairs...</p>
//           </div>
//         ) : filteredRepairs.length === 0 ? (
//           <div className="empty-state">
//             <p>No repairs found</p>
//           </div>
//         ) : (
//           <div className="repair-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Brand</th>
//                   <th>Model</th>
//                   <th>Repair Options</th>
//                   <th>Last Updated</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRepairs.map(repair => (
//                   <tr key={repair._id}>
//                     <td>{repair.brand}</td>
//                     <td className="model-cell">{repair.model}</td>
//                     <td>
//                       <div className="options-list">
//                         {repair.repairOptions.map(option => (
//                           <div key={option._id} className="option-item">
//                             <div className="option-header">
//                               <span className="option-name">{option.name}</span>
//                               <span className="option-cost">€{option.estimatedCost}</span>
//                             </div>
//                             <div className="option-actions">
//                               <button 
//                                 className="btn-icon small" 
//                                 onClick={() => handleEditOption(repair, option)}
//                                 title="Edit option"
//                               >
//                                 <Edit size={14} />
//                               </button>
//                               <button 
//                                 className="btn-icon small danger" 
//                                 onClick={() => option._id && handleDeleteOption(repair._id, option._id)}
//                                 title="Delete option"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                         <button 
//                           className="btn-text small"
//                           onClick={() => handleEditOption(repair, {
//                             name: '',
//                             estimatedCost: 0,
//                             description: ''
//                           }, true)}
//                         >
//                           <Plus size={14} /> Add Option
//                         </button>
//                       </div>
//                     </td>
//                     <td>{formatDate(repair.updatedAt)}</td>
//                     <td>
//                       <div className="action-buttons">
//                         <button 
//                           className="btn-icon" 
//                           title="Edit"
//                           onClick={() => handleEdit(repair)}
//                         >
//                           <Edit size={18} />
//                         </button>
//                         {confirmDeleteId === repair._id ? (
//                           <>
//                             <button 
//                               className="btn-icon danger" 
//                               onClick={() => handleDelete(repair._id)}
//                               title="Confirm Delete"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                             <button 
//                               className="btn-icon" 
//                               onClick={() => setConfirmDeleteId(null)}
//                               title="Cancel"
//                             >
//                               <X size={18} />
//                             </button>
//                           </>
//                         ) : (
//                           <button 
//                             className="btn-icon" 
//                             onClick={() => setConfirmDeleteId(repair._id)}
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Repair Edit Modal */}
//       {isEditModalOpen && currentRepair && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>{currentRepair._id ? 'Edit Repair' : 'Add New Repair'}</h3>
//             <RepairForm 
//               repair={currentRepair} 
//               onSave={handleSaveRepair} 
//               onCancel={closeModals} 
//               type={type}
//               brands={brands}
//             />
//           </div>
//         </div>
//       )}

//       {/* Repair Option Edit Modal */}
//       {isOptionModalOpen && currentOption && currentRepair && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>{isNewOption ? 'Add New Repair Option' : 'Edit Repair Option'}</h3>
//             <RepairOptionForm 
//               option={currentOption} 
//               type={type}
//               onSave={handleSaveOption} 
//               onCancel={closeModals}
//               serviceTemplates={serviceTemplates}
//               onTemplateChange={handleServiceTemplateChange}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Repair Form Component
// const RepairForm: React.FC<{
//   repair: Repair;
//   onSave: (repair: Repair) => void;
//   onCancel: () => void;
//   type: string;
//   brands: string[];
// }> = ({ repair, onSave, onCancel, type, brands }) => {
//   const [formData, setFormData] = useState<Repair>(repair);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Brand</label>
//         <select
//           value={formData.brand}
//           onChange={(e) => setFormData({...formData, brand: e.target.value})}
//           required
//         >
//           <option value="">Select brand</option>
//           {brands.map(brand => (
//             <option key={brand} value={brand}>{brand}</option>
//           ))}
//         </select>
//       </div>
//       <div className="form-group">
//         <label>Model</label>
//         <input 
//           type="text" 
//           value={formData.model}
//           onChange={(e) => setFormData({...formData, model: e.target.value})}
//           required
//         />
//       </div>
//       <div className="form-actions">
//         <button type="button" className="btn-secondary" onClick={onCancel}>
//           Cancel
//         </button>
//         <button type="submit" className="btn-primary">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// // Repair Option Form Component
// const RepairOptionForm: React.FC<{
//   option: RepairOption;
//   type: string;
//   onSave: () => void;
//   onCancel: () => void;
//   serviceTemplates: ServiceTemplate[];
//   onTemplateChange: (templateName: string) => void;
// }> = ({ option, type, onSave, onCancel, serviceTemplates, onTemplateChange }) => {
//   const [formData, setFormData] = useState<RepairOption>(option);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Service</label>
//         <select
//           value={formData.name}
//           onChange={(e) => {
//             setFormData({...formData, name: e.target.value});
//             onTemplateChange(e.target.value);
//           }}
//           required
//         >
//           <option value="">Select service</option>
//           {serviceTemplates.map(template => (
//             <option key={template.name} value={template.name}>{template.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="form-group">
//         <label>Estimated Cost (€)</label>
//         <input 
//           type="number" 
//           value={formData.estimatedCost || ''}
//           onChange={(e) => setFormData({
//             ...formData,
//             estimatedCost: e.target.value ? Number(e.target.value) : null
//           })}
//           min="0"
//           step="0.01"
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label>Description</label>
//         <textarea 
//           value={formData.description}
//           onChange={(e) => setFormData({
//             ...formData,
//             description: e.target.value
//           })}
//           rows={3}
//         />
//       </div>
      
//       {/* Type-specific fields */}
//       {type === 'mobile' || type === 'tablet' ? (
//         <div className="form-group">
//           <label>Screen Type</label>
//           <select
//             value={formData.screenType || ''}
//             onChange={(e) => setFormData({...formData, screenType: e.target.value})}
//           >
//             <option value="">Select screen type</option>
//             <option value="OLED">OLED</option>
//             <option value="AMOLED">AMOLED</option>
//             <option value="LCD">LCD</option>
//           </select>
//         </div>
//       ) : type === 'laptop' ? (
//         <div className="form-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.includesKeyboard || false}
//               onChange={(e) => setFormData({...formData, includesKeyboard: e.target.checked})}
//             />
//             Includes Keyboard Replacement
//           </label>
//         </div>
//       ) : type === 'tablet' ? (
//         <div className="form-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.includesStylus || false}
//               onChange={(e) => setFormData({...formData, includesStylus: e.target.checked})}
//             />
//             Includes Stylus Replacement
//           </label>
//         </div>
//       ) : type === 'console' ? (
//         <div className="form-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.includesControllers || false}
//               onChange={(e) => setFormData({...formData, includesControllers: e.target.checked})}
//             />
//             Includes Controllers
//           </label>
//         </div>
//       ) : null}

//       <div className="form-actions">
//         <button type="button" className="btn-secondary" onClick={onCancel}>
//           Cancel
//         </button>
//         <button type="submit" className="btn-primary">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default RepairList;
