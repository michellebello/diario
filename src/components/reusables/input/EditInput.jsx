import "../../../components/styles/edit-input.css";

function EditInput({ value, inputType, inputName, onChange }) {
  return (
    <div className="edit-input-container">
      <input
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
