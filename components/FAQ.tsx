import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "When do the bonus credits expire?",
    answer: "All bonus credits earned through this promotion are valid for use throughout the entire 2026 calendar year, ending on December 31st, 2026."
  },
  {
    question: "Can I use the credits for Virtual Twilight or 3D Tours?",
    answer: "Yes! Your credits are flexible and can be applied to any of our premium services, including Virtual Twilight, Interactive Floor Plans, Cinematic Video Tours, and standard photography."
  },
  {
    question: "How soon are the credits added to my account?",
    answer: "Credits are instantly added to your CURB360 account immediately after purchase, so you're ready to book your next shoot right away."
  },
  {
    question: "Is there a limit to how many packages I can buy?",
    answer: "No, there is no limit. You can purchase multiple packages to stack up credits for your 2026 listings."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brandBlue mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know about the 2026 Jumpstart Promo</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-brandBlue text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-brandRed" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;