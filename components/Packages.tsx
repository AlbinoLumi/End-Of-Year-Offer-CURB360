import React, { useState, useRef, useEffect } from 'react';
import { Package } from '../types';
import { Camera, Layers, Zap, Check, Snowflake, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOffer } from '../contexts/OfferContext';

interface PackagesProps {
  onOpenModal: (packageId: string) => void;
}

const packages: Package[] = [
  {
    id: 'p1',
    name: 'The Jumpstart',
    spend: 250,
    back: 125,
    description: 'A simple way to lock in savings and set up your 2026 media budget.',
    features: ['50 percent bonus credit value', 'Works for any CURB360 media services', 'Full flexibility on how and when credits are used in 2026'],
    icon: <Camera size={32} />,
  },
  {
    id: 'p2',
    name: 'The Power Pack',
    spend: 500,
    back: 250,
    description: 'A balanced credit bundle for agents who want more flexibility throughout the year.',
    features: ['250 dollars in bonus credits', 'Ideal for ongoing media needs', 'Credits can be applied to any services in 2026'],
    icon: <Layers size={32} />,
  },
  {
    id: 'p3',
    name: 'The Ultimate Advantage',
    spend: 1000,
    back: 500,
    description: 'Our best value option with maximum savings for your 2026 marketing plans.',
    features: ['500 dollars in bonus credits', 'Best for agents with steady listing volume', 'Credits work across all CURB360 media services in 2026'],
    icon: <Zap size={32} />,
  }
];

const Packages: React.FC<PackagesProps> = ({ onOpenModal }) => {
  const { isExpired } = useOffer();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      // Small delay to ensure the form is rendered
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showForm]);

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Festive background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
             <div className="absolute top-10 left-10 text-iceBlue opacity-40 transform rotate-12"><Snowflake size={64} /></div>
             <div className="absolute bottom-20 right-10 text-brandRed opacity-10 transform -rotate-12"><Snowflake size={96} /></div>
             <div className="absolute top-40 right-20 text-iceBlue opacity-30 transform rotate-45"><Snowflake size={48} /></div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brandBlue mb-4">
            Pick Your 2026 Cash Credit Power Up
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your package below and lock in your <span className="font-bold text-brandRed">50% cash bonus</span> to use in 2026!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 border-2 ${
                index === 2 ? 'border-brandRed shadow-2xl scale-105 z-20' : 'border-gray-100 shadow-xl hover:border-brandRed/30'
              } transition-all duration-300 flex flex-col`}
            >
              {index === 2 && (
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brandBlue text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                    MOST POPULAR
                 </div>
              )}

              <div className={`p-4 rounded-xl inline-flex self-center mb-6 ${
                  index === 2 ? 'bg-brandRed text-white' : 'bg-brandBlue/5 text-brandBlue'
              }`}>
                {pkg.icon}
              </div>

              <h3 className="text-2xl font-bold text-brandBlue text-center mb-2">{pkg.name}</h3>
              
              <div className="text-center mb-6">
                <p className="text-gray-500 font-medium">Spend ${pkg.spend}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-gray-400 font-bold text-lg">GET</span>
                    <span className="text-4xl font-extrabold text-brandRed">${pkg.back}</span>
                    <span className="text-gray-400 font-bold text-lg">BACK</span>
                </div>
              </div>

              <p className="text-center text-gray-600 mb-8 h-16">
                {pkg.description}
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <div className="mr-3 text-green-500 bg-green-50 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Completely disabled - do nothing
                }}
                disabled={true}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
              >
                Offer Ended
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Need More Credits Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <div className={`inline-flex items-center gap-3 rounded-full px-6 py-3 transition-all ${
              isExpired 
                ? 'bg-gray-100 border-2 border-gray-300 opacity-60' 
                : 'bg-brandBlue/5 border-2 border-brandBlue/20 hover:border-brandRed/40 hover:bg-brandRed/5'
            }`}>
              <span className={`font-semibold ${isExpired ? 'text-gray-500' : 'text-brandBlue'}`}>
                {isExpired ? 'OFFER HAS ENDED' : 'WANT MORE CREDITS?'}
              </span>
              {!isExpired && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="text-brandRed hover:text-red-600 font-bold text-lg transition-colors inline-flex items-center gap-1"
                >
                  Let's talk <ChevronDown size={18} className={`transition-transform ${showForm ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {showForm && !isExpired && (
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-white border-2 border-brandBlue/20 rounded-xl shadow-xl overflow-visible min-w-[500px] max-w-2xl w-full"
                >
                  <iframe 
                    aria-label="Want more credits? Form" 
                    frameBorder="0" 
                    style={{ 
                      height: '800px', 
                      width: '100%', 
                      border: 'none',
                      display: 'block',
                      minHeight: '800px'
                    }} 
                    src="https://forms.zohopublic.com/curb360/form/WantmorecreditsForm/formperma/GB7AL5E3Kb4gPO2KCmfxFUFOgF8RVQkFJ6Muqo0p0t0"
                    title="Want more credits? Form"
                    scrolling="auto"
                  ></iframe>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Credits Availability Note */}
        <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl transform -skew-y-1"></div>
            <div className="relative bg-white border border-blue-100 rounded-2xl p-8 shadow-sm text-center">
                <div className="inline-block p-3 bg-blue-100 text-brandBlue rounded-full mb-4">
                    <Snowflake className="animate-pulse" size={24} />
                </div>
                <h4 className="text-xl font-bold text-brandRed mb-2">OFFER TERMS</h4>
                <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
                    Your cash credits work across all CURB360 media services in 2026. You have full flexibility on how and when to use them - whether for professional photos, virtual tours, floor plans, aerial photos and/or any other services that best fit your needs throughout the year.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;