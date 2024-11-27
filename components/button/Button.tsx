'use client'

/* Button */
function Button({text, classProps}:{text:string, classProps:string}) {
    return <button className={`w-full h-[55px] bg-[#2BD17E] rounded-[10px] ${classProps} font-semibold`}>{text}</button>
}

export default Button