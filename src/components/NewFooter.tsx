import { Facebook, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FaTwitter } from 'react-icons/fa';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'DevOps Case Studies', href: '#case-studies' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => (
  <footer className="border-t-4 border-sky-500 bg-gray-900 text-gray-300">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
        <div>
          <h2 className="text-xl font-semibold text-white">Rajan Kumar Gupta</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
            Electronics, Communication and Information Engineer and DevOps practitioner passionate about building reliable systems through software, automation, infrastructure, and hardware.
          </p>
          <div className="mt-5 flex gap-4">
            <a href="https://github.com/rajanshah23" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400">
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/rajan-kumar-gupta-16696532b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400">
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://x.com/Rajansh26003523" target="_blank" rel="noopener noreferrer" aria-label="X profile" className="text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400">
              <FaTwitter className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://www.facebook.com/rajana.gupta.805984" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile" className="text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="mb-4 text-sm font-semibold text-white">Quick links</h3>
          <ul className="space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="mailto:shahrajan774@gmail.com" className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span className="break-all">shahrajan774@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+9779867488761" className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span>+977-9867488761</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <MapPin className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
              <span>Ramgram-3, Parasi, Nawalparasi</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Rajan Kumar Gupta</p>
      </div>
    </div>
  </footer>
);

export default Footer;
