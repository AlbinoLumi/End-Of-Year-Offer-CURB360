import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OfferContextType {
  isExpired: boolean;
  setIsExpired: (expired: boolean) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const useOffer = () => {
  const context = useContext(OfferContext);
  if (context === undefined) {
    throw new Error('useOffer must be used within an OfferProvider');
  }
  return context;
};

interface OfferProviderProps {
  children: ReactNode;
}

export const OfferProvider: React.FC<OfferProviderProps> = ({ children }) => {
  // TEMPORARY: Set to true to preview expired state. Change back to false when done.
  const [isExpired, setIsExpired] = useState(true);

  useEffect(() => {
    // Check expiration status on mount
    const checkExpiration = () => {
      const currentYear = new Date().getFullYear();
      const deadlinePST = new Date(`${currentYear}-12-31T23:59:59-08:00`);
      const deadlineUTC = deadlinePST.getTime();
      
      // Helper function to get current time in Pacific Time as milliseconds since epoch
      // Returns the UTC milliseconds that represent "now" in Pacific timezone
      const getCurrentPacificTimeMs = () => {
        const now = new Date();
        const currentUTC = now.getTime();
        
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
      
      const nowPacificUTC = getCurrentPacificTimeMs();
      const distance = deadlineUTC - nowPacificUTC;
      
      setIsExpired(distance < 0);
    };

    checkExpiration();
    // Check every minute to catch expiration
    const interval = setInterval(checkExpiration, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <OfferContext.Provider value={{ isExpired, setIsExpired }}>
      {children}
    </OfferContext.Provider>
  );
};

