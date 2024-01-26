import { createContext, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";


const themeContext = createContext();

export const ThemeProvider =({children})=>{



     const[isDarkMode,setIsDarkMode] = useState(false);


     const toggletheme  = ()=>{


        setIsDarkMode((prev)=>(!prev));

     }


     const theme = isDarkMode ? "dark":"light";


     useEffect(()=>{

        document.documentElement.setAttribute("data-theme",theme);
        
     },[isDarkMode])




    return(<themeContext.Provider value={{theme,toggletheme}}>{children}</themeContext.Provider>)



}



export const useTheme = ()=> useContext(themeContext);