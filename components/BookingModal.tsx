import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, packageId }) => {
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

  // Determine which form URL to use
  const isJumpstart = packageId === 'p1';
  
  const formUrl = isJumpstart
    ? 'https://forms.zohopublic.com/curb360/form/GET250TOSPENDWITHCURB360ONANYPACKAGEIN2024/formperma/RWj3f1k8hsNQbkVZP8UhrFGaMPfBFJwM8BDNWBqSpSs'
    : 'https://forms.zohopublic.com/curb360/form/GETFREECREDITTOUSENOWORIN2024/formperma/PcvtGxFd-38ZnFoz4kXBHrcT4pcK20X4WqbPMHisGAU';

  const ariaLabel = isJumpstart
    ? 'Jumpstart Your Listings – Spend $250, Get $125 in Credits!'
    : 'GET $250 TO SPEND WITH CURB360 ON ANY PACKAGE IN 2024!';

  return (
    <AnimatePresence>
      {isOpen && (
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
                <h3 className="text-xl font-bold text-white">Secure Your Credits</h3>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body (Zoho Form) */}
              <div className="flex-grow overflow-y-auto bg-brandBlue p-2">
                 {/* The form background is white, so it will stand out nicely against the brandBlue padding */}
                 <iframe 
                    aria-label={ariaLabel} 
                    frameBorder="0" 
                    style={{ height: '500px', width: '99%', border: 'none', borderRadius: '8px' }} 
                    src={formUrl}
                    title="Booking Form"
                 ></iframe>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;