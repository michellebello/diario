import { useState } from "react";
import { ChevronRight, Save } from "lucide-react";
import IconButton from "../buttons/IconButton.jsx";
import DeleteConfirmationForm from "../forms/DeleteConfirmationForm.jsx";
import Network from "../../../utils/network.js";
import { useUserData } from "../../../data/user/fetchAndSaveUserData.js";
import "../../../components/styles/budget-reusables.css";

export function CurrBudgetCard({
  currBudgetId,
  currDate,
  currAmount,
  currTotal,
  viewBudget,
}) {
  const network = new Network();
  const fetchUserData = useUserData();

  const [isEditing, setIsEditing] = useState(false);
  const [newTotalAmount, setnewTotalAmount] = useState(currTotal);

  const editCurrBudget = async () => {
    try {
      const response = await network.patch(`/budgets/${currBudgetId}`, {
        totalAmount: newTotalAmount,
      });
      if (response.status === 200) {
        await fetchUserData();
        setIsEditing(false);
      }
    } catch (err) {}
  };

  const [deleteFormVisibility, setDeleteFormVisibility] = useState(false);
  const deleteCurrBudget = async () => {
    try {
      const response = await network.delete(`/budgets/${currBudgetId}`);
      if (response.status === 200) {
        await fetchUserData();
        setIsEditing(false);
      }
    } catch (err) {}
  };

  return (
    <div className="curr-budget-top-card-total">
      {deleteFormVisibility && (
        <DeleteConfirmationForm
          deletingObject="budget"
          deleteFunction={deleteCurrBudget}
          closeForm={() => setDeleteFormVisibility((prev) => !prev)}
        />
      )}
      <div className="curr-budget-div">
        <p className="curr-budget-date">{currDate} (current)</p>
        <div className="curr-budget-total-div">
          <p className="curr-budget-amounts">${currAmount.toFixed(2)} / </p>
          {isEditing ? (
            <div className="input-container">
              <p className="curr-budget-amount-total">$</p>
              <input
                className="input-field"
                value={newTotalAmount}
                onChange={(e) => setnewTotalAmount(e.target.value)}
              />
              <button className="input-button" onClick={() => editCurrBudget}>
                <Save width="clamp(0.9rem, 1.5vw, 1.1rem)" />
              </button>
            </div>
          ) : (
            <p className="curr-budget-amount-total">${currTotal.toFixed(2)}</p>
          )}
        </div>
      </div>
      <div className="action-buttons">
        <div className="edit-delete-buttons">
          <IconButton
            onClick={() => setIsEditing((prev) => !prev)}
            color="#797575"
          />
          <IconButton
            type="delete"
            onClick={() => setDeleteFormVisibility((prev) => !prev)}
            color="#797575"
          />
        </div>
        <button onClick={viewBudget} className="view-budget-button">
          View budget
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
