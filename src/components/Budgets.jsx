/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "./reusables/buttons/AddButton.jsx";
import { CurrBudgetCard } from "./reusables/cards/CurrBudgetCard.jsx";
import BudgetCard from "./reusables/cards/BudgetCard.jsx";
import { useAppContext } from "../contexts/context.jsx";
import NewBudget from "../components/reusables/new-budget/NewBudget.jsx";
import EmptyBodyCard from "./reusables/cards/EmptyBodyCard.jsx";
import Network from "../utils/network.js";
import { useUserData } from "../data/user/fetchAndSaveUserData.js";
import "../components/styles/budgets.css";

function Budgets() {
  const currMonth = new Date().toLocaleString("default", { month: "long" });
  const currMonthNum = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();
  const currDate = `${currMonth} ${currYear}`;

  const navigate = useNavigate();
  const budgets = useAppContext().userInfo.budgets;

  let currBudget = budgets.find(
    (budget) => budget.year === currYear && budget.monthNumber === currMonthNum,
  );
  let currBudgetExists = true;

  if (!currBudget) {
    currBudgetExists = false;
  }

  let displayBudgets;
  if (budgets.length > 1) {
    displayBudgets = budgets.filter(
      (budget) =>
        !(budget.year === currYear && budget.monthNumber === currMonthNum),
    );
  }

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

  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const showAddBudgetForm = () => {
    setAddFormVisibility((prev) => !prev);
  };

  return (
    <div className="budgets-content">
      <div className="budgets-top-part">
        <p className="title">My budgets</p>
        <TextButton
          text="Create new budget"
          bgColor="#5154a1ff"
          fontColor="#ffffff"
          onClick={showAddBudgetForm}
        />
      </div>
      {budgets.length > 0 ? (
        <>
          <div className="curr-budget-container">
            {currBudgetExists ? (
              <CurrBudgetCard
                currBudgetId={currBudget.id}
                currDate={currDate}
                currAmount={currBudget.totalSpent}
                currTotal={currBudget.totalAmount || 0}
                viewBudget={() => goToBudgetPage(currBudget)}
              />
            ) : (
              <p className="no-curr-budget"> No current budget</p>
            )}
          </div>
          <div className="all-budgets-container">
            <p className="all-budgets-title">Other budgets</p>
            <div className="all-budgets-div">
              {displayBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budgetId={budget.id}
                  month={budget.monthNumber}
                  year={budget.year}
                  spent={budget.totalSpent}
                  total={budget.totalAmount}
                  onClick={() => goToBudgetPage(budget)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <EmptyBodyCard
          type="budget"
          isAccount={false}
          showAddFormFunction={() => setAddFormVisibility(true)}
        />
      )}

      {addFormVisibility && <NewBudget onCancel={showAddBudgetForm} />}
    </div>
  );
}

export default Budgets;
