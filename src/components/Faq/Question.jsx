import { useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';


const Question = ({question,answer,index}) => {

     const init  = index % 2 == 0;

    const[status,setStatus] = useState(init);

    return (
        <>
            <div className="flex flex-col cursor-pointer ">
                <div className="flex justify-between " onClick={() => setStatus((prev)=>(!prev))}>
                <div className="flex gap-2 md:items-center font-semibold" ><span>{`${index+1}.`}</span> <h2 className="cursor-pointer">{question}</h2></div>
                 <span className="text-[var(--secondarytext)] pl-4">{!status && <AddIcon/>}</span>
                </div>
                <p className={status == true ? "text-sm text-[var(--secondarytext)]  w-full pl-4" : "hidden"}>{answer}</p>
            </div>
        </>
    )

}


export default Question;
