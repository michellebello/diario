/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Network from "/Users/michelle/code/diario/src/utils/network.js";
import "../styles/sidebar.css";
import { CATEGORY_LIST } from "../../data/aux/CategoryList";

function FormComponent({ formLabel, onCancel, onTransactionAdded }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const network = new Network();

  useEffect(() => {
    const fetchAccountNumbers = async () => {
      try {
        const response = await network.get("/accounts/numbers");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccountNumbers();
  }, []);

  const addTransaction = async () => {
    if (!name || !type || !amount || !date || !selectedAccountId) {
      setErrorMessage("All fields must be complete");
      return;
    }
    const transactionData = {
      name,
      type,
      amount: parseFloat(amount),
      accountId: Number(selectedAccountId),
      createdOn: new Date(date).toISOString(),
    };

    try {
      await network.post("/transactions", transactionData);
      setErrorMessage("");
      onTransactionAdded();
      onCancel();
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };
  return (
    <form className="addItemForm" id="add-item-form">
      <p className="itemType">{formLabel}</p>

      <div className="entry">
        <label className="entryLabel" for="entry-name">
          Name
        </label>
        <input
          id="entry-name"
          className="entryInput"
          type="text"
          placeholder="Ex. Shake Shack"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="entry">
        <label className="entryLabel" for="entry-account">
          Spending Account
        </label>
        <select
          id="entry-account"
          className="entryInput"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          <option value="">Select an Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {`xxxx ${account.number.slice(account.number.length - 5, account.number.length - 1)}`}
            </option>
          ))}
        </select>
      </div>

      <div className="entry">
        <label className="entryLabel" for="entry-date">
          Date
        </label>
        <input
          id="entry-date"
          className="entryInput"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="entry">
        <label className="entryLabel" for="entry-type">
          Category
        </label>
        <select
          id="entry-type"
          className="entryInput"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {CATEGORY_LIST.map((cat, idx) => (
            <option id={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="entry">
        <label className="entryLabel" htmlFor="entry-amount">
          Amount
        </label>
        <input
          id="entry-amount"
          className="entryInput"
          type="number"
          min="0"
          step="0.01"
          placeholder="$12.34"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button type="button" className="addButton" onClick={addTransaction}>
          Add
        </button>
        <button type="button" className="cancelButton" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}

export default FormComponent;
