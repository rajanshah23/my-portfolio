import { Menu, X } from 'lucide-react';

type MobileNavProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  activeSection: string;
};

const MobileNav = ({ isOpen, toggleMenu, activeSection }: MobileNavProps) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-bold text-gray-800">Portfolio</span>
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

     
<div
  className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
  <div className="pt-16 flex flex-col h-full border-r border-gray-200">
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={toggleMenu}
          className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
            activeSection === item.id
              ? "text-blue-600 bg-blue-50 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {item.label}
        </a>
      ))}
    </div>
  </div>
</div>

    </>
  );
};

export default MobileNav;