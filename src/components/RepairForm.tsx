// import React, { useState } from 'react';
// import axios from 'axios';
// import { Plus, Trash2 } from 'lucide-react';
// import './css/RepairForm.css';

// interface RepairOption {
//   name: string;
//   estimatedCost: number | string;
//   description: string;
//   // Add category-specific optional fields
//   screenType?: string;
//   includesKeyboard?: boolean;
//   includesStylus?: boolean;
//   includesControllers?: boolean;
// }

// interface FormData {
//   category: 'mobile' | 'laptop' | 'tablet' | 'console';
//   brand: string;
//   model: string;
//   repairOptions: RepairOption[];
// }

// const RepairForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     category: 'mobile',
//     brand: '',
//     model: '',
//     repairOptions: []
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleRepairOptionChange = (index: number, field: keyof RepairOption, value: string | boolean) => {
//     const updatedOptions = [...formData.repairOptions];
//     updatedOptions[index] = {
//       ...updatedOptions[index],
//       [field]: field === 'estimatedCost' ? parseFloat(value as string) || 0 : value
//     };
//     setFormData({
//       ...formData,
//       repairOptions: updatedOptions
//     });
//   };

//   const addRepairOption = () => {
//     const baseOption = { name: '', estimatedCost: 0, description: '' };
    
//     // Add category-specific fields
//     const categorySpecificFields = {
//       mobile: { screenType: 'AMOLED' },
//       laptop: { includesKeyboard: false },
//       tablet: { includesStylus: false },
//       console: { includesControllers: false }
//     };
    
//     setFormData({
//       ...formData,
//       repairOptions: [
//         ...formData.repairOptions,
//         { ...baseOption, ...categorySpecificFields[formData.category] }
//       ]
//     });
//   };

//   const removeRepairOption = (index: number) => {
//     const updatedOptions = [...formData.repairOptions];
//     updatedOptions.splice(index, 1);
//     setFormData({
//       ...formData,
//       repairOptions: updatedOptions
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitMessage('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/repairs', formData);
//       console.log('Response:', response.data);
//       setSubmitMessage('Repair service added successfully!');
      
//       // Reset form after successful submission
//       setFormData({
//         category: 'mobile',
//         brand: '',
//         model: '',
//         repairOptions: []
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       setSubmitMessage('Failed to add repair service. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderCategorySpecificFields = (index: number) => {
//     switch(formData.category) {
//       case 'mobile':
//         return (
//           <div className="repair-option-field">
//             <label>Screen Type*</label>
//             <select
//               value={formData.repairOptions[index]?.screenType || 'AMOLED'}
//               onChange={(e) => handleRepairOptionChange(index, 'screenType', e.target.value)}
//               required
//             >
//               <option value="OLED">OLED</option>
//               <option value="AMOLED">AMOLED</option>
//               <option value="LCD">LCD</option>
//             </select>
//           </div>
//         );
//       case 'laptop':
//         return (
//           <div className="repair-option-field checkbox-field">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={formData.repairOptions[index]?.includesKeyboard || false}
//                 onChange={(e) => handleRepairOptionChange(index, 'includesKeyboard', e.target.checked)}
//               />
//               Includes Keyboard Repair
//             </label>
//           </div>
//         );
//       case 'tablet':
//         return (
//           <div className="repair-option-field checkbox-field">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={formData.repairOptions[index]?.includesStylus || false}
//                 onChange={(e) => handleRepairOptionChange(index, 'includesStylus', e.target.checked)}
//               />
//               Includes Stylus Repair
//             </label>
//           </div>
//         );
//       case 'console':
//         return (
//           <div className="repair-option-field checkbox-field">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={formData.repairOptions[index]?.includesControllers || false}
//                 onChange={(e) => handleRepairOptionChange(index, 'includesControllers', e.target.checked)}
//               />
//               Includes Controllers Repair
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="repair-form-container">
//       <h2 className="repair-form-title">Add New Repair Service</h2>
      
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="form-group">
//             <label>Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="mobile">Mobile</option>
//               <option value="laptop">Laptop</option>
//               <option value="tablet">Tablet</option>
//               <option value="console">Console</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Brand</label>
//             <input
//               type="text"
//               name="brand"
//               value={formData.brand}
//               onChange={handleChange}
//               placeholder="e.g. Samsung, Apple, Nintendo"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Model</label>
//             <input
//               type="text"
//               name="model"
//               value={formData.model}
//               onChange={handleChange}
//               placeholder={
//                 formData.category === 'mobile' ? 'e.g. Galaxy S25, iPhone 15' :
//                 formData.category === 'laptop' ? 'e.g. MacBook Pro, XPS 15' :
//                 formData.category === 'tablet' ? 'e.g. iPad Pro, Galaxy Tab' :
//                 'e.g. PlayStation 5, Xbox Series X'
//               }
//               required
//             />
//           </div>
//         </div>

//         <div className="repair-options-section">
//           <div className="repair-options-header">
//             <h3 className="repair-options-title">Repair Options</h3>
//             <button
//               type="button"
//               onClick={addRepairOption}
//               className="add-option-btn"
//             >
//               <Plus size={16} /> Add Option
//             </button>
//           </div>

//           {formData.repairOptions.length === 0 ? (
//             <div className="empty-options-message">
//               No repair options added yet
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {formData.repairOptions.map((option, index) => (
//                 <div key={index} className="repair-option-card">
//                   <button
//                     type="button"
//                     onClick={() => removeRepairOption(index)}
//                     className="remove-option-btn"
//                     aria-label="Remove option"
//                   >
//                     <Trash2 size={20} />
//                   </button>

//                   <div className="repair-option-fields">
//                     <div className="repair-option-field">
//                       <label>Service Name*</label>
//                       <input
//                         type="text"
//                         value={option.name}
//                         onChange={(e) => handleRepairOptionChange(index, 'name', e.target.value)}
//                         placeholder="Screen Replacement"
//                         required
//                       />
//                     </div>

//                     <div className="repair-option-field">
//                       <label>Estimated Cost ($)*</label>
//                       <input
//                         type="number"
//                         value={option.estimatedCost}
//                         onChange={(e) => handleRepairOptionChange(index, 'estimatedCost', e.target.value)}
//                         placeholder="129.99"
//                         min="0"
//                         step="0.01"
//                         required
//                       />
//                     </div>

//                     {renderCategorySpecificFields(index)}

//                     <div className="repair-option-field md:col-span-3">
//                       <label>Description*</label>
//                       <textarea
//                         value={option.description}
//                         onChange={(e) => handleRepairOptionChange(index, 'description', e.target.value)}
//                         placeholder="Detailed description of the service"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting || formData.repairOptions.length === 0}
//           className="submit-repair-btn"
//         >
//           {isSubmitting ? (
//             <>
//               <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" fill="currentColor" opacity="0.25"/>
//                 <path d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19.0586C5.33682 19.1344 5.82034 19.083 6.27422 18.9064C6.72809 18.7298 7.13612 18.4331 7.46062 18.0419C7.78512 17.6507 8.0155 17.1778 8.13045 16.6664C8.2454 16.155 8.24131 15.6219 8.1185 15.1127C8.1185 15.1127 8.00698 14.6656 8.1185 15.1127C8.23002 15.5598 8.1185 15.1127 8.1185 15.1127" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//               Submitting...
//             </>
//           ) : (
//             'Submit Repair Service'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RepairForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import './css/RepairForm.css';

interface ServiceOption {
  name: string;
  estimatedCost: string;
  description: string;
}

interface Brand {
  id: string;
  name: string;
}

interface RepairOption {
  name: string;
  estimatedCost: number | string;
  description: string;
  // Add category-specific optional fields
  screenType?: string;
  includesKeyboard?: boolean;
  includesStylus?: boolean;
  includesControllers?: boolean;
}

interface FormData {
  category: 'mobile' | 'laptop' | 'tablet' | 'console';
  brand: string;
  model: string;
  repairOptions: RepairOption[];
}

const serviceOptions: ServiceOption[] = [
  { name: 'Vitre + écran LCD compatible', estimatedCost: '159', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Vitre + écran OLED similaire à l\'original', estimatedCost: '259', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Batterie', estimatedCost: '149', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Connecteur de charge', estimatedCost: '159', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Micro', estimatedCost: '159', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Caméra avant', estimatedCost: '89', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Caméra arrière', estimatedCost: '159', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Vitre camera arrière', estimatedCost: '59', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Vitre arrière', estimatedCost: '169', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Bouton power', estimatedCost: '149', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Bouton volume', estimatedCost: '149', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Vibreur', estimatedCost: '79', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Ecouteur Interne', estimatedCost: '79', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Haut parleur', estimatedCost: '79', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Nappe NFC', estimatedCost: '149', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Lecteur sim', estimatedCost: '20', description: 'réparation en 1 heure en atelier. Garantie 3 mois.' },
  { name: 'Tiroir sim', estimatedCost: '10', description: 'Sur commande en 24h-48h.' },
  { name: 'Desoxydation', estimatedCost: '49', description: 'résultat en 24h-48h selon les dégâts.' },
  { name: 'Transfert de donnees', estimatedCost: '20', description: '' },
  { name: 'Recuperation de donnees', estimatedCost: '30', description: 'Forfait démontage de 20€ supplémentaires si l\'appareil est endommagé ou non fonctionnel.' },
  { name: 'Recherche de panne', estimatedCost: '0', description: 'Résultat sous 24h. Déductible des éventuelles réparations.' }
];

const RepairForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: 'mobile',
    brand: '',
    model: '',
    repairOptions: []
  });
  
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Fetch brands when component mounts or category changes
    const fetchBrands = async () => {
      setIsLoadingBrands(true);
      try {
        // In a real app, you would fetch brands from your API
        // const response = await axios.get(`http://localhost:5000/api/brands?category=${formData.category}`);
        // setBrands(response.data);
        
        // Mock data for demonstration
        const mockBrands = {
          mobile : ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Honor', 'Google', 'Oppo', 'OnePlus', 'Realme', 'CrossCall', 'Motorola', 'Blackview', 'Nokia', 'Sony', 'Vivo', 'LG', 'Asus', 'TCL', 'WIKO'],
          laptop : ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Samsung', 'Microsoft', 'MSI', 'Razer', 'LG', 'Huawei', 'Toshiba', 'Sony', 'Google', 'Fujitsu', 'Chuwi', 'Gateway', 'Xiaomi'],
          tablet : ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Huawei', 'Amazon', 'Xiaomi', 'Realme', 'Honor', 'Asus', 'Acer', 'Alcatel', 'TCL', 'Sony', 'Google', 'Nokia', 'LG', 'Teclast', 'Chuwi'],
          console : ['Sony', 'PlayStation 5', 'PlayStation 4', 'Xbox', 'Xbox Series X', 'Xbox Series S', 'Xbox One', 'Nintendo', 'Nintendo Switch', 'Nintendo Switch Lite', 'Steam Deck', 'Asus ROG Ally', 'Valve']

        };
        
        const formattedBrands = mockBrands[formData.category].map((brand, index) => ({
          id: `${formData.category}-${index}`,
          name: brand
        }));
        
        setBrands(formattedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setIsLoadingBrands(false);
      }
    };
    
    fetchBrands();
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleServiceChange = (index: number, serviceName: string) => {
    const selectedService = serviceOptions.find(service => service.name === serviceName);
    if (!selectedService) return;

    const updatedOptions = [...formData.repairOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      name: selectedService.name,
      estimatedCost: selectedService.estimatedCost,
      description: selectedService.description
    };
    
    setFormData({
      ...formData,
      repairOptions: updatedOptions
    });
  };

  const handleRepairOptionChange = (index: number, field: keyof RepairOption, value: string | boolean) => {
    const updatedOptions = [...formData.repairOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: field === 'estimatedCost' ? parseFloat(value as string) || 0 : value
    };
    setFormData({
      ...formData,
      repairOptions: updatedOptions
    });
  };

  const addRepairOption = () => {
    const baseOption = { name: '', estimatedCost: 0, description: '' };
    
    // Add category-specific fields
    const categorySpecificFields = {
      mobile: { screenType: 'AMOLED' },
      laptop: { includesKeyboard: false },
      tablet: { includesStylus: false },
      console: { includesControllers: false }
    };
    
    setFormData({
      ...formData,
      repairOptions: [
        ...formData.repairOptions,
        { ...baseOption, ...categorySpecificFields[formData.category] }
      ]
    });
  };

  const removeRepairOption = (index: number) => {
    const updatedOptions = [...formData.repairOptions];
    updatedOptions.splice(index, 1);
    setFormData({
      ...formData,
      repairOptions: updatedOptions
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/repairs', formData);
      console.log('Response:', response.data);
      setSubmitMessage('Repair service added successfully!');
      
      // Reset form after successful submission
      setFormData({
        category: 'mobile',
        brand: '',
        model: '',
        repairOptions: []
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Failed to add repair service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCategorySpecificFields = (index: number) => {
    switch(formData.category) {
      case 'mobile':
        return (
          <div className="repair-option-field">
            <label>Screen Type*</label>
            <select
              value={formData.repairOptions[index]?.screenType || 'AMOLED'}
              onChange={(e) => handleRepairOptionChange(index, 'screenType', e.target.value)}
              required
            >
              <option value="OLED">OLED</option>
              <option value="AMOLED">AMOLED</option>
              <option value="LCD">LCD</option>
            </select>
          </div>
        );
      case 'laptop':
        return (
          <div className="repair-option-field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={formData.repairOptions[index]?.includesKeyboard || false}
                onChange={(e) => handleRepairOptionChange(index, 'includesKeyboard', e.target.checked)}
              />
              Includes Keyboard Repair
            </label>
          </div>
        );
      case 'tablet':
        return (
          <div className="repair-option-field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={formData.repairOptions[index]?.includesStylus || false}
                onChange={(e) => handleRepairOptionChange(index, 'includesStylus', e.target.checked)}
              />
              Includes Stylus Repair
            </label>
          </div>
        );
      case 'console':
        return (
          <div className="repair-option-field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={formData.repairOptions[index]?.includesControllers || false}
                onChange={(e) => handleRepairOptionChange(index, 'includesControllers', e.target.checked)}
              />
              Includes Controllers Repair
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="repair-form-container">
      <h2 className="repair-form-title">Add New Repair Service</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="tablet">Tablet</option>
              <option value="console">Console</option>
            </select>
          </div>

          <div className="form-group">
            <label>Brand*</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              disabled={isLoadingBrands}
            >
              <option value="">Select a brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.name}>{brand.name}</option>
              ))}
            </select>
            {isLoadingBrands && <div className="loading-text">Loading brands...</div>}
          </div>

          <div className="form-group">
            <label>Model*</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder={
                formData.category === 'mobile' ? 'e.g. Galaxy S25, iPhone 15' :
                formData.category === 'laptop' ? 'e.g. MacBook Pro, XPS 15' :
                formData.category === 'tablet' ? 'e.g. iPad Pro, Galaxy Tab' :
                'e.g. PlayStation 5, Xbox Series X'
              }
              required
            />
          </div>
        </div>

        <div className="repair-options-section">
          <div className="repair-options-header">
            <h3 className="repair-options-title">Repair Options</h3>
            <button
              type="button"
              onClick={addRepairOption}
              className="add-option-btn"
            >
              <Plus size={16} /> Add Option
            </button>
          </div>

          {formData.repairOptions.length === 0 ? (
            <div className="empty-options-message">
              No repair options added yet
            </div>
          ) : (
            <div className="space-y-4">
              {formData.repairOptions.map((option, index) => (
                <div key={index} className="repair-option-card">
                  <button
                    type="button"
                    onClick={() => removeRepairOption(index)}
                    className="remove-option-btn"
                    aria-label="Remove option"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="repair-option-fields">
                    <div className="repair-option-field">
                      <label>Service Name*</label>
                      <select
                        value={option.name}
                        onChange={(e) => handleServiceChange(index, e.target.value)}
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service, i) => (
                          <option key={i} value={service.name}>{service.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="repair-option-field">
                      <label>Estimated Cost*</label>
                      <input
                        type="text"
                        value={option.estimatedCost}
                        onChange={(e) => handleRepairOptionChange(index, 'estimatedCost', e.target.value)}
                        placeholder="e.g. 159.00€ TTC"
                        required
                      />
                    </div>

                    {renderCategorySpecificFields(index)}

                    <div className="repair-option-field md:col-span-3">
                      <label>Description*</label>
                      <textarea
                        value={option.description}
                        onChange={(e) => handleRepairOptionChange(index, 'description', e.target.value)}
                        placeholder="Service description will auto-populate"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formData.repairOptions.length === 0}
          className="submit-repair-btn"
        >
          {isSubmitting ? (
            <>
              <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" fill="currentColor" opacity="0.25"/>
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19.0586C5.33682 19.1344 5.82034 19.083 6.27422 18.9064C6.72809 18.7298 7.13612 18.4331 7.46062 18.0419C7.78512 17.6507 8.0155 17.1778 8.13045 16.6664C8.2454 16.155 8.24131 15.6219 8.1185 15.1127C8.1185 15.1127 8.00698 14.6656 8.1185 15.1127C8.23002 15.5598 8.1185 15.1127 8.1185 15.1127" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Repair Service'
          )}
        </button>
      </form>
    </div>
  );
};

export default RepairForm;