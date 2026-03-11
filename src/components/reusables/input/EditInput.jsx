import "../../../components/styles/edit-input.css";

function EditInput({ placeholder, value, inputType, inputName, onChange }) {
  return (
    <div className="edit-input-container">
      <input
        placeholder={placeholder}
        className="edit-input-tag"
        type={inputType}
        name={inputName}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EditInput;
