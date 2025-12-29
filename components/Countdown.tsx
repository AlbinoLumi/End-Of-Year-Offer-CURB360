import React, { useState, useEffect } from 'react';
import { Timer, Snowflake, XCircle } from 'lucide-react';
import { useOffer } from '../contexts/OfferContext';

const Countdown: React.FC = () => {
  const { isExpired, setIsExpired } = useOffer();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set deadline to December 31st of current year at 11:59:59 PM Pacific Time (San Diego, CA)
    const currentYear = new Date().getFullYear();
    
    // Helper function to get current time in Pacific Time as milliseconds since epoch
    // Returns the UTC milliseconds that represent "now" in Pacific timezone
    const getCurrentPacificTimeMs = () => {
      const now = new Date();
      
      // Format current UTC time in Pacific timezone to get what time it is there
      const pacificFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      // Format the same UTC moment in UTC timezone for comparison
      const utcFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      // Get time components in both timezones for the same UTC moment
      const pacificParts = pacificFormatter.formatToParts(now);
      const utcParts = utcFormatter.formatToParts(now);
      
      const getPart = (parts: Intl.DateTimeFormatPart[], type: string) => 
        parts.find(p => p.type === type)?.value || '0';
      
      // Build ISO strings (YYYY-MM-DDTHH:mm:ss)
      const buildISO = (parts: Intl.DateTimeFormatPart[]) => {
        const year = getPart(parts, 'year');
        const month = getPart(parts, 'month');
        const day = getPart(parts, 'day');
        const hour = getPart(parts, 'hour').padStart(2, '0');
        const minute = getPart(parts, 'minute').padStart(2, '0');
        const second = getPart(parts, 'second').padStart(2, '0');
        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
      };
      
      const pacificISO = buildISO(pacificParts);
      const utcISO = buildISO(utcParts);
      
      // Parse both as UTC to calculate the timezone offset
      // Example: If currentUTC = 12:00 UTC, then:
      // - pacificISO = "04:00" (what 12:00 UTC looks like in Pacific)
      // - utcISO = "12:00" (what 12:00 UTC looks like in UTC)
      // - pacificAsUTC = 04:00 UTC (wrong interpretation of Pacific time)
      // - utcAsUTC = 12:00 UTC (correct)
      // - offsetMs = 04:00 - 12:00 = -8 hours = -28800000 ms
      const pacificAsUTC = new Date(pacificISO + 'Z').getTime();
      const utcAsUTC = new Date(utcISO + 'Z').getTime();
      const offsetMs = pacificAsUTC - utcAsUTC;
      
      // To convert Pacific time components back to the correct UTC time:
      // We need to subtract the offset from the incorrectly interpreted Pacific time
      // Pacific UTC = pacificAsUTC - offsetMs
      // Example: 04:00 UTC - (-28800000) = 04:00 + 28800000 = 12:00 UTC ✓
      return pacificAsUTC - offsetMs;
    };

    // Create deadline: December 31, 23:59:59 Pacific Time
    // December 31 is always PST (UTC-8), not PDT
    const deadlinePST = new Date(`${currentYear}-12-31T23:59:59-08:00`);
    const deadlineUTC = deadlinePST.getTime();

    const timer = setInterval(() => {
      // Get current time in Pacific Time (as UTC milliseconds)
      const nowPacificUTC = getCurrentPacificTimeMs();
      
      // Calculate difference
      const distance = deadlineUTC - nowPacificUTC;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setIsExpired(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [setIsExpired]);

  // Don't render if expired
  if (isExpired) {
    return (
      <div className="w-full bg-gray-100 backdrop-blur-sm border-y border-gray-300 py-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center relative z-10">
          <div className="flex items-center gap-3">
            <XCircle className="text-brandRed" size={40} />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-700">
              Offer Has Ended
            </h3>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Thank you for your interest! This exclusive offer has ended. Please check back for future promotions or contact us directly to learn about our current services.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white backdrop-blur-sm border-y border-brandBlue/10 py-6 relative overflow-hidden">
      {/* Festive gradient border effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brandRed/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brandRed/30 to-transparent"></div>
      
      {/* Background decoration */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
        <Snowflake size={80} className="text-brandBlue" />
      </div>
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
        <Snowflake size={60} className="text-brandRed" />
      </div>

      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left relative z-10">
        <div className="flex items-center gap-3">
            <Timer className="text-brandRed animate-pulse" size={32} />
            <h3 className="text-xl md:text-2xl font-bold text-brandBlue">
                Hurry, exclusive offer ends in...
            </h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-brandBlue text-white text-2xl md:text-3xl font-bold w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg border-t-2 border-white/20">
              {timeLeft.days}
            </div>
            <span className="text-sm mt-1 font-semibold text-gray-500">Days</span>
          </div>
          <span className="text-2xl font-bold text-brandRed -mt-6">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-brandBlue text-white text-2xl md:text-3xl font-bold w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg border-t-2 border-white/20">
              {timeLeft.hours}
            </div>
            <span className="text-sm mt-1 font-semibold text-gray-500">Hours</span>
          </div>
          <span className="text-2xl font-bold text-brandRed -mt-6">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-brandBlue text-white text-2xl md:text-3xl font-bold w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg border-t-2 border-white/20">
              {timeLeft.minutes}
            </div>
            <span className="text-sm mt-1 font-semibold text-gray-500">Mins</span>
          </div>
          <span className="text-2xl font-bold text-brandRed -mt-6">:</span>
           <div className="flex flex-col items-center">
            <div className="bg-brandRed text-white text-2xl md:text-3xl font-bold w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg animate-[pulse_1s_ease-in-out_infinite] border-t-2 border-white/20">
              {timeLeft.seconds}
            </div>
            <span className="text-sm mt-1 font-semibold text-brandRed">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
