import { useState } from "react";

export default function Input({ type, id, placeholder, ariaLabel, onChange }) {
  const [value, setValue] = useState("");

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        setValue(val);
        if (onChange) onChange(val);
      }}
    />
  );
}
