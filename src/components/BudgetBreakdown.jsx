import { BudgetTopCards } from "./reusables/cards/BudgetTopCards";
import { BudgetCategories } from "./reusables/cards/BudgetCategories";

import "../components/styles/budget-breakdown.css";

function BudgetBreakdown() {
  return (
    <div className="budgets-content">
      <div className="budgets-top">
        <p className="title">My budgets</p>
      </div>
      <div className="budget-cards-container">
        <BudgetTopCards
          cardTitle="Total Budgeted"
          amount="$8000"
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
          <BudgetCategories category="Entertainment" total={250} spent={100} />
          <BudgetCategories category="Eat Out" total={300} spent={450} />
          <BudgetCategories category="Groceries" total={1000} spent={678} />
        </div>
        <div className="budget-categories-breakdown-chart-container">
          <p>Remaining</p>
        </div>
      </div>
    </div>
  );
}

export default BudgetBreakdown;
