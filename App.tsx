import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import HowItWorks from './components/HowItWorks';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const openModal = (packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    } else {
      setSelectedPackageId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brandBlue relative">
      {/* Subtle festive background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(250, 79, 92, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(219, 234, 254, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(250, 79, 92, 0.05) 0%, transparent 50%)`,
        }}></div>
      </div>
      
      <div className="relative z-10">
        <Navbar onOpenModal={openModal} />
        <main className="flex-grow">
          <Hero onOpenModal={openModal} />
          <Countdown />
          <HowItWorks />
          <Packages onOpenModal={openModal} />
          <Testimonials />
          <FAQ />
        </main>
        <Footer onOpenModal={openModal} />
      </div>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        packageId={selectedPackageId}
      />
    </div>
  );
}

export default App;