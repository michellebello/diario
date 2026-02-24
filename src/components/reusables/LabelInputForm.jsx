import React from "react";
import "../styles/labelInputForm.css";

function LabelInputForm({
  inputType,
  dropdownOptions,
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
        {inputType !== "input" && dropdownOptions ? (
          <select
            id="entry-account"
            name={name}
            type={type}
            className="inputForm"
            value={value}
            onChange={onChange}
          >
            {dropdownOptions.map(([optionKey, optionVal]) => (
              <option key={optionKey} value={optionKey}>
                {optionVal}
              </option>
            ))}
          </select>
        ) : (
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
        )}
        {children && <div className="inputAddon">{children}</div>}
      </div>
    </div>
  );
}

export default LabelInputForm;
