import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useOffer } from '../contexts/OfferContext';

interface FooterProps {
  onOpenModal: (packageId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const { isExpired } = useOffer();
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-brandBlue text-white pt-20 pb-10">
      {/* Background Image with Overlay - same as Hero */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop" 
            alt="Starry Night Background" 
            className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 festive-gradient"></div>
        {/* Subtle festive gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/95 via-brandBlue/85 via-transparent to-brandRed/10"></div>
      </div>

      {/* Decorative Sparkles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none sparkle-bg opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-3 mb-4">
                <a href="https://curb360.com" target="_blank" rel="noopener noreferrer">
                  <img 
                      src="/CURB360_HzLogo_Red_Final2-1.png" 
                      alt="CURB360 Real Estate Media Experts" 
                      className="h-14 w-auto object-contain brightness-0 invert"
                  />
                </a>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Helping real estate professionals sell faster and for more with premium visual marketing solutions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
                <li><a href="#how-it-works" onClick={(e) => handleScroll(e, '#how-it-works')} className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#packages" onClick={(e) => handleScroll(e, '#packages')} className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" onClick={(e) => handleScroll(e, '#testimonials')} className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contacts</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
                <li>
                  <span className="block text-white font-semibold">Email:</span>
                  <a href="mailto:support@curb360.com" className="hover:text-brandRed transition-colors">support@curb360.com</a>
                </li>
                <li>
                  <span className="block text-white font-semibold">Media Delivery:</span>
                  <a href="mailto:content@curb360.com" className="hover:text-brandRed transition-colors">content@curb360.com</a>
                </li>
                <li>
                  <span className="block text-white font-semibold">Job Positions:</span>
                  <a href="mailto:support@curb360.com" className="hover:text-brandRed transition-colors">support@curb360.com</a>
                </li>
                <li>
                  <span className="block text-white font-semibold">Phone:</span>
                  <a href="tel:8332872360" className="hover:text-brandRed transition-colors">833-287-2360</a>
                </li>
                <li>
                  <span className="block text-white font-semibold">Hours:</span>
                  Mon-Fri 9:00AM - 5:00PM (PST)
                </li>
            </ul>
          </div>

          {/* Urgent CTA */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h4 className="text-lg font-bold mb-2 text-white">
              {isExpired ? 'Thank You for Your Participation!' : 'Offer Ends Dec 31st!'}
            </h4>
            <p className="text-sm text-gray-200 mb-4">
              {isExpired 
                ? 'This exclusive offer has ended. We\'re grateful to everyone who participated!' 
                : 'Book now and make 2026 your year of growth.'}
            </p>
            <button
                disabled={true}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Completely disabled - do nothing
                }}
                className="block w-full text-center font-bold py-3 rounded-lg bg-gray-500 text-gray-200 cursor-not-allowed opacity-60"
            >
                Offer Ended
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Curb360. All rights reserved.</p>
            
            <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;