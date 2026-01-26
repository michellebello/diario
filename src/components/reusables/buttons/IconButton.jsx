import { Pencil, Trash2 } from "lucide-react";
import "../../styles/edit-button.css";

function IconButton({ type, color, onClick }) {
  return (
    <div className="edit-button-container">
      <button className="edit-button" onClick={onClick}>
        {type === "delete" ? (
          <Trash2 color={color} width="1rem" height="1rem" />
        ) : (
          <Pencil color={color} width="1rem" height="1rem" />
        )}
      </button>
    </div>
  );
}

export default IconButton;
