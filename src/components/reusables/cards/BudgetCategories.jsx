import "../../../components/styles/budget-reusables.css";
import IconButton from "../buttons/IconButton";
import { TrendingUp, TrendingDown, TriangleAlert } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";

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

export function BudgetCategories({ category, total, spent }) {
  const percent = ((spent / total) * 100).toFixed(0, 2);
  const remaining = total - spent;
  let overBudget = false;
  if (remaining < 0) {
    overBudget = true;
  }

  const Icon = budgetPercentToIcon(percent);
  const dummyFx = () => {
    console.log("hola");
  };
  return (
    <div className="budget-category-total">
      <div className="budget-category-top-row">
        <div className="budget-category-top-left-part">
          <Icon color={getIconColor(Icon)} />
          <div className="budget-category-top-info">
            <p className="budget-category-title">{category}</p>
            <p className="budget-category-money">{`$${spent} out of $${total}`}</p>
          </div>
        </div>
        <div className="budget-category-top-buttons">
          <IconButton type="edit" color="#797575" onClick={dummyFx} />
          <IconButton type="delete" color="#797575" onClick={dummyFx} />
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
