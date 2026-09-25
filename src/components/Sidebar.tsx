import { useEffect, useState } from "react";
import { ChevronDown, Home, User, Code, Folder, FileText, Book, Mail, GitBranch, Workflow, Milestone, BookOpen, Github } from "lucide-react";

type SidebarProps = {
  activeSection: string;
};

const Sidebar = ({ activeSection }: SidebarProps) => {
  const primaryItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "projects", label: "Projects", icon: <Folder size={18} /> },
    { id: "case-studies", label: "DevOps Case Studies", icon: <Workflow size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];
  const moreItems = [
    { id: "timeline", label: "DevOps Timeline", icon: <Milestone size={18} /> },
    {
      id: "certifications",
      label: "Certifications",
      icon: <FileText size={18} />,
    },
    { id: "education", label: "Education", icon: <Book size={18} /> },
    { id: "blog", label: "Technical Blog", icon: <BookOpen size={18} /> },
    { id: "github", label: "GitHub Projects", icon: <Github size={18} /> },
  ];
  const moreIsActive = moreItems.some((item) => item.id === activeSection);
  const [isMoreOpen, setIsMoreOpen] = useState(moreIsActive);

  useEffect(() => {
    if (moreIsActive) setIsMoreOpen(true);
  }, [moreIsActive]);

  const renderNavItem = (item: (typeof primaryItems)[number]) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={`flex items-center rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        activeSection === item.id
          ? "border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span className="mr-3">{item.icon}</span>
      <span>{item.label}</span>
    </a>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <span className="text-2xl  font-bold bg-blue-700 bg-clip-text text-transparent align-center">
          Rajan  
</span>
      </div>

      {/* Navigation */}
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {primaryItems.map(renderNavItem)}
          <button
            type="button"
            aria-expanded={isMoreOpen}
            onClick={() => setIsMoreOpen((isOpen) => !isOpen)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            More sections
            <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          {isMoreOpen && <div className="space-y-2 border-l border-gray-200 pl-2">{moreItems.map(renderNavItem)}</div>}
        </div>
      </div>

      {/* Footer (Profile Info) */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="/images/rajan-gupta.jpg"
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
