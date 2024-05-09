import React from "react";
import "./LoadingOverlay.css"; // Sørg for at denne fil eksisterer og er linket korrekt

const LoadingOverlay = () => {
  return (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
