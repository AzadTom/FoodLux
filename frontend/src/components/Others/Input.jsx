

const Input = ({type,label,name,value,onchange,onfocus,error})=>{

    return(
        <>
        <div className="flex flex-col gap-2">
            <span>{label}</span>
            <input type={type}  name={name} value={value} onChange={onchange} onFocus={onfocus}  className="w-full px-4 py-2 mb-4 bg-[var(--primarycolor)]  border  rounded-md border-[var(--border)]" required/>
            {error&&(<span className="text-red-600 text-sm w-[200px]">{error}</span> )}
        </div>
       
        </>
    )
}

export default Input;