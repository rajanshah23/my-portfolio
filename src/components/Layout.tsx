import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

type LayoutProps = {
  children: React.ReactNode;
  activeSection: string;
};

const Layout = ({ children, activeSection }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block w-64 fixed top-0 left-0 h-screen">
        <Sidebar activeSection={activeSection} />
      </div>
      
      {/* Mobile navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        toggleMenu={toggleMobileMenu}
        activeSection={activeSection}
      />
      
      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;