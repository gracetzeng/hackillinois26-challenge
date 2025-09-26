"use client";
import React from "react";
import "../styles/NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="/logo.png" />
        </a>
      </div>

      <div className="navbar-links">
        <a href="#" className="nav-link active">
          Schedule
        </a>
        <a href="#" className="nav-link">
          FAQ
        </a>
        <a href="#" className="nav-link">
          Judges
        </a>
        <a href="#" className="nav-link">
          Prizes
        </a>
      </div>
    </nav>
  );
};