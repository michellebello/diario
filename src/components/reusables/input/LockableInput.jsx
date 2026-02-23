import "../../../components/styles/lockable-input.css";
export function LockableInput({
  isLocked,
  type,
  dropdownOptions,
  value,
  onChange,
}) {
  return (
    <div className="lockable-input-container">
      {type !== "text" ? (
        dropdownOptions.length > 0 && (
          <select
            className="lockable-input-dropdown"
            value={value}
            onChange={onChange}
            disabled={isLocked}
          >
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      ) : (
        <input
          className="lockable-input-input"
          type="text"
          value={value}
          onChange={onChange}
          disabled={isLocked}
        />
      )}
    </div>
  );
}
