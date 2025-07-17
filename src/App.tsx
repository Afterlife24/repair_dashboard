// import React, { useState } from 'react';
// import ProductForm from './components/ProductForm';
// import ProductList from './components/ProductList';
// import Sidebar from './components/Sidebar';
// import './styles.css';

// const App: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('form');

//   return (
//     <div className="dashboard">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//       <main className="main-content">
//         <h1>Product Dashboard</h1>
//         {activeTab === 'form' ? <ProductForm /> : <ProductList />}
//       </main>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import RepairForm from './components/RepairForm';
import RepairList from './components/RepairList'; // You'll need to create this
import Sidebar from './components/Sidebar';
import AppointmentList from './components/AppointmentList';

import './styles.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('productForm');

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <h1>Repair Shop Dashboard</h1>
        {activeTab === 'productForm' && <ProductForm />}
        {activeTab === 'productList' && <ProductList />}
        {activeTab === 'repairForm' && <RepairForm />}
        {activeTab === 'repairList' && <RepairList />}
        {activeTab === 'appointments' && <AppointmentList />}

      </main>
    </div>
  );
};

export default App;