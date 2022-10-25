import React, { createContext } from "react";

export const themes = {
  dark: {
    color: "#fff",
    background: "#333",
  },
  light: {
    color: "#333",
    background: "#fff",
  },
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;
