import { useState } from "react";
import Network from "../../../utils/network";
import { CreditCard, Wallet, PiggyBank, ChartLine } from "lucide-react";
import { useAppContext } from "../../../contexts/context";
import "../../styles/accountcard.css";

const formatBalance = (balance) => {
  return balance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const typeToIcon = {
  Credit: CreditCard,
  Checking: Wallet,
  Savings: PiggyBank,
  Investment: ChartLine,
};

const typeToColor = {
  Credit: ["#f3bcc7ff", "#D8264A"],
  Checking: ["#bbd0f1ff", "#3872C9"],
  Savings: ["#c6e0bbff", "#53873dff"],
  Investment: ["#e6d2ebff", "#8e659bff"],
};

function AccountCard({
  id,
  name,
  number,
  type,
  balance,
  deleteMessageVisibility,
  setDeleteMessageVisibility,
  setAccountToDelete,
}) {
  const { userInfo, setUserInfo } = useAppContext();
  const network = new Network();

  const accNum = number.slice(number.length - 4, number.length);
  const formattedBalance = formatBalance(balance);

  const Icon = typeToIcon[type];
  const [bg, text] = typeToColor[type] ?? ["#E5E7EB", "#111827"];

  const [isEditing, setIsEditing] = useState(false);
  // const [deleteMessageVisibility, setDeleteMessageVisibility] = useState(false);

  const [newBalance, setNewBalance] = useState(balance);
  const [newType, setNewType] = useState(type);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = () => {
    setAccountToDelete(id);
    setDeleteMessageVisibility(true);
  };

  const editAccount = async (accountId, newBalance, newType) => {
    if (!newBalance || !newType) {
      alert("Complete at least one field to update");
      return;
    }

    if (newType.length > 20) {
      alert("Type must be less than 20 characters");
      return;
    }

    const body = {};
    if (newBalance !== balance) {
      body.balance = parseFloat(newBalance);
    }
    if (newType !== type) {
      body.type = newType;
    }

    if (Object.keys(body).length !== 0) {
      const response = await network.patch(`/accounts/${accountId}`, body, {
        "Content-Type": "application/json",
      });
      console.log("edit account gave " + response.data);
      if (response.data === "Account successfully updated with new data") {
        toggleEdit();
        setUserInfo((prev) => ({
          ...prev,
          accounts: prev.accounts.map((a) =>
            a.id === accountId ? { ...a, ...body } : a,
          ),
        }));
      } else {
        alert("Error updating account, please try again");
      }
    } else {
      toggleEdit();
    }
  };

  return (
    <div className="card-total" id={id}>
      <div className="card-top">
        <div className="card-icon">
          {Icon && <Icon size="20px" color="rgba(89, 89, 158, 0.76)" />}
        </div>
        <div className="card-main-info">
          <p className="card-name">{name}</p>
          <p className="card-number">{`xxxx ${accNum}`}</p>
        </div>
      </div>
      {/* type */}
      {isEditing ? (
        <div id="type" className="edit-total-container">
          <label className="edit-label" htmlFor="edit-type">
            Account type
          </label>
          <select
            className="edit-input"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            {Object.keys(typeToIcon).map((type) => (
              <option id="edit-type">{type}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="card-info-container">
          <div className="card-type-container">
            <p
              className="card-type"
              style={{
                backgroundColor: bg,
                color: text,
              }}
            >
              {type}
            </p>
          </div>
        </div>
      )}

      {/* balance */}
      {isEditing ? (
        <div className="edit-total-container">
          <label className="edit-label" htmlFor="edit-balance">
            Account balance
          </label>
          <input
            id="edit-balance"
            type="number"
            className="edit-input"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
          />
        </div>
      ) : (
        <div className="card-balance-container">
          <p className="card-curr-balance">Current Balance</p>
          <span className="card-actual-balance">{`$${formattedBalance}`}</span>
        </div>
      )}

      {/* buttons conditional */}
      {isEditing ? (
        <div className="edit-account-buttons">
          <button
            className="edit-account-button"
            onClick={() => editAccount(id, newBalance, newType)}
          >
            Save
          </button>
          <button className="edit-account-button" onClick={() => toggleEdit()}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="card-buttons">
          <button className="card-button-edit" onClick={toggleEdit}>
            Edit
          </button>
          <button className="card-button-delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountCard;
