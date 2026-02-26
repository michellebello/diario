import { useState } from "react";
import Network from "../../../utils/network";
import LabelInputForm from "../LabelInputForm";
import { NUM_TO_MONTH } from "./monthData";
import TextButton from "../buttons/TextButton";
import { ErrorMessage } from "../cards/ErrorMessage";
import "../../../components/styles/create-new-budget.css";

function NewBudget1({ setBudgetId, setBudgetAmount, handleNext, onCancel }) {
  const network = new Network();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [localBudgetAmount, setLocalBudgetAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleBudgetTotal = (e) => {
    setLocalBudgetAmount(e.target.value);
  };

  const addNewBudget = async () => {
    const yearTrimmed = year.trim();
    const monthTrimmed = month.trim();
    const budgetTotal = localBudgetAmount.trim();
    if (!yearTrimmed || !month || !budgetTotal) {
      setErrorMessage("Please fill out all fields");
      return false;
    }
    try {
      const budgetBody = {
        year: parseInt(yearTrimmed),
        monthNumber: parseInt(monthTrimmed),
        totalAmount: parseInt(budgetTotal),
      };
      const response = await network.post("/budgets", budgetBody);
      console.log(response);
      if (response.status === 200) {
        const budgetId = response.data;
        console.log("budget id is " + budgetId);
        setBudgetId(budgetId);
        setBudgetAmount(localBudgetAmount);
        return true;
      }
      setErrorMessage("");
      return false;
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Try again.");
      }
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await addNewBudget();
    if (!success) return;
    handleNext();
  };

  return (
    <div className="create-budget-content">
      <form className="create-budget-form" onSubmit={onSubmit}>
        <div className="create-budget-top-div">
          <p className="create-budget-top-title">Create New Budget</p>
        </div>
        <div className="create-budget-configuration-div">
          {/* budget configuration part */}
          <div className="create-budget-configuration-col">
            <LabelInputForm
              inputType="dropdown"
              defaultDropdown="January"
              dropdownOptions={[...NUM_TO_MONTH.entries()]}
              label="Month"
              name="budgetPeriod"
              type="number"
              value={month}
              onChange={handleMonth}
            />
            <LabelInputForm
              inputType="input"
              label="Year"
              name="budgetYear"
              type="number"
              value={year}
              autocomplete="2026"
              onChange={handleYear}
            />
            <LabelInputForm
              label="Total Budget Amount"
              name="budgetAmount"
              type="number"
              value={localBudgetAmount}
              autocomplete="1000"
              onChange={handleBudgetTotal}
            />
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className="create-budgets-buttons-div">
            <TextButton
              tyoe="button"
              text="Cancel"
              bgColor="#ede8f7"
              fontColor="#4e4c4c"
              onClick={onCancel}
            />
            <TextButton
              type="submit"
              text="Next"
              bgColor="#ede8f7"
              fontColor="#4e4c4c"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewBudget1;
