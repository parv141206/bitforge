"use client";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  ReactElement,
} from "react";

interface ThemeContextInterface {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
