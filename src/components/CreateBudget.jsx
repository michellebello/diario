import { useState } from "react";
import AddButton from "./reusables/buttons/AddButton";
import LabelInputForm from "./reusables/LabelInputForm";
import { LockableInput } from "./reusables/input/LockableInput";
import { CATEGORY_LIST } from "../data/aux/CategoryList";
import "../components/styles/create-new-budget.css";

function CreateBudget() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const [activeAllocations, setActiveAllocations] = useState([
    CATEGORY_LIST[0],
  ]);
  const [budgetAllocations, setBudgetAllocations] = useState(() => {
    const map = new Map();
    map.set(CATEGORY_LIST[0], "");
    return map;
  });

  const addNewBudgetAllocation = () => {
    const remainingCats = CATEGORY_LIST.filter(
      (cat) => !activeAllocations.includes(cat),
    );
    if (remainingCats === 0) return;
    const others = remainingCats[0];
    setActiveAllocations((prev) => [...prev, others]);
    setBudgetAllocations((prev) => {
      const copy = new Map(prev);
      copy.set(others, "");
      return copy;
    });
  };

  const updateBudgetAllocationMap = (key, value) => {
    setBudgetAllocations((prev) => {
      const copy = new Map(prev);
      copy.set(key, value);
      return copy;
    });
  };

  return (
    <div className="create-budget-content">
      <div className="create-budget-top-div">
        <p className="create-budget-top-title">Create New Budget</p>
        <p className="create-budget-top-p">Set up your monthly budget</p>
      </div>
      <div className="create-budget-configuration-div">
        {/* budget configuration part */}
        <p className="create-budget-secondary-titles">Budget Period</p>
        <div className="create-budget-configuration-row">
          <LabelInputForm
            label="Month"
            name="budgetPeriod"
            type="text"
            value={month}
            autocomplete="January"
            onChange={(e) => setMonth(e.target.value)}
          />
          <LabelInputForm
            label="Year"
            name="budgetYear"
            type="text"
            value={year}
            autocomplete="2026"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <LabelInputForm
          label="Total Budget Amount"
          name="budgetAmount"
          type="text"
          value={budgetAmount}
          autocomplete="1000"
          onChange={(e) => setBudgetAmount(e.target.value)}
        />
      </div>
      <div className="create-budget-allocation-div">
        <div className="create-budget-allocation-top">
          <p className="create-budget-secondary-titles">Budget Allocation</p>
          <AddButton
            text="Add budget category"
            onClick={addNewBudgetAllocation}
          />
        </div>
        {activeAllocations.map((category, idx) => (
          <div className="create-budget-allocation-container">
            <LockableInput
              key={idx}
              isLocked={false}
              type="dropdown"
              dropdownOptions={CATEGORY_LIST.filter(
                (cat) => !activeAllocations.includes(cat) || cat === category,
              )}
              value={category}
              onChange={(e) => {
                const selectedCat = e.target.value;
                setActiveAllocations((prev) =>
                  prev.map((cat) => (cat === category ? selectedCat : cat)),
                );
                setBudgetAllocations((prev) => {
                  const newMap = new Map(prev);
                  const value = newMap.get(category) ?? "";
                  newMap.set(selectedCat, value);
                  newMap.delete(category);
                  return newMap;
                });
              }}
            />
            <LockableInput
              key={idx + 10}
              isLocked={false}
              type="text"
              value={budgetAllocations.get(category) ?? ""}
              onChange={(e) =>
                updateBudgetAllocationMap(category, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateBudget;
