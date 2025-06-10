
import React from 'react';
import { Calendar, CheckSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'calendar' | 'todos' | 'notes';
  onTabChange: (tab: 'calendar' | 'todos' | 'notes') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-foreground">My Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">Stay organized, stay calm</p>
        </div>
      </header>

      <nav className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === 'calendar' ? 'default' : 'ghost'}
              className="flex-1 rounded-none border-0 py-4"
              onClick={() => onTabChange('calendar')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Calendar
            </Button>
            <Button
              variant={activeTab === 'todos' ? 'default' : 'ghost'}
              className="flex-1 rounded-none border-0 py-4"
              onClick={() => onTabChange('todos')}
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              Todos
            </Button>
            <Button
              variant={activeTab === 'notes' ? 'default' : 'ghost'}
              className="flex-1 rounded-none border-0 py-4"
              onClick={() => onTabChange('notes')}
            >
              <FileText className="w-5 h-5 mr-2" />
              Notes
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
