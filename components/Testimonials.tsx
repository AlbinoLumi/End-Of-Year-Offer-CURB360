import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Marissa A.',
    role: 'C21 Affiliate',
    content: "Highly recommend CURB360! I found them on Instagram and was impressed by their work. I knew I would call them for my next listing and they did not disappoint. The photos were stunning!",
    avatar: "https://stratus.campaign-image.com/images/775337000024832014_zc_v1_1763476742224_marissa_alcantara_png.png"
  },
  {
    id: 't2',
    name: 'Veronica M.',
    role: 'Berkshire Hathaway',
    content: "Dominic Kawaja and his team are amazing! I noticed their work in Instagram for a fellow real estate agent and I booked them for a listing last year and they are my \"go to\" for all professional pictures and video now.",
    avatar: "https://stratus.campaign-image.com/images/775337000024832014_zc_v1_1763477126748_veronica_mejija_png.png"
  },
  {
    id: 't3',
    name: 'Shari D.',
    role: 'Compass',
    content: "OMG!!! Dominic, these pictures came out absolutely gorgeous and now I know why Camille recommended you! Please tell Pete I said thank you so much! Bravo 👏🏼",
    avatar: "https://stratus.campaign-image.com/images/775337000024832014_zc_v1_1763477935859_shari.png"
  },
  {
    id: 't4',
    name: 'Jasmine L.',
    role: 'JLA Realty',
    content: "Spectacular quality social media and MLS video with a remarkable turn time. This team came through for me in a bind and delivered so much higher than my expectations. Keep up the amazing work!",
    avatar: "https://stratus.campaign-image.com/images/775337000025335275_zc_v1_1758307243243_screenshot_2025_09_19_at_1.40.25%E2%80%AFpm.jpg"
  },
  {
    id: 't5',
    name: 'Samantha M.',
    role: 'Champions NextGen RE',
    content: "The most traffic we had seen in a month! I had a hiccup (on my end) and they returned my call immediately to help me through it - on a Saturday morning! I’m looking forward to working with CURB360 again!",
    avatar: "https://stratus.campaign-image.com/images/775337000025335275_zc_v1_1758307354771_screenshot_2025_09_19_at_1.42.23%E2%80%AFpm.jpg"
  },
  {
    id: 't6',
    name: 'Brandi B.',
    role: 'JLA Realty',
    content: "I couldn’t be happier about the experience I had working with CURB360! From start to finish, Dominic and his team were professional, prompt and insanely talented. They photographed and filmed my listing, and the results blew me away.",
    avatar: "https://stratus.campaign-image.com/images/775337000025335275_zc_v1_1758307300608_screenshot_2025_09_19_at_1.41.24%E2%80%AFpm.jpg"
  }
];

const Testimonials: React.FC = () => {
  // Duplicate testimonials to create seamless loop
  const displayTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brandBlue mb-4">
            Trusted by Top Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See why hundreds of real estate professionals choose <span className="font-bold">CURB360</span> to market their listings.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient Masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <motion.div 
          className="flex gap-8 w-max px-8"
          animate={{ x: "-50%" }}
          transition={{ 
            ease: "linear", 
            duration: 40, 
            repeat: Infinity 
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ x: 0 }}
        >
          {displayTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`} 
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col w-[350px] md:w-[400px] flex-shrink-0"
              onMouseEnter={(e) => {
                 // Stop parent motion is handled by hover on parent, 
                 // but we can add specific card interactions here if needed
              }}
            >
              <div className="absolute top-6 right-6 text-brandRed/10">
                <Quote size={48} fill="currentColor" />
              </div>

              <div className="flex text-brandRed mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="mr-1" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 relative z-10 text-lg leading-relaxed flex-grow">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-brandRed rounded-full transform rotate-6 opacity-20"></div>
                    <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm relative z-10"
                    />
                </div>
                <div>
                  <h4 className="font-bold text-brandBlue text-lg leading-tight">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;