import React from "react";
import "../styles/labelInputForm.css";

function LabelInputForm({
  label,
  name,
  type,
  value,
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
          className="inputForm"
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {children && <div className="inputAddon">{children}</div>}
      </div>
    </div>
  );
}

export default LabelInputForm;
