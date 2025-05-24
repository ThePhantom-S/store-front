
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ResponsiveAdminSidebar } from '@/components/admin/ResponsiveAdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductManagement } from '@/components/admin/ProductManagement';
import { OrderManagement } from '@/components/admin/OrderManagement';
import { MessageManagement } from '@/components/admin/MessageManagement';

type TabType = 'products' | 'orders' | 'messages';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <ResponsiveAdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader onSignOut={handleSignOut} />
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="max-w-full">
              {activeTab === 'products' && <ProductManagement />}
              {activeTab === 'orders' && <OrderManagement />}
              {activeTab === 'messages' && <MessageManagement />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
