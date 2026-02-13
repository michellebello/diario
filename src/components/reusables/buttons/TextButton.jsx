import { CirclePlus } from "lucide-react";
import "../../../components/styles/text-button.css";

function TextButton({ text, onClick }) {
  return (
    <div className="text-button-container">
      <button
        className="text-button"
        onClick={onClick}
        style={{
          fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
        }}
      >
        {text}
        <CirclePlus />
      </button>
    </div>
  );
}

export default TextButton;
