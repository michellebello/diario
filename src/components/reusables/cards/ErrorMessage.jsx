import { TriangleAlert } from "lucide-react";
import "../../styles/error-message.css";

export function ErrorMessage({ message }) {
  return (
    <div className="error-div">
      <TriangleAlert color=" #b17474" size="clamp(0.85rem, 1.1vw, 0.95rem)" />
      <p className="create-budget-error-message">{message}</p>
    </div>
  );
}
