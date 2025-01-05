import React, { createContext, useContext, useState, useEffect } from 'react';

interface StreakContextType {
  currentStreak: number;
  lastCheckIn: string | null;
  xpPoints: number;
  level: number;
  updateStreak: () => void;
  addXP: (points: number) => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [currentStreak, setCurrentStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved) : 0;
  });
  
  const [lastCheckIn, setLastCheckIn] = useState(() => {
    return localStorage.getItem('lastCheckIn');
  });
  
  const [xpPoints, setXPPoints] = useState(() => {
    const saved = localStorage.getItem('xp');
    return saved ? parseInt(saved) : 0;
  });

  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('level');
    return saved ? parseInt(saved) : 1;
  });

  useEffect(() => {
    localStorage.setItem('streak', currentStreak.toString());
    localStorage.setItem('lastCheckIn', lastCheckIn || '');
    localStorage.setItem('xp', xpPoints.toString());
    localStorage.setItem('level', level.toString());
  }, [currentStreak, lastCheckIn, xpPoints, level]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
      if (lastCheckIn === new Date(Date.now() - 86400000).toDateString()) {
        setCurrentStreak(prev => prev + 1);
      } else {
        setCurrentStreak(1);
      }
      setLastCheckIn(today);
    }
  };

  const addXP = (points: number) => {
    setXPPoints(prev => {
      const newXP = prev + points;
      const newLevel = Math.floor(newXP / 100) + 1;
      if (newLevel !== level) {
        setLevel(newLevel);
      }
      return newXP;
    });
  };

  return (
    <StreakContext.Provider value={{
      currentStreak,
      lastCheckIn,
      xpPoints,
      level,
      updateStreak,
      addXP
    }}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
}