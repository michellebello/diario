import { CirclePlus } from "lucide-react";
import "../../../components/styles/add-button.css";

function AddButton({ text, onClick }) {
  return (
    <div className="add-button-container">
      <button className="add-button" onClick={onClick}>
        {text}
        <CirclePlus />
      </button>
    </div>
  );
}

export default AddButton;
