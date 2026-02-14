/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "./reusables/buttons/TextButton.jsx";
import { CurrBudgetCard } from "./reusables/cards/CurrBudgetCard.jsx";
import BudgetCard from "./reusables/cards/BudgetCard.jsx";
import { useAppContext } from "../contexts/context.jsx";
import "../components/styles/budgets.css";
import Network from "../utils/network.js";

function Budgets() {
  const navigate = useNavigate();
  const network = new Network();
  const budgets = useAppContext().userInfo.budgets;

  const displayBudgets = budgets.slice(1);

  const [budgetSpents, setBudgetSpents] = useState([]);

  const getBudgetSpentAmount = async () => {
    const spentAmounts = [];
    for (let i = 0; i < budgets.length; i++) {
      const budgetId = budgets[i].id;
      const response = await network.get(`/budgets/${budgetId}/spent`);
      spentAmounts.push(response.data);
    }
    setBudgetSpents(spentAmounts);
  };

  useEffect(() => {
    getBudgetSpentAmount();
  }, [budgets]);

  const goToBudgetPage = (budget) => {
    navigate(`/mycuenta/budgets/${budget.id}`, {
      state: {
        budgetId: budget.id,
        budgetMonth: budget.monthNumber,
        budgetYear: budget.year,
        budgetTotal: budget.totalAmount,
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
          onClick={() => alert("Create new budget")}
        />
      </div>
      <div className="curr-budget-container">
        <CurrBudgetCard
          currDate={currDate}
          currAmount={budgetSpents[0] || 0}
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
              spent={budgetSpents[2]}
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
