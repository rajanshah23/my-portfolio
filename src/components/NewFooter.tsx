import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      
      <div className="container mx-auto px-4">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 mt-4">Rajan Kumar Gupta</h3>
            <p className="text-gray-400" style={{ textAlign: 'justify' }}>
              Electronics,Communication and Information Engineer passionate about building smart systems through innovative code and hardware.
            </p>
            <div className="flex space-x-4">
              <a href="http://github.com/rajanshah23" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/rajan-kumar-gupta-16696532b/" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://x.com/Rajansh26003523" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/rajana.gupta.805984" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div >
            <h3 className="text-xl font-semibold text-white mb-4 mt-4 space-y-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 mt-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-4">
                <Mail className="w-5 h-5" />
                <span>shahrajan774@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+977-9867488761</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-8 h-5" />
                <span>Ramgram-3, Parasi Nawalparasi</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 mt-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to get the latest updates.</p>
            <form className="w-full max-w-sm flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left">© 2024 Rajan Kumar Gupta. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
