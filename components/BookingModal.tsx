import React, { useEffect } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOffer } from '../contexts/OfferContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, packageId }) => {
  const { isExpired } = useOffer();
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Close modal if expired (immediate check)
  useEffect(() => {
    if (isExpired) {
      onClose();
    }
  }, [isExpired, onClose]);
  
  // Prevent modal from rendering at all if expired
  if (isExpired) {
    return null;
  }

  // Determine which form URL to use
  const isJumpstart = packageId === 'p1';
  const isPowerPack = packageId === 'p2';
  const isUltimateAdvantage = packageId === 'p3';
  
  const formUrl = isJumpstart
    ? 'https://forms.zohopublic.com/curb360/form/GET250TOSPENDWITHCURB360ONANYPACKAGEIN2024/formperma/RWj3f1k8hsNQbkVZP8UhrFGaMPfBFJwM8BDNWBqSpSs'
    : isPowerPack
    ? 'https://forms.zohopublic.com/curb360/form/ThePowerPackSpend500Get250inCredits/formperma/Xi3JVrORjIf7HbEU-ZBkrX_T1IK_4bWueVR9f-6BdH0'
    : isUltimateAdvantage
    ? 'https://forms.zohopublic.com/curb360/form/TheUltimatePackSpend1000Get500inCredits/formperma/Kf0hgGZdCI14OeXPHBz9pzl9Z6K0HLrBQ7iJNj99Wy8'
    : 'https://forms.zohopublic.com/curb360/form/GETFREECREDITTOUSENOWORIN2024/formperma/PcvtGxFd-38ZnFoz4kXBHrcT4pcK20X4WqbPMHisGAU';

  const ariaLabel = isJumpstart
    ? 'Jumpstart Your Listings – Spend $250, Get $125 in Credits!'
    : isPowerPack
    ? 'The Power Pack – Spend $500, Get $250 in Credits!'
    : isUltimateAdvantage
    ? 'The Ultimate Pack – Spend $1000, Get $500 in Credits!'
    : 'GET $250 TO SPEND WITH CURB360 ON ANY PACKAGE IN 2024!';

  // Don't render anything if expired
  if (isExpired) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && !isExpired && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brandBlue w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative pointer-events-auto flex flex-col max-h-[90vh] border border-white/10"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-brandBlue">
                <h3 className="text-xl font-bold text-white">
                  {isExpired ? 'Offer Has Ended' : 'Secure Your Credits'}
                </h3>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-grow overflow-y-auto bg-brandBlue p-8">
                {isExpired ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="relative mb-6">
                      <div className="p-5 bg-gradient-to-br from-brandRed/30 to-brandBlue/30 rounded-full">
                        <CheckCircle2 className="text-brandRed" size={64} strokeWidth={2.5} />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="text-brandRed animate-pulse" size={24} />
                      </div>
                      <div className="absolute -bottom-2 -left-2">
                        <Sparkles className="text-white animate-pulse" size={20} style={{ animationDelay: '0.5s' }} />
                      </div>
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-4">Thank You for Your Participation!</h4>
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brandRed to-transparent mb-6"></div>
                    <p className="text-gray-200 text-lg mb-4 max-w-md leading-relaxed">
                      This exclusive end-of-year offer has now ended. We're incredibly grateful to everyone who participated and took advantage of this special opportunity.
                    </p>
                    <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                      Your support means the world to us, and we look forward to serving you in 2026. Please contact us directly to learn about our current services.
                    </p>
                    <div className="space-y-3 text-gray-300 bg-white/5 rounded-xl p-6 max-w-md">
                      <p className="text-white font-semibold mb-2">Get in Touch:</p>
                      <p><strong>Email:</strong> <a href="mailto:support@curb360.com" className="text-brandRed hover:text-red-400 transition-colors">support@curb360.com</a></p>
                      <p><strong>Phone:</strong> <a href="tel:8332872360" className="text-brandRed hover:text-red-400 transition-colors">833-287-2360</a></p>
                    </div>
                  </div>
                ) : (
                  /* The form background is white, so it will stand out nicely against the brandBlue padding */
                  <iframe 
                    aria-label={ariaLabel} 
                    frameBorder="0" 
                    style={{ height: '500px', width: '99%', border: 'none', borderRadius: '8px' }} 
                    src={formUrl}
                    title="Booking Form"
                  ></iframe>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;