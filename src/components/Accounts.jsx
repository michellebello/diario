import { useState } from "react";
import TextButton from "./reusables/buttons/AddButton.jsx";
import Network from "../utils/network.js";
import AccountCard from "./reusables/cards/AccountCard.jsx";
import ReBarchart from "./reusables/data-charts/ReBarchart.jsx";
import "./styles/accounts.css";
import { useAppContext } from "../contexts/context.jsx";
import { useUserData } from "../data/user/fetchAndSaveUserData.js";
import AddAccountForm from "./reusables/forms/AddAcountForm.jsx";

const accountType = ["Credit", "Checking", "Savings", "Investment"];

function Accounts() {
  const network = new Network();
  const fetchUserData = useUserData();

  const { userInfo, setUserInfo } = useAppContext();
  const accounts = userInfo.accounts;
  const accountBalance = userInfo.accountBalance;
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
    console.log(JSON.stringify(newAccount));
    if (
      !newAccount.name ||
      !newAccount.number ||
      !newAccount.type ||
      !newAccount.balance
    ) {
      setErrorMessage("Please fill in all required fields.");
    }
    try {
      console.log(JSON.stringify(newAccount));
      const result = await network.post("/accounts", newAccount);
      if (result.data === "New account added") {
        setErrorMessage("");
        setShowAddAccount(false);
        setNewAccount({ name: "", number: "", type: "", balance: "" });
        setUserInfo((prev) => ({
          ...prev,
          accounts: [...prev.accounts, newAccount],
        }));
        await fetchUserData();
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
        <TextButton text="Add acount" onClick={() => setShowAddAccount(true)} />
      </div>

      {/* total balances per account type */}
      <div className="account-top-barchart">
        <ReBarchart dataObject={accountBalance} />
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
        <AddAccountForm
          accountType={accountType}
          errorMessage={errorMessage}
          addAcount={(e) => addAccount(e)}
          hideForm={() => setShowAddAccount((prev) => !prev)}
          newAccount={newAccount}
          setNewAccount={setNewAccount}
        />
      )}
    </div>
  );
}

export default Accounts;
