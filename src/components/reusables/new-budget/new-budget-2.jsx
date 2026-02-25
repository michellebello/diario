import { useUserData } from "../../../data/user/fetchAndSaveUserData.js";
import Network from "../../../utils/network.js";
import AddButton from "../buttons/AddButton";
import TextButton from "../buttons/TextButton";
import { LockableInput } from "../input/LockableInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CATEGORY_LIST } from "../../../data/aux/CategoryList";
import "../../../components/styles/create-new-budget.css";

function NewBudget2({ budgetId, budgetAmount, handlePrev }) {
  const network = new Network();
  const fetchUserData = useUserData();
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
    const remainingCats = CATEGORY_LIST.filter(
      (cat) => !activeAllocations.includes(cat),
    );
    if (remainingCats.length === 0) return;
    const others = remainingCats[0];
    setActiveAllocations((prev) => [...prev, others]);
    setBudgetAllocations((prev) => {
      const copy = new Map(prev);
      copy.set(others, "");
      return copy;
    });
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (activeAllocations.length === 0) {
      setErrorMessage("Please allocate at least one category");
      return;
    }
    if (totalAllocated > budgetAmount) {
      setErrorMessage("Allocated total cannot exceed budget total");
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
      console.log(
        "budget allocation creating response" + JSON.stringify(response),
      );
      if (response.status === 201) {
        await fetchUserData();
        navigate(`/mycuenta/budgets/`);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="create-budget-content">
      <form className="create-budget-form" onSubmit={onSubmit}>
        <div className="create-budget-top-div">
          <p className="create-budget-top-title">Create New Budget</p>
        </div>
        <div className="create-budget-allocation-div">
          <div className="create-budget-allocation-top">
            <p className="create-budget-secondary-titles">Budget Allocation</p>
            <AddButton type="button" text="" onClick={addNewBudgetAllocation} />
          </div>
          <div className="create-budget-allocation-total-container">
            {activeAllocations.map((category, idx) => (
              <div className="create-budget-allocation-container">
                <div className="create-budget-allocation-left">
                  <LockableInput
                    key={idx}
                    isLocked={false}
                    type="dropdown"
                    dropdownOptions={CATEGORY_LIST.filter(
                      (cat) =>
                        !activeAllocations.includes(cat) || cat === category,
                    )}
                    value={category}
                    onChange={(e) => {
                      const selectedCat = e.target.value;
                      setActiveAllocations((prev) =>
                        prev.map((cat) =>
                          cat === category ? selectedCat : cat,
                        ),
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
                </div>
                <div className="create-budget-allocation-right">
                  <LockableInput
                    key={`amount ${idx}`}
                    isLocked={false}
                    type="text"
                    value={budgetAllocations.get(category) ?? ""}
                    onChange={(e) =>
                      updateBudgetAllocationMap(category, e.target.value)
                    }
                  />
                </div>
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
          {errorMessage && <p>{errorMessage}</p>}
          <div className="create-budgets-buttons-div">
            <TextButton
              type="button"
              text="Cancel"
              bgColor="#eadddd"
              fontColor="#ba6e6eff"
              onClick={handlePrev}
            />
            <TextButton
              type="submit"
              text="Submit"
              bgColor="#e7dbdb"
              fontColor="#4e4c4c"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewBudget2;
