import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <div className="sidebar-section">
        <h3>Products</h3>
        <button
          className={activeTab === 'productForm' ? 'active' : ''}
          onClick={() => setActiveTab('productForm')}
        >
          Add Products
        </button>
        <button
          className={activeTab === 'productList' ? 'active' : ''}
          onClick={() => setActiveTab('productList')}
        >
          View Products
        </button>
      </div>

      <div className="sidebar-section">
        <h3>Repair Services</h3>
        <button
          className={activeTab === 'repairForm' ? 'active' : ''}
          onClick={() => setActiveTab('repairForm')}
        >
          Add Repair Service
        </button>
        <button
          className={activeTab === 'repairList' ? 'active' : ''}
          onClick={() => setActiveTab('repairList')}
        >
          View Repair Services
        </button>
      </div>

      <div className="sidebar-section">
        <h3>Appointments</h3>
        <button
          className={activeTab === 'appointments' ? 'active' : ''}
          onClick={() => setActiveTab('appointments')}
        >
          View Appointments
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
