export interface TourEvent {
  id: number;
  date: string;
  venue: string;
  location: string;
  time: string;
  status: "Available" | "Limited" | "Sold Out";
}

// Initialize with localStorage or default data
const getInitialData = (): TourEvent[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tourDatesData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved tour dates:', e);
      }
    }
  }
  
  // Default data if nothing is saved
  return [
    {
      id: 1,
      date: "Sept 20, 2025",
      venue: "Radisson Blu",
      location: "Mumbai, India",
      time: "8:00 PM",
      status: "Available",
    },
    {
      id: 2,
      date: "Nov 05, 2025",
      venue: "Stellar Stadium",
      location: "New York, NY",
      time: "7:30 PM",
      status: "Limited",
    },
    {
      id: 3,
      date: "Nov 18, 2025",
      venue: "Nebula Nightclub",
      location: "Miami, FL",
      time: "9:00 PM",
      status: "Sold Out",
    },
    {
      id: 4,
      date: "Dec 02, 2025",
      venue: "Echo Amphitheater",
      location: "Austin, TX",
      time: "8:30 PM",
      status: "Available",
    },
  ];
};

export let tourDatesData: TourEvent[] = getInitialData();

// Save data to localStorage
const saveData = (data: TourEvent[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tourDatesData', JSON.stringify(data));
  }
};

// CMS Functions
export const addTourDate = (tourDate: Omit<TourEvent, 'id'>): TourEvent => {
  const newTourDate: TourEvent = {
    ...tourDate,
    id: Date.now()
  };
  tourDatesData.push(newTourDate);
  saveData(tourDatesData);
  return newTourDate;
};

export const updateTourDate = (id: number, updates: Partial<TourEvent>): TourEvent | null => {
  const index = tourDatesData.findIndex(tour => tour.id === id);
  if (index === -1) return null;
  
  tourDatesData[index] = { ...tourDatesData[index], ...updates };
  saveData(tourDatesData);
  return tourDatesData[index];
};

export const deleteTourDate = (id: number): boolean => {
  const index = tourDatesData.findIndex(tour => tour.id === id);
  if (index === -1) return false;
  
  tourDatesData.splice(index, 1);
  saveData(tourDatesData);
  return true;
};

export const getTourDate = (id: number): TourEvent | null => {
  return tourDatesData.find(tour => tour.id === id) || null;
};

export const getAllTourDates = (): TourEvent[] => {
  return [...tourDatesData];
}; 