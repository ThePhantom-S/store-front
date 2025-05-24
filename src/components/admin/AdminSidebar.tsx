
import { Dispatch, SetStateAction } from 'react';
import { ShoppingBag, Package, MessageSquare, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type TabType = 'products' | 'orders' | 'messages';

interface AdminSidebarProps {
  activeTab: TabType;
  setActiveTab: Dispatch<SetStateAction<TabType>>;
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
          <span className="text-xl font-bold">EliteShop</span>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          <Button
            variant={activeTab === 'products' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('products')}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </Button>
          
          <Button
            variant={activeTab === 'orders' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('orders')}
          >
            <Package className="mr-2 h-4 w-4" />
            Orders
          </Button>
          
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <Link to="/">
          <Button variant="outline" className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Visit Store
          </Button>
        </Link>
      </div>
    </div>
  );
};
