import { useState } from "react";
import NewBudget1 from "./new-budget-1";
import NewBudget2 from "./new-budget-2";

function NewBudget({ onCancel }) {
  const [currPage, setCurrPage] = useState(1);
  const [budgetId, setBudgetId] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState(0);

  const handleNext = () => {
    if (currPage === 1) {
      setCurrPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currPage === 2) {
      setCurrPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {currPage === 1 && (
        <NewBudget1
          setBudgetId={setBudgetId}
          setBudgetAmount={setBudgetAmount}
          handleNext={handleNext}
          onCancel={onCancel}
        />
      )}
      {currPage === 2 && (
        <NewBudget2
          budgetId={budgetId}
          budgetAmount={budgetAmount}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
}

export default NewBudget;
