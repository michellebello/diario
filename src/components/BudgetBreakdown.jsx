/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { NUM_TO_MONTH } from "../data/aux/MonthNumToName";
import Network from "../utils/network";
import { BudgetTopCards } from "./reusables/cards/BudgetTopCards";
import { BudgetCategories } from "./reusables/cards/BudgetCategories";
import ReBarchart from "./reusables/data-charts/ReBarchart";
import { Plus } from "lucide-react";
import DeleteConfirmationForm from "../components/reusables/forms/DeleteConfirmationForm";
import "../components/styles/budget-breakdown.css";
import { ALLOCATION_CATEGORY_LIST } from "../data/aux/CategoryList";
import LabelInputForm from "./reusables/forms/LabelInputForm";

function BudgetBreakdown() {
  const network = new Network();
  const { state } = useLocation();
  const { budgetId } = useParams();
  const [budgetData, setBudgetData] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState(state);
  const [deleteMessageVisibility, setDeleteMessageVisibility] = useState(false);
  const [allocationIdToDelete, setAllocationIdToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [addAllocationVisibility, setAddAllocationVisibility] = useState(false);
  const usedCategories = budgetData.map((budget) => budget.category);
  const remainingCategories = ALLOCATION_CATEGORY_LIST.filter(
    (category) => !usedCategories.includes(category),
  );
  const [newAllocation, setNewAllocation] = useState({
    category: "",
    amount: "",
  });

  const getBudgetBreakdownData = async (budgetId) => {
    try {
      const allocationsRes = await network.get(
        `/budgets/${budgetId}/allocations`,
      );
      setBudgetData(allocationsRes.data);
      console.log(
        "setting getBudgetBreakdown " + JSON.stringify(allocationsRes.data),
      );
    } catch (err) {
      console.error("Failed to refresh data", err);
    }
  };

  const {
    budgetMonth: month,
    budgetYear: year,
    budgetTotal: totalAmount,
    budgetSpent: totalSpent,
  } = budgetInfo || {};

  const numericTotalBudget = Number(totalAmount);
  const calculatedTotalSpent = Number(totalSpent);
  const remainingBalance = numericTotalBudget - calculatedTotalSpent;

  const addNewBudgetAllocation = async (e) => {
    if (e) e.preventDefault();
    if (!newAllocation.category || newAllocation.amount <= 0) {
      setErrorMessage("Please fill out all input");
      return;
    }

    try {
      const response = await network.post(`/budgets/${budgetId}/allocations`, [
        {
          category: newAllocation.category,
          amount: Number(newAllocation.amount),
          spent: 0,
        },
      ]);

      console.log("response " + JSON.stringify(response));
      if (response.status === 201) {
        await getBudgetBreakdownData(budgetId);
        setAddAllocationVisibility((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  let needsGraph = true;
  for (const budget of budgetData) {
    if (budget.spent === null || budget.spent < 0) {
      needsGraph = false;
    }
  }

  useEffect(() => {
    getBudgetBreakdownData(budgetId);
  }, [budgetId]);

  useEffect(() => {
    if (remainingCategories.length > 0 && !newAllocation.category) {
      setNewAllocation((prev) => ({
        ...prev,
        category: remainingCategories[0],
      }));
    }
  }, [addAllocationVisibility]);

  return (
    <div className="budgets-content">
      {addAllocationVisibility && (
        <div className="add-allocation-container">
          <form className="add-allocation-form">
            <p>New Allocation</p>
            <div className="form-entries">
              <div className="duoLabelInput">
                <label htmlFor="type" className="labelForm">
                  Allocation Type
                </label>
                <div className="inputContainer">
                  <select
                    id="type"
                    name="type"
                    className="inputForm"
                    value={newAllocation.category}
                    onChange={(e) => {
                      e.preventDefault();
                      setNewAllocation((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }));
                    }}
                  >
                    <option value=""> Choose a category</option>
                    {remainingCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <LabelInputForm
                inputType="input"
                label="Amount"
                name="allocation-amount"
                type="number"
                value={newAllocation.amount}
                onChange={(e) => {
                  e.preventDefault();
                  setNewAllocation((prev) => ({
                    ...prev,
                    amount: parseFloat(e.target.value) || 0,
                  }));
                }}
              />
            </div>
            <div className="add-allocation-buttons-div">
              <button
                className="add-allocation-buttons"
                type="text"
                onClick={() => setAddAllocationVisibility((prev) => !prev)}
              >
                Cancel
              </button>
              <button
                onClick={(e) => addNewBudgetAllocation(e)}
                className="add-allocation-buttons"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="budgets-top">
        <p className="title">{`Budget Breakdown: ${NUM_TO_MONTH[month]} ${year}`}</p>
        <button className="add-allocation-button">
          <Plus
            color="#ececf2"
            onClick={() => setAddAllocationVisibility((prev) => !prev)}
          />
        </button>
      </div>
      {/* confirm delete account message */}
      {deleteMessageVisibility && (
        <DeleteConfirmationForm
          deletingObject="budget allocation"
          deleteFunction={() => deleteBudgetAllocation(allocationIdToDelete)}
          closeForm={() => setDeleteMessageVisibility(false)}
        />
      )}
      {needsGraph ? (
        <div className="budget-cards-top">
          <div className="budget-cards-container">
            <BudgetTopCards
              cardTitle="Total Budgeted"
              amount={`$${numericTotalBudget.toFixed(2)}`}
              amountColor="#000000"
            />
            <BudgetTopCards
              cardTitle="Total spent"
              amount={`$${calculatedTotalSpent.toFixed(2)}`}
              amountColor="#000000"
            />
            <BudgetTopCards
              cardTitle="Remaining"
              amount={`$${(numericTotalBudget - calculatedTotalSpent).toFixed(2)}`}
              amountColor="#000000"
            />
          </div>
          <div className="budget-categories-breakdown-chart-container">
            <ReBarchart
              dataObject={budgetData.reduce((acc, curr) => {
                if (curr.spent !== null || curr.spent > 0) {
                  acc[curr.category] = curr.spent;
                }
                return acc;
              }, {})}
            />
          </div>
        </div>
      ) : (
        <div className="budget-cards-top">
          <BudgetTopCards
            cardTitle="Total Budgeted"
            amount={`$${numericTotalBudget.toFixed(2)}`}
            amountColor="#000000"
          />
          <BudgetTopCards
            cardTitle="Total spent"
            amount={`$${calculatedTotalSpent.toFixed(2)}`}
            amountColor="#000000"
          />
          <BudgetTopCards
            cardTitle="Remaining"
            amount={`$${remainingBalance.toFixed(2)}`}
            amountColor="#000000"
          />
        </div>
      )}

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
