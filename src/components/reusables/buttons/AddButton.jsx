import { CirclePlus } from "lucide-react";
import "../../../components/styles/add-button.css";

function AddButton({ type, text, onClick }) {
  return (
    <div className="add-button-container">
      <button
        type={type}
        className={`add-button ${text === "" ? `no-text` : ""}`}
        onClick={onClick}
      >
        {text}
        <CirclePlus />
      </button>
    </div>
  );
}

export default AddButton;
