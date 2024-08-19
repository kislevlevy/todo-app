// Imports:
import { createContext, useState } from "react";

// Context initiation:
const ThemeContext = createContext();

///////////////////////////////////////////////////
// Provider
export function ThemeProvider({ children }) {
  // State veriables:
  const [themeValue, setThemeValue] = useState("light");

  // Set provider veriables:
  const globalVariables = { themeValue, setThemeValue };

  // Return Provider:
  return (
    <ThemeContext.Provider value={globalVariables}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeContext;
