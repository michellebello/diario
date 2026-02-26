import { TrashIcon } from "lucide-react";
import "../../styles/lockable-input.css";

function BudgetCategoryRow({
  category,
  input,
  categoryList,
  onCategoryChange,
  onInputChange,
  onDelete,
}) {
  return (
    <div className="create-budget-allocation-container">
      <div className="create-budget-allocation-left">
        <select
          className="lockable-input-dropdown"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option>Select</option>
          {categoryList.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="create-budget-allocation-right">
        <input
          className="lockable-input-input"
          type="number"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button
          type="button"
          onClick={onDelete}
          className="create-budget-delete-allocation-row-button"
        >
          <TrashIcon size="clamp(0.8rem, 1vw, 1.2rem)" />
        </button>
      </div>
    </div>
  );
}

export default BudgetCategoryRow;
