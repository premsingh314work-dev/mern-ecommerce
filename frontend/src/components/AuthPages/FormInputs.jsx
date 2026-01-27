import React from "react";

const FormInputs = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  touched,
  isValid // New prop for logic-based validation
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    className={`w-full p-2 rounded border transition outline-none ${
      touched 
        ? (isValid ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") 
        : "border-gray-300 focus:border-amber-500"
    }`}
  />
);

export default FormInputs;