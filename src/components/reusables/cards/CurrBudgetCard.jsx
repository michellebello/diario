import { ChevronRight } from "lucide-react";
import "../../../components/styles/budget-reusables.css";

export function CurrBudgetCard({ currDate, currAmount, currTotal }) {
  return (
    <div className="curr-budget-top-card-total">
      <div className="curr-budget-div">
        <p className="curr-budget-date">{currDate} (current)</p>
        <p className="curr-budget-amounts">
          ${currAmount} / ${currTotal}
        </p>
      </div>
      <button
        onClick={() => alert("View budget")}
        className="view-budget-button"
      >
        View budget
        <ChevronRight />
      </button>
    </div>
  );
}
