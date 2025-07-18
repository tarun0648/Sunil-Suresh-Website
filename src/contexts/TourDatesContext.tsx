import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TourEvent, getAllTourDates } from '@/data/tourDatesCMS';

interface TourDatesContextType {
  tourDates: TourEvent[];
  refreshTourDates: () => void;
}

const TourDatesContext = createContext<TourDatesContextType | undefined>(undefined);

export const useTourDates = () => {
  const context = useContext(TourDatesContext);
  if (context === undefined) {
    throw new Error('useTourDates must be used within a TourDatesProvider');
  }
  return context;
};

interface TourDatesProviderProps {
  children: ReactNode;
}

export const TourDatesProvider: React.FC<TourDatesProviderProps> = ({ children }) => {
  const [tourDates, setTourDates] = useState<TourEvent[]>([]);

  const refreshTourDates = () => {
    const allDates = getAllTourDates();
    setTourDates(allDates);
  };

  useEffect(() => {
    refreshTourDates();
    
    // Listen for storage changes to sync data across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tourDatesData') {
        refreshTourDates();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value: TourDatesContextType = {
    tourDates,
    refreshTourDates
  };

  return (
    <TourDatesContext.Provider value={value}>
      {children}
    </TourDatesContext.Provider>
  );
}; 