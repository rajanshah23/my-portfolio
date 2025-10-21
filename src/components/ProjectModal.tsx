import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectType } from '../types';
import { useEffect } from 'react';

type ProjectModalProps = {
  project: ProjectType;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Handle click outside the modal content
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto backdrop-blur-[2px] animate-fade-in"
      onClick={handleOutsideClick}
    >
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl max-w-5xl w-full animate-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Project Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {project.features && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Screenshots */}
            {project.screenshots && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, index) => (
                    <img 
                      key={index}
                      src={screenshot} 
                      alt={`Screenshot ${index + 1}`} 
                      className="rounded-lg w-full"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <a 
                  href={project.links.github}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              )}
              {project.links.live && (
                <a 
                  href={project.links.live}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </a>
              )}
              {project.links.playStore && (
                <a 
                  href={project.links.playStore}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View on Play Store
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;