import React from 'react';
import { Calendar, CreditCard, TrendingUp } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brandBlue mb-4">
            Kickstart 2026 in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            2026 is just around the corner. Book your shoots now and get 50% back in credits to use next year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
           {/* Connecting line for desktop */}
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-1 border-t-2 border-dashed border-gray-300"></div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300">
                <Calendar size={40} className="text-brandBlue" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brandRed text-white rounded-full flex items-center justify-center font-bold shadow-md">1</div>
            </div>
            <h3 className="text-xl font-bold text-brandBlue mb-3">Book & Pay Now</h3>
            <p className="text-gray-600">
                Select your credit package and complete your purchase before Dec 31st to qualify for the bonus.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300">
                <CreditCard size={40} className="text-brandBlue" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brandRed text-white rounded-full flex items-center justify-center font-bold shadow-md">2</div>
            </div>
            <h3 className="text-xl font-bold text-brandBlue mb-3">Get an Instant 50% Credit Boost!</h3>
            <p className="text-gray-600">
                Ex: Spend $500 and receive an additional $250 in credits for your future bookings.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
             <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={40} className="text-brandBlue" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brandRed text-white rounded-full flex items-center justify-center font-bold shadow-md">3</div>
            </div>
            <h3 className="text-xl font-bold text-brandBlue mb-3">Elevate in 2026</h3>
            <p className="text-gray-600">
                Use your credits starting Jan 1st, 2026 for any premium service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;