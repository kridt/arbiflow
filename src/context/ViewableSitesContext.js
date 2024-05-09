import React, { createContext, useState, useContext } from "react";

// Opretter contexten
const ViewableSitesContext = createContext();

// Opretter en Provider komponent
export const ViewableSitesProvider = ({ children, initialSites }) => {
  const [viewableSites, setViewableSites] = useState(initialSites);

  return (
    <ViewableSitesContext.Provider value={{ viewableSites, setViewableSites }}>
      {children}
    </ViewableSitesContext.Provider>
  );
};

// Hook for at bruge context i en anden komponent
export const useViewableSites = () => useContext(ViewableSitesContext);
