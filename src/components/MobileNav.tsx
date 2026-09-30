import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

type MobileNavProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  activeSection: string;
};

const MobileNav = ({ isOpen, toggleMenu, activeSection }: MobileNavProps) => {
  const primaryItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'case-studies', label: 'DevOps Case Studies' },
    { id: 'contact', label: 'Contact' },
  ];
  const moreItems = [
    { id: 'timeline', label: 'DevOps Timeline' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'github', label: 'GitHub Projects' },
  ];
  const socialLinks = [
    { href: 'https://github.com/rajanshah23', icon: FaGithub, label: 'GitHub', color: 'text-gray-800 hover:text-black' },
    { href: 'https://www.linkedin.com/in/rajan-kumar-gupta-16696532b', icon: FaLinkedin, label: 'LinkedIn', color: 'text-blue-700 hover:text-blue-800' },
    { href: 'https://x.com/Rajansh26003523', icon: FaTwitter, label: 'Twitter', color: 'text-sky-500 hover:text-sky-600' },
    { href: 'https://www.facebook.com/rajana.gupta.805984', icon: FaFacebook, label: 'Facebook', color: 'text-blue-600 hover:text-blue-700' },
  ];

  const moreIsActive = moreItems.some((item) => item.id === activeSection);
  const [isMoreOpen, setIsMoreOpen] = useState(moreIsActive);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moreIsActive) setIsMoreOpen(true);
  }, [moreIsActive]);

  const renderNavItem = (item: { id: string; label: string }) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={toggleMenu}
      tabIndex={isOpen ? 0 : -1}
      className={`block rounded-lg px-4 py-3 transition-all duration-300 ${
        activeSection === item.id
          ? "bg-blue-50 font-medium text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {item.label}
    </a>
  );

  useEffect(() => {
    if (!isOpen) return;

    const menuButton = menuButtonRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const firstFocusableElement = navigationRef.current?.querySelector<HTMLElement>('a, button');
    firstFocusableElement?.focus();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleMenu();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      menuButton?.focus();
    };
  }, [isOpen, toggleMenu]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <span className="text-2xl font-bold bg-blue-700 bg-clip-text text-transparent">
            Rajan
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-center space-x-5">
            {socialLinks.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-transform duration-200 hover:scale-110 ${color}`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

<div
  ref={navigationRef}
  id="mobile-navigation"
  aria-hidden={!isOpen}
  aria-label="Mobile navigation"
  role="dialog"
  aria-modal="true"
  className={`lg:hidden fixed bottom-0 left-0 top-[118px] w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"}`}
>
  <div className="flex flex-col h-full border-r border-gray-200">
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      {primaryItems.map(renderNavItem)}
      <button
        type="button"
        aria-expanded={isMoreOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsMoreOpen((isOpen) => !isOpen)}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        More sections
        <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {isMoreOpen && <div className="space-y-2 border-l border-gray-200 pl-2">{moreItems.map(renderNavItem)}</div>}
    </div>
  </div>
</div>

    </>
  );
};

export default MobileNav;