import ProgressBar from "@ramonak/react-progress-bar";
import { monthNumToMonthName } from "../../../data/aux/MonthNumToName.js";
import { CircleAlert } from "lucide-react";

export default function BudgetCard({ month, year, spent, total, onClick }) {
  const monthName = monthNumToMonthName[month];
  const percent = (spent / total) * 100;
  const isOverBudget = spent > total;
  return (
    <div className="budget-card-total">
      <div className="budget-card-div">
        <p className="budget-card-date">
          {monthName} {year}
        </p>
        <ProgressBar
          completed={percent}
          bgColor="#d8d8f4c1"
          baseBgColor="#4b438b"
          height="10px"
          isLabelVisible={false}
        />
        <div className="budget-card-bottom-div">
          <p
            className={`budget-card-amounts ${isOverBudget ? "over-budget" : ""}`}
          >
            ${spent} spent out of ${total}
          </p>
          {isOverBudget && (
            <div className="over-budget-div">
              <CircleAlert size={20} color="#e26376c1" />
            </div>
          )}
        </div>
      </div>
      <button onClick={onClick} className="go-to-budget-button">
        View budget
      </button>
    </div>
  );
}
