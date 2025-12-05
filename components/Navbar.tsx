import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenModal: (packageId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Packages', href: '#packages' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <a href="https://curb360.com" target="_blank" rel="noopener noreferrer">
               <img 
                  src="https://curb360.com/wp-content/uploads/2023/10/CURB360_HzLogo_Red_Final2-1.png" 
                  alt="CURB360 Real Estate Media Experts" 
                  className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
               />
             </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium transition-colors hover:text-brandRed ${
                  scrolled ? 'text-brandBlue' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#packages"
              onClick={(e) => handleNavClick(e, '#packages')}
              className="bg-brandRed hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Credits
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? 'text-brandBlue' : 'text-white'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brandRed hover:bg-gray-50 rounded-md"
                >
                  {link.label}
                </a>
              ))}
               <a 
                  href="#packages"
                  onClick={(e) => {
                    handleNavClick(e, '#packages');
                  }}
                  className="block w-full text-center mt-4 bg-brandRed text-white px-3 py-3 rounded-md font-bold"
                >
                  Get Credits
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;