import { Pencil, Trash2 } from "lucide-react";
import "../../styles/edit-button.css";

function IconButton({ type, color, onClick }) {
  return (
    <div className="edit-button-container">
      <button className="edit-button" onClick={onClick}>
        {type === "delete" ? (
          <Trash2 color={color} size="clamp(0.8rem, 1.2vw, 1.1rem)" />
        ) : (
          <Pencil color={color} size="clamp(0.8rem, 1.2vw, 1.1rem)" />
        )}
      </button>
    </div>
  );
}

export default IconButton;
