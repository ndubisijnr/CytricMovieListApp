'use client'

interface  ButtonProps {
    classProps?: string; // Optional className for flexibility
    text: string;        // Text to display inside the button
    clickEvt?: () => void; // Optional click event handler
}
/* Button */
function Button({text, classProps, clickEvt}:ButtonProps) {
    return <button onClick={clickEvt} className={`w-full h-[55px] bg-[#2BD17E] rounded-[10px] ${classProps} font-semibold`}>{text}</button>
}

export default Button