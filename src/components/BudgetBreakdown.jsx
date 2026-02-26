/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { monthNumToMonthName } from "../data/aux/MonthNumToName";
import Network from "../utils/network";
import { BudgetTopCards } from "./reusables/cards/BudgetTopCards";
import { BudgetCategories } from "./reusables/cards/BudgetCategories";
import ReBarchart from "./reusables/data-charts/ReBarchart";
import DeleteConfirmationForm from "../components/reusables/forms/DeleteConfirmationForm";

import "../components/styles/budget-breakdown.css";

function BudgetBreakdown() {
  const network = new Network();
  const { state } = useLocation();
  const { budgetId } = useParams();
  const [budgetData, setBudgetData] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState(state ?? null);

  const getBudgetBreakdownData = async (budgetId) => {
    const response = await network.get(`/budgets/${budgetId}/allocations`);
    console.log("budget info " + JSON.stringify(response.data));
    setBudgetData(response.data);
  };

  useEffect(() => {
    getBudgetBreakdownData(budgetId);
  }, [budgetId, budgetInfo]);

  const {
    budgetMonth: month,
    budgetYear: year,
    budgetTotal: totalAmount,
    budgetSpent: totalSpent,
  } = budgetInfo ?? {};

  const [deleteMessageVisibility, setDeleteMessageVisibility] = useState(false);
  const [allocationIdToDelete, setAllocationIdToDelete] = useState(null);

  const deleteBudgetAllocation = async () => {
    const response = await network.delete(
      `/budgets/${budgetId}/${allocationIdToDelete}`,
    );
    if (response.status === 200) {
      setDeleteMessageVisibility(false);
      window.location.reload();
    } else {
      console.error("Error deleting budget category");
    }
  };
  return (
    <div className="budgets-content">
      <div className="budgets-top">
        <p className="title">{`Budget Breakdown: ${monthNumToMonthName[month]} ${year}`}</p>
      </div>
      {/* confirm delete account message */}
      {deleteMessageVisibility && (
        <DeleteConfirmationForm
          deletingObject="budget allocation"
          deleteFunction={() => deleteBudgetAllocation(allocationIdToDelete)}
          closeForm={() => setDeleteMessageVisibility(false)}
        />
      )}
      <div className="budget-cards-top">
        <div className="budget-cards-container">
          <BudgetTopCards
            cardTitle="Total Budgeted"
            amount={`$${totalAmount}`}
            amountColor="#000000"
          />
          <BudgetTopCards
            cardTitle="Total spent"
            amount={`$${totalSpent}`}
            amountColor="#000000"
          />
          <BudgetTopCards
            cardTitle="Remaining"
            amount={`$${(totalAmount - totalSpent).toFixed(2)}`}
            amountColor="#000000"
          />
        </div>
        <div className="budget-categories-breakdown-chart-container">
          <ReBarchart
            dataObject={budgetData.reduce((acc, curr) => {
              acc[curr.category] = curr.spent;
              return acc;
            }, {})}
          />
        </div>
      </div>

      <div className="budget-categories-container">
        {budgetData.map((budget) => (
          <BudgetCategories
            key={budget.id}
            id={budget.id}
            budgetId={budget.budgetId}
            category={budget.category}
            spent={budget.spent !== null ? budget.spent.toFixed(2) : 0}
            total={budget.amount.toFixed(2)}
            setDeleteMessageVisibility={setDeleteMessageVisibility}
            setAllocationIdToDelete={setAllocationIdToDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default BudgetBreakdown;
