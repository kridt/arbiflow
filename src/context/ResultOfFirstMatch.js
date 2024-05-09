import React, { useState, createContext } from "react";

// Opretter context
const CombinationContext = createContext();

// Provider-komponent, der eksporterer context med state og funktioner til at opdatere state
function CombinationProvider({ children }) {
  const [combinationData, setCombinationData] = useState({
    best_combination: [],
    min_return: 0,
    returns_per_outcome: [0, 0, 0],
  });

  // Funktion til at opdatere kombinationsdata
  const updateCombinationData = (newData) => {
    setCombinationData(newData);
  };

  return (
    <CombinationContext.Provider
      value={{ combinationData, updateCombinationData }}
    >
      {children}
    </CombinationContext.Provider>
  );
}

export { CombinationContext, CombinationProvider };
