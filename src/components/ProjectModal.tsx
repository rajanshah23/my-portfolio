import { X, Github, ExternalLink, Package } from 'lucide-react';
import { ProjectType } from '../types';
import { useEffect, useRef } from 'react';

type ProjectWithDetails = ProjectType & {
  detailedDescription?: string[];
};

type ProjectModalProps = {
  project: ProjectWithDetails;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    closeButtonRef.current?.focus();

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus();
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
      role="presentation"
    >
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div ref={dialogRef} className="bg-white rounded-2xl max-w-5xl w-full animate-scale-up" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabIndex={-1}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h2 id="project-modal-title" className="text-2xl font-bold text-gray-800">{project.title}</h2>
              {project.subtitle && <p className="mt-1 text-sm text-gray-600">{project.subtitle}</p>}
            </div>
            <button 
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="rounded-full p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

            {project.detailedDescription && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Implementation Details</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {project.detailedDescription.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}

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
                    <figure key={index} className="space-y-2">
                      <img
                        src={screenshot}
                        alt={project.screenshotCaptions?.[index] || `${project.title} screenshot`}
                        className="rounded-lg w-full"
                        onError={(event) => {
                          const figure = event.currentTarget.closest('figure');
                          if (figure) {
                            figure.style.display = 'none';
                          }
                        }}
                      />
                      <figcaption className="text-sm text-gray-500 text-center">
                        {project.screenshotCaptions?.[index] || `${project.title} screenshot`}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {(project.repositoryUrl || project.links.github) && (
                <a 
                  href={project.repositoryUrl || project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              )}
              {project.dockerHubUrl && (
                <a
                  href={project.dockerHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Package className="w-5 h-5 mr-2" />
                  View on Docker Hub
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