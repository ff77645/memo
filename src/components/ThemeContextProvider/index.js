import React,{
  createContext,
  useState,
} from "react";
import {Appearance} from "react-native";
import light from "./colors/light";
import dark from "./colors/dark";

const common = {
  black:'#000',
  white:'#fff',
}

const colors = {
  light:{...common,...light},
  dark:{...common,...dark},
}

export const ThemeContext = createContext();
export default function ThemeContextProvider({children}){
  // const [theme,changeTheme] = useState(Appearance.getColorScheme() || 'light')
  const [theme,changeTheme] = useState('dark')
  return (
    <ThemeContext.Provider value={{
      theme,
      changeTheme,
      color:colors[theme],
    }}>
      {children}
    </ThemeContext.Provider>
  )
}