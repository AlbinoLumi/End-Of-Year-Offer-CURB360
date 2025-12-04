import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenModal: (packageId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  useEffect(() => {
    // Launch confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fa4f5c', '#123645', '#ffffff']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fa4f5c', '#123645', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brandBlue text-white pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop" 
            alt="Starry Night Background" 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brandBlue/90 via-brandBlue/70 to-brandBlue"></div>
      </div>

      {/* Decorative Fireworks/Sparkles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none sparkle-bg opacity-40"></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-bounce">
                <Sparkles size={20} className="text-brandRed" />
                <span className="font-semibold text-white tracking-wide uppercase text-sm">New Year Special Offer</span>
                <Sparkles size={20} className="text-brandRed" />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                Unlock <span className="text-brandRed">50% Back</span> in Credits <br />
                <span className="glitter-text block mt-2">Your Best Year Starts Here!</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                Get ready for 2026 with up to <span className="font-bold text-white">$500 in bonus credits</span> to elevate your listings to the next level.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                    href="#packages"
                    onClick={(e) => handleScroll(e, '#packages')}
                    className="group relative px-8 py-4 bg-brandRed text-white rounded-full text-lg font-bold shadow-[0_0_20px_rgba(250,79,92,0.5)] hover:bg-red-600 hover:shadow-[0_0_30px_rgba(250,79,92,0.8)] transition-all transform hover:-translate-y-1 overflow-hidden inline-flex items-center justify-center"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Unlock My 2026 Credits <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Hover shine effect */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
                </a>
                <a 
                    href="#how-it-works"
                    onClick={(e) => handleScroll(e, '#how-it-works')}
                    className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                    How It Works
                </a>
            </div>
            
            <p className="mt-6 text-sm text-gray-400">
                *Offer ends December 31st. Credits valid for 2026.
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;