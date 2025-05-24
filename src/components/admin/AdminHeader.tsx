
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminHeaderProps {
  onSignOut: () => void;
}

export const AdminHeader = ({ onSignOut }: AdminHeaderProps) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold hidden sm:block text-gray-900 dark:text-white">Admin Dashboard</h1>
        <h1 className="text-lg font-bold sm:hidden text-gray-900 dark:text-white">Admin</h1>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium truncate max-w-32 lg:max-w-none text-gray-900 dark:text-white">{user?.email}</span>
          </div>
          
          <Button variant="outline" size="sm" onClick={onSignOut}>
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
