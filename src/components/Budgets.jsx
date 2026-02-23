/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import TextButton from "./reusables/buttons/AddButton.jsx";
import { CurrBudgetCard } from "./reusables/cards/CurrBudgetCard.jsx";
import BudgetCard from "./reusables/cards/BudgetCard.jsx";
import { useAppContext } from "../contexts/context.jsx";
import "../components/styles/budgets.css";

function Budgets() {
  const navigate = useNavigate();
  const budgets = useAppContext().userInfo.budgets;
  const displayBudgets = budgets.slice(1);

  const goToBudgetPage = (budget) => {
    navigate(`/mycuenta/budgets/${budget.id}`, {
      state: {
        budgetId: budget.id,
        budgetMonth: budget.monthNumber,
        budgetYear: budget.year,
        budgetTotal: budget.totalAmount.toFixed(2),
        budgetSpent: budget.totalSpent.toFixed(2),
      },
    });
  };

  const currMonth = new Date().toLocaleString("default", { month: "long" });
  const currYear = new Date().getFullYear();
  const currDate = `${currMonth} ${currYear}`;

  return (
    <div className="budgets-content">
      <div className="budgets-top-part">
        <p className="title">My budgets</p>
        <TextButton
          text="Create new budget"
          bgColor="#5154a1ff"
          fontColor="#ffffff"
          onClick={() => navigate("/mycuenta/budgets/create-budget")}
        />
      </div>
      <div className="curr-budget-container">
        <CurrBudgetCard
          currDate={currDate}
          currAmount={budgets[0]?.totalSpent || 0}
          currTotal={budgets[0]?.totalAmount || 0}
          onClick={() => goToBudgetPage(budgets[0])}
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
              spent={budget.totalSpent}
              total={budget.totalAmount}
              onClick={() => goToBudgetPage(budget)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budgets;
