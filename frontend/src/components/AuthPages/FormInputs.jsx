import React from "react";
const FormInputs = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  touched,

}) => (
  <input

    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    className={`w-full p-2 rounded border transition ${
      touched && !value
        ? "border-red-500"
        : touched && value
          ? "border-green-500"
          : "border-gray-300"
    }`}
  />
);

export default FormInputs;
