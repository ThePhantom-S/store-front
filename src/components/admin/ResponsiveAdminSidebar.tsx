
import { Dispatch, SetStateAction, useState } from 'react';
import { ShoppingBag, Package, MessageSquare, Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type TabType = 'products' | 'orders' | 'messages';

interface ResponsiveAdminSidebarProps {
  activeTab: TabType;
  setActiveTab: Dispatch<SetStateAction<TabType>>;
}

export const ResponsiveAdminSidebar = ({ activeTab, setActiveTab }: ResponsiveAdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
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
            onClick={() => {
              setActiveTab('products');
              setIsOpen(false);
            }}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </Button>
          
          <Button
            variant={activeTab === 'orders' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab('orders');
              setIsOpen(false);
            }}
          >
            <Package className="mr-2 h-4 w-4" />
            Orders
          </Button>
          
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab('messages');
              setIsOpen(false);
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <Link to="/">
          <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
            <Home className="mr-2 h-4 w-4" />
            Visit Store
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
