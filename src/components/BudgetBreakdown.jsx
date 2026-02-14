/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { monthNumToMonthName } from "../data/aux/MonthNumToName";
import Network from "../utils/network";
import { BudgetTopCards } from "./reusables/cards/BudgetTopCards";
import { BudgetCategories } from "./reusables/cards/BudgetCategories";

import "../components/styles/budget-breakdown.css";

function BudgetBreakdown() {
  const network = new Network();
  const { state } = useLocation();
  const { budgetId } = useParams();
  const [budgetData, setBudgetData] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState(state ?? null);

  const getBudgetBreakdownData = async (budgetId) => {
    const response = await network.get(`/budgets/${budgetId}/allocations`);
    console.log("getting: " + response.data);
    setBudgetData(response.data);
  };

  useEffect(() => {
    getBudgetBreakdownData(budgetId);
  }, [budgetId, budgetInfo]);

  const {
    budgetMonth: month,
    budgetYear: year,
    budgetTotal: totalAmount,
  } = budgetInfo ?? {};

  return (
    <div className="budgets-content">
      <div className="budgets-top">
        <p className="title">{`Budget Breakdown: ${monthNumToMonthName[month]} ${year}`}</p>
      </div>
      <div className="budget-cards-container">
        <BudgetTopCards
          cardTitle="Total Budgeted"
          amount={`$${totalAmount}`}
          amountColor="#000000"
        />
        <BudgetTopCards
          cardTitle="Total spent"
          amount="$3532.87"
          amountColor="#000000"
        />
        <BudgetTopCards
          cardTitle="Remaining"
          amount="$4567.13"
          amountColor="#000000"
        />
      </div>
      <div className="budget-categories-total-body">
        <div className="budget-categories-container">
          {budgetData.map((budget, idx) => (
            <BudgetCategories
              key={idx}
              category={budget.category}
              spent={200}
              total={budget.amount}
            />
          ))}
        </div>
        <div className="budget-categories-breakdown-chart-container">
          <p>Remaining</p>
        </div>
      </div>
    </div>
  );
}

export default BudgetBreakdown;
