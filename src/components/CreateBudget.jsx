import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "./reusables/buttons/AddButton";
import LabelInputForm from "./reusables/LabelInputForm";
import { LockableInput } from "./reusables/input/LockableInput";
import { CATEGORY_LIST } from "../data/aux/CategoryList";
import TextButton from "./reusables/buttons/TextButton";
import Network from "../utils/network";
import "../components/styles/create-new-budget.css";

const NUM_TO_MONTH = new Map([
  [1, "January"],
  [2, "February"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "December"],
]);

function CreateBudget() {
  const network = new Network();
  const navigate = useNavigate();
  const [topErrorMessage, setTopErrorMessage] = useState("");
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
    if (budgetAmount === "" || budgetAmount.length === 0) {
      setTopErrorMessage("Please fill out budget period details first");
    }
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
    setTopErrorMessage("");
  };
  const [totalAllocated, setTotalAllocated] = useState(0);
  const updateBudgetAllocationMap = (key, value) => {
    setBudgetAllocations((prev) => {
      const copy = new Map(prev);
      copy.set(key, value);
      const values = Array.from(copy.values());
      const newTotal = values.reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0,
      );
      setTotalAllocated(newTotal);
      return copy;
    });
  };

  const removeInfo = () => {
    setTopErrorMessage("");
    setBudgetAmount("");
    setMonth("");
    setYear("");
    const map = new Map();
    map.set(CATEGORY_LIST[0], "");
    setBudgetAllocations(map);
    setActiveAllocations([CATEGORY_LIST[0]]);
    setTotalAllocated(0);
  };

  const addNewBudget = async () => {
    if (!year || !month || !budgetAmount) {
      setTopErrorMessage("Please fill out all fields");
      return;
    }
    try {
      const budgetBody = {
        year: parseInt(year),
        monthNumber: parseInt(month),
        totalAmount: parseInt(budgetAmount),
      };
      const response1 = await network.post("/budgets", budgetBody);
      console.log("response " + response1.data);
      if (response1.status === 200) {
        const budgetId = response1.data;
        const allocations = activeAllocations.map((category) => ({
          category: category,
          amount: parseFloat(budgetAllocations.get(category)) || 0,
        }));
        const response2 = await network.post(
          `/budgets/${budgetId}/allocations`,
          allocations,
        );
        console.log(response2);
        if (response2.status === 200) {
          navigate("/mycuenta.budgets");
        } else {
          setTopErrorMessage("Something occured. Try again");
        }
      } else {
        setTopErrorMessage("Try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-budget-content">
      <div className="create-budget-top-div">
        <p className="create-budget-top-title">Create New Budget</p>
        {/* <p className="create-budget-top-p">Set up your monthly budget</p> */}
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
              value={budgetAmount}
              autocomplete="1000"
              onChange={(e) => setBudgetAmount(e.target.value)}
            />
          </div>
          {topErrorMessage && (
            <p className="top-error-message">{topErrorMessage}</p>
          )}
        </div>
      </div>
      <div className="create-budget-allocation-div">
        <div className="create-budget-allocation-top">
          <p className="create-budget-secondary-titles">Budget Allocation</p>
          <AddButton
            text="Add budget category"
            onClick={addNewBudgetAllocation}
          />
        </div>
        <div className="create-budget-allocation-total-container">
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
        <div className="create-budget-totals-div">
          <div className="create-budget-total-flex">
            <p className="create-budget-totals-p"> Total Allocated</p>
            <p className="create-budget-totals-p">${totalAllocated}</p>
          </div>
          <div className="create-budget-total-flex">
            <p className="create-budget-totals-p">Budget Total</p>
            <p className="create-budget-totals-p">${budgetAmount}</p>
          </div>
        </div>
      </div>
      <div className="create-budgets-buttons-div">
        <TextButton
          text="Create Budget"
          bgColor="#e7dbdb"
          fontColor="#4e4c4c"
          onClick={addNewBudget}
        />
        <TextButton
          text="Cancel"
          bgColor="#eadddd"
          fontColor="#ba6e6eff"
          onClick={removeInfo}
        />
      </div>
    </div>
  );
}

export default CreateBudget;
