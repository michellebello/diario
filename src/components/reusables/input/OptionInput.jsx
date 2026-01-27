import { CATEGORY_LIST } from "../../../data/aux/CategoryList";
import "../../../components/styles/edit-input.css";

function OptionInput({ value, onChange }) {
  return (
    <div className="edit-input-container">
      <select
        name="type"
        id="categories-option"
        className="edit-input-tag"
        value={value}
        onChange={onChange}
      >
        {CATEGORY_LIST.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OptionInput;
