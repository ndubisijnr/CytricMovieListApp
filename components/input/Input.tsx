"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import {isFunction} from "node:util";

// Define props for the input, including a `name` prop
interface InputProps {
  type: string; // Input type (e.g., text, email, password)
  inputId: string; // Unique ID for the input
  classProps?: string; // Optional additional classes for styling
  label: string; // Label text for the input
  value: string; // Input value
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Change event handler
  error?: string; // Optional error message to display
  name: string; // Name of the input (used for form data)
}

/* Rectangle */
function Input({
  type,
  inputId,
  classProps,
  label,
  value,
  onChange,
  error,
  name,
}: InputProps) {
    const [visible, setVisible] = useState(false);
    // function  togglePasswordVisibility() {
    //   setVisible(!visible);
    // }

    return (
    <div className="relative w-full mb-5">
      <input
        type={visible ? "text" :  type}
        id={inputId}
        name={name} // Name is important for form handling
        className={`peer w-full h-[45px]  p-3 bg-[#224957] border ${
          error ? "border-red-500" : "border-[#224957]"
        } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-transparent placeholder-transparent ${classProps}`}
        placeholder={label} // Placeholder required for floating effect
        value={value}
        onChange={onChange}
      />
        {/* Toggle Icon */}
      {type === "password" ?
        <button
            onClick={() => setVisible(!visible)}
            type="button"
            className="text-gray-500 hover:text-gray-700 transition absolute right-3 top-3"
        >
            {visible ? <FaEyeSlash size={20} color={'white'} /> : <FaEye size={20} color={'white'}/>}
        </button>
      :

      <></>}

      <label
        htmlFor={inputId}
        className="absolute left-3 top-0 text-white text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
      >
        {label}
      </label>

      {/* Show error message if provided */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default Input;
