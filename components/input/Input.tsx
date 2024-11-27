'use client'

//defined props for the input
interface InputProps {
    type: string;           // Input type (e.g., text, email, password)
    inputId: string;        // Unique ID for the input
    classProps?: string;    // Optional additional classes for styling
    label: string;          // Label text for the input
}

/* Rectangle */

function Input({type, inputId, classProps,label}:InputProps) {
    return <div className="relative w-full">
        <input
            type={type}
            id={inputId}
            className={`peer w-full height-[45px] mb-5 p-3 bg-[#224957] border border-[#224957] rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-transparent placeholder-transparent ${classProps}`}
            placeholder={label} // Placeholder required for floating effect
        />

        <label
            htmlFor={inputId}
            className="absolute left-3 top-1 text-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
        >
            {label}
        </label>
    </div>

}

// /* Email */
//
// position: absolute;
// width: 40px;
// height: 24px;
// left: 40px;
// top: 402px;
//
// /* Body/small */
// font-family: 'Montserrat';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 24px;
// /* identical to box height, or 171% */
// text-align: center;
//
// color: #FFFFFF;



export default Input


