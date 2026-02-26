import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import DeleteConfirmationForm from "../forms/DeleteConfirmationForm.jsx";
import { monthNumToMonthName } from "../../../data/aux/MonthNumToName.js";
import { CircleAlert, TrashIcon } from "lucide-react";
import Network from "../../../utils/network.js";
import { useUserData } from "../../../data/user/fetchAndSaveUserData.js";

export default function BudgetCard({
  budgetId,
  month,
  year,
  spent,
  total,
  onClick,
}) {
  const network = new Network();
  const fetchUserData = useUserData();
  const [deleteFormVisibilility, setDeleteFormVisibility] = useState(false);
  const monthName = monthNumToMonthName[month];
  const percent = (spent / total) * 100;
  const isOverBudget = spent > total;

  const deleteBudget = async () => {
    console.log("selected budget id is " + budgetId);
    const response = await network.delete(`/budgets/${budgetId}`);
    console.log(response.data);
    if (response.status === 200) {
      await fetchUserData();
    } else {
      console.log("ughh");
    }
  };
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
      <div className="right-buttons">
        <button onClick={onClick} className="go-to-budget-button">
          View budget
        </button>
        <button
          type="button"
          onClick={() => setDeleteFormVisibility((prev) => !prev)}
          className="delete-budget-button"
        >
          <TrashIcon size="clamp(0.8rem, 1vw, 1.2rem)" />
        </button>
      </div>
      {deleteFormVisibilility && (
        <DeleteConfirmationForm
          deletingObject="budget"
          deleteFunction={() => deleteBudget(budgetId)}
          closeForm={() => setDeleteFormVisibility((prev) => !prev)}
        />
      )}
    </div>
  );
}
