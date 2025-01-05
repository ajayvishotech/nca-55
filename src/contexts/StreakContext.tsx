import React, { createContext, useContext, useState, useEffect } from 'react';

interface StreakContextType {
  currentStreak: number;
  lastCheckIn: string | null;
  xpPoints: number;
  level: number;
  gems: number;
  badges: string[];
  streakFreezes: number;
  updateStreak: () => void;
  addXP: (points: number) => void;
  addGems: (amount: number) => void;
  useStreakFreeze: () => boolean;
  addBadge: (badge: string) => void;
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

  const [gems, setGems] = useState(() => {
    const saved = localStorage.getItem('gems');
    return saved ? parseInt(saved) : 0;
  });

  const [badges, setBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('badges');
    return saved ? JSON.parse(saved) : [];
  });

  const [streakFreezes, setStreakFreezes] = useState(() => {
    const saved = localStorage.getItem('streakFreezes');
    return saved ? parseInt(saved) : 3; // Start with 3 streak freezes
  });

  useEffect(() => {
    localStorage.setItem('streak', currentStreak.toString());
    localStorage.setItem('lastCheckIn', lastCheckIn || '');
    localStorage.setItem('xp', xpPoints.toString());
    localStorage.setItem('level', level.toString());
    localStorage.setItem('gems', gems.toString());
    localStorage.setItem('badges', JSON.stringify(badges));
    localStorage.setItem('streakFreezes', streakFreezes.toString());
  }, [currentStreak, lastCheckIn, xpPoints, level, gems, badges, streakFreezes]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
      if (lastCheckIn === new Date(Date.now() - 86400000).toDateString()) {
        setCurrentStreak(prev => {
          const newStreak = prev + 1;
          // Award special milestone rewards
          if (newStreak === 7) addBadge('7_day_streak');
          if (newStreak === 30) addBadge('30_day_streak');
          if (newStreak === 100) addBadge('100_day_streak');
          return newStreak;
        });
        // Award daily streak bonus
        addXP(50);
        addGems(5);
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
        // Level up rewards
        addGems(newLevel * 10);
        addBadge(`level_${newLevel}`);
      }
      return newXP;
    });
  };

  const addGems = (amount: number) => {
    setGems(prev => prev + amount);
  };

  const useStreakFreeze = () => {
    if (streakFreezes > 0) {
      setStreakFreezes(prev => prev - 1);
      return true;
    }
    return false;
  };

  const addBadge = (badge: string) => {
    if (!badges.includes(badge)) {
      setBadges(prev => [...prev, badge]);
    }
  };

  return (
    <StreakContext.Provider value={{
      currentStreak,
      lastCheckIn,
      xpPoints,
      level,
      gems,
      badges,
      streakFreezes,
      updateStreak,
      addXP,
      addGems,
      useStreakFreeze,
      addBadge
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