function DropdownFilters({ id, value, onChange, defaultText, options }) {
  return (
    <div className="lockable-input-container">
      <select
        id={id}
        className="lockable-input-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>{defaultText}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownFilters;
