import "../../../components/styles/budget-reusables.css";
import IconButton from "../buttons/IconButton";
import { BudgetTotalInput } from "../input/BudgetTotalInput.jsx";
import { TrendingUp, TrendingDown, TriangleAlert } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import Network from "../../../utils/network";
import { useState } from "react";

const budgetPercentToIcon = (percent) => {
  if (percent < 51) {
    return TrendingDown;
  } else if (percent > 100) {
    return TriangleAlert;
  } else {
    return TrendingUp;
  }
};

const getIconColor = (Icon) => {
  if (Icon === TrendingDown) {
    return "#6bbe7eff";
  } else if (Icon === TrendingUp) {
    return "#f4c119ff";
  } else {
    return "#e92424ff";
  }
};

export function BudgetCategories({
  id,
  budgetId,
  category,
  total,
  spent,
  setDeleteMessageVisibility,
  setAllocationIdToDelete,
}) {
  const network = new Network();
  const percent = ((spent / total) * 100).toFixed(0, 2);
  const remaining = (total - spent).toFixed(2);
  let overBudget = false;
  if (remaining < 0) {
    overBudget = true;
  }

  const Icon = budgetPercentToIcon(percent);

  const [newAmount, setNewAmount] = useState(total);
  const [isEditing, setIsEditing] = useState(false);

  const updateBudgetAllocation = async (newAmount) => {
    const amount = parseFloat(newAmount);
    if (!amount) return;
    console.log("new amount sent: " + amount);
    const newAmountObj = { amount: amount };
    const response = await network.patch(
      `/budgets/${budgetId}/${id}`,
      newAmountObj,
    );
    if (response.status === 200) {
      setIsEditing(false);
      window.location.reload();
    } else {
      console.error("Error updating budget category");
    }
  };

  const handleDeleteClick = () => {
    setAllocationIdToDelete(id);
    setDeleteMessageVisibility(true);
  };

  return (
    <div className="budget-category-total">
      <div className="budget-category-top-row">
        <div className="budget-category-top-info">
          <div className="budget-category-top-left-part">
            <Icon color={getIconColor(Icon)} />
            <p className="budget-category-title">{category}</p>
          </div>
          <div className="budget-category-top-buttons">
            <IconButton
              type="edit"
              color="#797575"
              onClick={() => setIsEditing((prev) => !prev)}
            />
            <IconButton
              type="delete"
              color="#797575"
              onClick={handleDeleteClick}
            />
          </div>
        </div>
        <div className="budget-category-money-container">
          <p className="budget-category-money">{`$${spent}`}</p>
          <p className="budget-category-money">of</p>
          {isEditing ? (
            <BudgetTotalInput
              className="budget-total-input"
              value={newAmount}
              type="text"
              onChange={(e) => setNewAmount(e.target.value)}
              onClick={() => updateBudgetAllocation(newAmount)}
            />
          ) : (
            <p className="budget-category-money">{`$${total}`}</p>
          )}
        </div>
      </div>
      <ProgressBar
        completed={percent}
        bgColor="#babaeac1"
        baseBgColor="#eeedf6ff"
        height="10px"
        isLabelVisible={false}
      />
      <div className="budget-category-bottom">
        <p
          className={overBudget ? "over-budget" : "on-budget"}
        >{`${percent}% used`}</p>
        <p className={overBudget ? "over-budget" : "on-budget"}>
          {overBudget ? `$${remaining * -1} ` : `$${remaining} `}{" "}
          {overBudget ? "over" : "left"}{" "}
        </p>
      </div>
    </div>
  );
}
