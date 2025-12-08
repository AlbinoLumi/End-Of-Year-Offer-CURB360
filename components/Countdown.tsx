import React, { useState, useEffect } from 'react';
import { Timer, Snowflake } from 'lucide-react';

const Countdown: React.FC = () => {
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
    const getCurrentPacificTimeMs = () => {
      const now = new Date();
      
      // Get current time components in Pacific Time
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const parts = formatter.formatToParts(now);
      const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || '0');
      
      const year = getPart('year');
      const month = getPart('month');
      const day = getPart('day');
      const hour = getPart('hour');
      const minute = getPart('minute');
      const second = getPart('second');
      
      // Create a date object from these components (interpreted as local time)
      const pacificDate = new Date(year, month - 1, day, hour, minute, second);
      
      // Calculate the offset between local timezone and Pacific Time
      // We do this by creating two Date objects from the same moment in different timezones
      const nowUTC = now.getTime();
      
      // Get what "now" is in Pacific Time as a string
      const nowPacificStr = formatter.format(now);
      // Get what "now" is in local time as a string
      const nowLocalStr = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      // Parse both strings to Date objects (they'll be interpreted in local timezone)
      const parseDateStr = (str: string) => {
        const [datePart, timePart] = str.split(', ');
        const [m, d, y] = datePart.split('/');
        const [h, min, s] = timePart.split(':');
        return new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(min), parseInt(s));
      };
      
      const pacificParsed = parseDateStr(nowPacificStr);
      const localParsed = parseDateStr(nowLocalStr);
      
      // The offset is the difference between how local timezone interprets
      // the same moment when expressed in Pacific vs Local time
      const offset = localParsed.getTime() - pacificParsed.getTime();
      
      // Adjust the pacific date by the offset to get the correct UTC time
      return pacificDate.getTime() - offset;
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
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
