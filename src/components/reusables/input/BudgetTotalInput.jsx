import "../../styles/budget-total-input.css";
export function BudgetTotalInput({
  className,
  type,
  value,
  onChange,
  onClick,
}) {
  return (
    <div className="budget-total-input-container">
      <input
        type={type}
        className={`budget-total-input-field ${className}`}
        value={value}
        onChange={onChange}
      />
      <button className="budget-total-input-button" onClick={onClick}>
        Save
      </button>
    </div>
  );
}
