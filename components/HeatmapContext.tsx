import React, { createContext, useContext, useState, ReactNode } from 'react';

type HeatmapContextType = {
  active: boolean;
  setActive: (active: boolean) => void;
};

const HeatmapContext = createContext<HeatmapContextType | undefined>(undefined);

export function HeatmapProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <HeatmapContext.Provider value={{ active, setActive }}>
      {children}
    </HeatmapContext.Provider>
  );
}

export function useHeatmap() {
  const context = useContext(HeatmapContext);
  if (context === undefined) {
    throw new Error('useHeatmap must be used within a HeatmapProvider');
  }
  return context;
}