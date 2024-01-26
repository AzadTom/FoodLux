import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from "../../components/Theme/ThemeProvider";

const ThemeButton =()=>{


   

    const {theme,toggletheme}= useTheme();


    const changeMode =()=>{

   
        toggletheme();

    }

    return(
        <>
         <span className='hidden  fixed  m-4 right-0 bottom-4 bg-[var(--neutral)] sm:flex flex-col justify-center items-center px-4 py-2 w-12 h-12 rounded-[50%]  cursor-pointer border border-[var(--primarycolor)]' id='mode' onClick={changeMode}>
        {theme?(<LightModeIcon/>):(<DarkModeIcon/>)}
        </span>
        </>
    )
}


export default ThemeButton;

