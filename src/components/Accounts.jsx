/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import TextButton from "../components/reusables/buttons/TextButton.jsx";
import Network from "../utils/network.js";
import AccountCard from "./reusables/cards/AccountCard.jsx";
import ReBarchart from "./reusables/data-charts/ReBarchart.jsx";
import "./styles/accounts.css";
import { useAppContext } from "../contexts/context.jsx";

const accountType = ["Credit", "Checking", "Savings", "Investment"];

function Accounts() {
  const network = new Network();
  const { userInfo, setUserInfo } = useAppContext();
  const accounts = userInfo.accounts;
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    number: "",
    type: "",
    balance: "",
  });

  const [deleteMessageVisibility, setDeleteMessageVisibility] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const addAccount = async (e) => {
    e.preventDefault();
    console.log(accountTypeTotal);

    if (
      !newAccount.name ||
      !newAccount.number ||
      !newAccount.type ||
      !newAccount.balance
    ) {
      alert("Please fill in all required fields.");
    }
    newAccount.balance = parseFloat(newAccount.balance);
    try {
      const result = await network.post("/accounts", newAccount);
      if (result.data === "New account added") {
        setErrorMessage("");
        setShowAddAccount(false);
        setNewAccount({ name: "", number: "", type: "", balance: "" });
        setUserInfo((prev) => ({
          ...prev,
          accounts: [...prev.accounts, newAccount],
        }));
      } else {
        setErrorMessage("Failed to add account");
      }
    } catch (error) {
      if (error.status === 409) {
        setErrorMessage("Account number already exists");
        return;
      }
      setErrorMessage(error.message || "Failed to add account");
    }
  };

  const [accountTypeTotal, setAccountTypeTotal] = useState({});
  const getBalancePerType = async () => {
    const response = await network.get("/accounts/balance");
    console.log(" response. data gave " + JSON.stringify(response.data));
    setAccountTypeTotal(response.data);
  };

  useEffect(() => {
    getBalancePerType();
  }, []);

  const deleteAccount = async (accountId) => {
    const response = await network.delete(`/accounts/${accountId}`);
    if (response.data === "account deleted") {
      setDeleteMessageVisibility(false);
      setUserInfo((prev) => ({
        ...prev,
        accounts: prev.accounts.filter((a) => a.id !== accountId),
      }));
    } else {
      alert("Error deleting account, please try again");
    }
  };

  return (
    <div className="account-content">
      {/* top part (title and add account button) */}
      <div className="account-top">
        <p className="title">My accounts</p>
        <TextButton
          text="Add acount"
          bgColor="#5154a1ff"
          fontColor="#ffffff"
          onClick={() => setShowAddAccount(true)}
        />
      </div>

      {/* total balances per account type */}
      <div className="account-top-barchart">
        <ReBarchart dataObject={accountTypeTotal} />
      </div>
      {/* account cards */}
      <div className="accounts-body">
        {accounts.length > 0 ? (
          accounts.map((acc) => (
            <AccountCard
              key={acc.id}
              className="account-grid"
              id={acc.id}
              name={acc.name}
              number={acc.number}
              balance={acc.balance}
              type={acc.type.slice(0, 14)}
              deleteMessageVisibility={deleteMessageVisibility}
              setDeleteMessageVisibility={setDeleteMessageVisibility}
              setAccountToDelete={setAccountToDelete}
            />
          ))
        ) : (
          <p>No accounts </p>
        )}
      </div>
      {/* confirm delete account message */}
      {deleteMessageVisibility && (
        <div className="delete-account-total">
          <div className="delete-account-container">
            <p className="delete-account-message">
              Are you sure you want to delete this account?
            </p>
            <div className="delete-account-buttons">
              <button
                className="delete-account-button"
                onClick={() => deleteAccount(accountToDelete)}
              >
                Yes
              </button>
              <button
                className="delete-account-button"
                onClick={() => setDeleteMessageVisibility(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* form to add new account  */}
      {showAddAccount && (
        <div className="add-account-container">
          <form className="add-account-form">
            <p className="add-account-form-title">Add New Account</p>
            <div className="add-acount-fields">
              <label className="add-account-label" htmlFor="account-name">
                Account Name:
              </label>
              <input
                id="account-name"
                className="add-account-input"
                type="text"
                name="accountName"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
              />
            </div>
            <div className="add-acount-fields">
              <label className="add-account-label" htmlFor="account-number">
                Account Number:
              </label>
              <input
                id="account-number"
                className="add-account-input"
                type="text"
                name="accountNumber"
                value={newAccount.number}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    number: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-acount-fields">
              <label className="add-account-label" htmlFor="account-balance">
                Initial Balance:
              </label>
              <input
                id="account-balance"
                className="add-account-input"
                type="number"
                name="accountBalance"
                value={newAccount.balance}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    balance: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-acount-fields">
              <label className="add-account-label" htmlFor="account-type">
                Account Type:
              </label>
              <select
                id="account-type"
                className="add-account-input"
                value={newAccount.type}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    type: e.target.value,
                  })
                }
              >
                {accountType.map((acc, idx) => (
                  <option key={idx}>{acc}</option>
                ))}
              </select>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="add-account-buttons">
              <button
                className="add-account-save-button"
                onClick={(e) => addAccount(e)}
              >
                Submit
              </button>
              <button
                className="add-account-cancel-button"
                onClick={() => setShowAddAccount(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Accounts;
