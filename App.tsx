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
    <div className="min-h-screen flex flex-col font-sans text-brandBlue">
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
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        packageId={selectedPackageId}
      />
    </div>
  );
}

export default App;