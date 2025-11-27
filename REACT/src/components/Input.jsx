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
        setValue(e.target.value);
        if (onChange) onChange(e);
      }}
    />
  );
}
