import { useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';


const Question = ({question,answer}) => {

    const[status,setStatus] = useState(false);

    return (
        <>
            <div className="flex flex-col ">
                <div className="flex justify-between cursor-pointer" onClick={() => setStatus((prev)=>(!prev))}>
                <div className="flex gap-2 md:items-center font-semibold" ><span><CircleIcon/></span> <h2>{question}</h2></div>
                 <span className="text-[var(--secondarytext)] pl-4">{!status && <AddIcon/>}</span>
                </div>
                <p className={status == true ? "text-sm text-[var(--secondarytext)]  w-full pl-4" : "hidden"}>{answer}</p>
            </div>
        </>
    )

}


export default Question;
