import TextButton from "./reusables/buttons/TextButton.jsx";
import { CurrBudgetCard } from "./reusables/cards/CurrBudgetCard.jsx";
import BudgetCard from "./reusables/cards/BudgetCard.jsx";
import { useAppContext } from "../contexts/context.jsx";
import "../components/styles/budgets.css";

function Budgets() {
  const currMonth = new Date().toLocaleString("default", { month: "long" });
  const currYear = new Date().getFullYear();
  const currDate = `${currMonth} ${currYear}`;

  const budgets = useAppContext().userInfo.budgets;
  const displayBudgets = budgets.slice(1, budgets.length);
  const currBudget = budgets.find(
    (budget) =>
      budget.monthNumber === new Date().getMonth() + 1 &&
      budget.year === new Date().getFullYear(),
  );

  return (
    <div className="budgets-content">
      <div className="budgets-top-part">
        <p className="title">My budgets</p>
        <TextButton
          text="Create new budget"
          bgColor="#5154a1ff"
          fontColor="#ffffff"
          onClick={() => alert("Create new budget")}
        />
      </div>
      <div className="curr-budget-container">
        <CurrBudgetCard
          currDate={currDate}
          currAmount={5089.98}
          currTotal={currBudget?.totalAmount || 0}
        />
      </div>
      <div className="all-budgets-container">
        <p className="all-budgets-title">Previous budgets</p>
        <div className="all-budgets-div">
          {displayBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              month={budget.monthNumber}
              year={budget.year}
              // spent={budget.spent}
              total={budget.totalAmount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budgets;
