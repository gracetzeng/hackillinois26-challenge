import React, { useState, useEffect } from "react";
import "../styles/Buttons.css";

type FilterButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

export const FilterButton: React.FC<FilterButtonProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      className={`filter-button ${isSelected ? "filter-button-selected" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};