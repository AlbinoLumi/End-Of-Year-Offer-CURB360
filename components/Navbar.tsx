import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOffer } from '../contexts/OfferContext';

interface NavbarProps {
  onOpenModal: (packageId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const { isExpired } = useOffer();
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
                  src="/CURB360_HzLogo_Red_Final2-1.png" 
                  alt="CURB360 Real Estate Media Experts" 
                  className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
                  style={{
                    imageRendering: 'crisp-edges',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    willChange: 'filter'
                  }}
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
            <button
              disabled={true}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Completely disabled - do nothing
              }}
              className="px-6 py-2 rounded-full font-bold bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
            >
              Offer Ended
            </button>
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
               <button
                  disabled={true}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Completely disabled - do nothing
                  }}
                  className="block w-full text-center mt-4 px-3 py-3 rounded-md font-bold bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
                >
                  Offer Ended
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;