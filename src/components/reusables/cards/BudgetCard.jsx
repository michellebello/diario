import ProgressBar from "@ramonak/react-progress-bar";
import { CircleAlert } from "lucide-react";

export default function BudgetCard({ month, year, spent, total }) {
  const monthNumToMonthName = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
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
      <button
        onClick={() => alert("View budget")}
        className="go-to-budget-button"
      >
        View budget
      </button>
    </div>
  );
}
