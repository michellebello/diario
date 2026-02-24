import { useState } from "react";
import Network from "../../../utils/network";
import LabelInputForm from "../LabelInputForm";
import { NUM_TO_MONTH } from "./monthData";

function NewBudget1({ setBudgetId, setBudgetAmount, handleNext }) {
  const network = new Network();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [localBudgetId, setLocalBudgetId] = useState(null);
  const [localBudgetAmount, setLocalBudgetAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addNewBudget = async () => {
    if (!year || !month || !localBudgetAmount) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    try {
      const budgetBody = {
        year: parseInt(year),
        monthNumber: parseInt(month),
        totalAmount: parseInt(localBudgetAmount),
      };
      const response1 = await network.post("/budgets", budgetBody);
      console.log("response " + response1.data);
      if (response1.status === 200) {
        const budgetId = response1.data;
        setLocalBudgetId(budgetId);
      } else {
        setErrorMessage("Try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    addNewBudget();
    setBudgetId(localBudgetId);
    setBudgetAmount(localBudgetAmount);
    handleNext();
  };

  const handleCancel = () => {
    setErrorMessage("");
    setBudgetAmount("");
    setMonth("");
    setYear("");
  };

  return (
    <div>
      <form className="add-account-form">
        <div className="create-budget-top-div">
          <p className="create-budget-top-title">Create New Budget</p>
        </div>
        <div className="create-budget-configuration-div">
          {/* budget configuration part */}
          <p className="create-budget-secondary-titles">Budget Period</p>
          <div className="create-budget-configuration-col">
            <div className="create-budget-configuration-row">
              <LabelInputForm
                inputType="dropdown"
                dropdownOptions={[...NUM_TO_MONTH.entries()]}
                label="Month"
                name="budgetPeriod"
                type="number"
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              />
              <LabelInputForm
                inputType="input"
                label="Year"
                name="budgetYear"
                type="text"
                value={year}
                autocomplete="2026"
                onChange={(e) => setYear(e.target.value)}
              />
              <LabelInputForm
                label="Total Budget Amount"
                name="budgetAmount"
                type="text"
                value={localBudgetAmount}
                autocomplete="1000"
                onChange={(e) => setLocalBudgetAmount(e.target.value)}
              />
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="add-account-buttons">
            <button className="add-account-save-button" onClick={onSubmit}>
              Submit
            </button>
            <button
              className="add-account-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewBudget1;
