import { Home, User, Code, Folder, FileText, Book, Mail } from "lucide-react";

type SidebarProps = {
  activeSection: string;
};

const Sidebar = ({ activeSection }: SidebarProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "projects", label: "Projects", icon: <Folder size={18} /> },
    {
      id: "certifications",
      label: "Certifications",
      icon: <FileText size={18} />,
    },
    { id: "education", label: "Education", icon: <Book size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <span className="text-2xl font-bold text-gray-800">Portfolio</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === item.id
                  ? "text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon && <span className="mr-3">{item.icon}</span>}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer (Profile Info) */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="/src/images/rajan-gupta.jpg"
            alt="Rajan Kumar Gupta"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Rajan Kumar Gupta
            </p>
            <p className="text-xs text-gray-500">shahrajan774@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
