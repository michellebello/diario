import { ErrorMessage } from "../cards/ErrorMessage.jsx";
import "../../styles/sidebar.css";

function AddAccountForm({
  accountType,
  errorMessage,
  addAcount,
  hideForm,
  newAccount,
  setNewAccount,
}) {
  return (
    <div className="addItemForm-container">
      <form className="addItemForm">
        <div className="itemType-container">
          <p className="itemType">Add New Account</p>
        </div>
        <div className="entries">
          <div className="entry">
            <label className="entryLabel" htmlFor="account-name">
              Account Name:
            </label>
            <input
              id="account-name"
              className="entryInput"
              type="text"
              name="accountName"
              value={newAccount.name}
              onChange={(e) =>
                setNewAccount({ ...newAccount, name: e.target.value })
              }
            />
          </div>
          <div className="entry">
            <label className="entryLabel" htmlFor="account-number">
              Account Number:
            </label>
            <input
              id="account-number"
              className="entryInput"
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
          <div className="entry">
            <label className="entryLabel" htmlFor="account-balance">
              Initial Balance:
            </label>
            <input
              id="account-balance"
              className="entryInput"
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
          <div className="entry">
            <label className="entryLabel" htmlFor="account-type">
              Account Type:
            </label>
            <select
              id="account-type"
              className="categorySelect"
              value={newAccount.type}
              onChange={(e) =>
                setNewAccount({
                  ...newAccount,
                  type: e.target.value,
                })
              }
            >
              <option disabled selected value="">
                Select
              </option>
              {accountType.map((acc, idx) => (
                <option key={idx}>{acc}</option>
              ))}
            </select>
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
        <div className="buttons">
          <button className="addButton" onClick={hideForm}>
            Cancel
          </button>
          <button className="addButton" onClick={addAcount}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAccountForm;
