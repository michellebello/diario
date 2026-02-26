import { useUserData } from "../../../data/user/fetchAndSaveUserData.js";
import Network from "../../../utils/network.js";
import TextButton from "../buttons/TextButton";
import BudgetCategoryRow from "../input/BudgetCategoryRow.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CATEGORY_LIST } from "../../../data/aux/CategoryList";
import { ErrorMessage } from "../cards/ErrorMessage.jsx";
import "../../../components/styles/create-new-budget.css";

function NewBudget2({ budgetId, budgetAmount, handlePrev }) {
  const network = new Network();
  const fetchUserData = useUserData();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [rows, setRows] = useState([{ category: CATEGORY_LIST[0], value: "" }]);
  const totalAllocated = rows.reduce(
    (sum, r) => sum + (parseFloat(r.value) || 0),
    0,
  );

  const addRow = () => {
    const hasEmptyRows = rows.some((r) => r.value === "" || r.value === null);
    console.log(hasEmptyRows);

    if (hasEmptyRows) {
      setErrorMessage("Please fill out all allocation fields");
      return;
    }
    setErrorMessage("");
    const remaining = CATEGORY_LIST.filter(
      (cat) => !rows.some((r) => r.category === cat),
    );
    if (!remaining.length) return;

    setRows((prev) => [...prev, { category: remaining[0], value: "" }]);
  };

  const isButtonDisabled = rows.length >= CATEGORY_LIST.length;

  const updateCategory = (index, newCat) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[index].category = newCat;
      return copy;
    });
  };

  const updateValue = (index, newVal) => {
    if (newVal === 0 || newVal === null) {
      setErrorMessage("Complete field");
    }
    setRows((prev) => {
      const copy = [...prev];
      copy[index].value = newVal;
      return copy;
    });
  };

  const deleteRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const allocations = rows.map((row) => ({
        category: row.category,
        amount: parseFloat(row.value),
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
        navigate(`/mycuenta/budgets/`, { replace: true });
        window.location.reload();
      }
    } catch (err) {
      console.log(err.errorMessage);
      setErrorMessage("Something went wrong" || err.errorMessage);
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
            <button
              type="button"
              onClick={addRow}
              className="create-budget-add-button"
              disabled={isButtonDisabled}
            >
              +
            </button>
          </div>
          <div className="create-budget-allocation-total-container">
            {rows.map((row, idx) => (
              <BudgetCategoryRow
                key={idx}
                category={row.category}
                input={row.value}
                categoryList={CATEGORY_LIST.filter(
                  (cat) =>
                    !rows.some((r) => r.category === cat) ||
                    cat === row.category,
                )}
                onCategoryChange={(newCat) => updateCategory(idx, newCat)}
                onInputChange={(val) => updateValue(idx, val)}
                onDelete={() => deleteRow(idx)}
              />
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
          {errorMessage && <ErrorMessage message={errorMessage} />}
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
