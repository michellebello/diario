import Network from "../../../utils/network";
import AddButton from "../buttons/AddButton";
import TextButton from "../buttons/TextButton";
import { LockableInput } from "../input/LockableInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CATEGORY_LIST } from "../../../data/aux/CategoryList";

function NewBudget2({ budgetId, budgetAmount, handlePrev }) {
  const network = new Network();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Please fill out budget period details first");
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
    setErrorMessage("");
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

  const addBudgetAllocations = async () => {
    if (!activeAllocations || !budgetAllocations) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    try {
      const allocations = activeAllocations.map((category) => ({
        category: category,
        amount: parseFloat(budgetAllocations.get(category)) || 0,
      }));
      const response = await network.post(
        `/budgets/${budgetId}/allocations`,
        allocations,
      );
      console.log(response);
      if (response.status === 200) {
        navigate(`/mycuenta/budgets/${budgetId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      <div className="create-budgets-buttons-div">
        <TextButton
          text="Create Budget"
          bgColor="#e7dbdb"
          fontColor="#4e4c4c"
          onClick={addBudgetAllocations}
        />
        <TextButton
          text="Cancel"
          bgColor="#eadddd"
          fontColor="#ba6e6eff"
          onClick={handlePrev}
        />
      </div>
    </div>
  );
}

export default NewBudget2;
