import React from "react";
import "../styles/labelInputForm.css";

function LabelInputForm({
  label,
  name,
  type,
  value,
  autocomplete,
  onChange,
  children,
  ...rest
}) {
  return (
    <div className="duoLabelInput">
      <label className="labelForm" htmlFor={name}>
        {label}
      </label>
      <div className="inputContainer">
        <input
          id={name}
          className="inputForm"
          name={name}
          type={type}
          value={value}
          autoComplete={autocomplete}
          onChange={onChange}
          {...rest}
        />
        {children && <div className="inputAddon">{children}</div>}
      </div>
    </div>
  );
}

export default LabelInputForm;
