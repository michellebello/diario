import { CATEGORY_LIST } from "../../../data/aux/CategoryList";
import "../../../components/styles/edit-input.css";

function OptionInput({ type, value, onChange }) {
  return (
    <div className="edit-input-container">
      {type !== "not-cat" ? (
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
      ) : (
        <select
          name="type"
          id="categories-option"
          className="edit-input-tag"
          value={value}
          onChange={onChange}
        >
          <option key={true} value={true}>
            Taxable
          </option>
          <option key={false} value={false}>
            Not taxable
          </option>
        </select>
      )}
    </div>
  );
}

export default OptionInput;
