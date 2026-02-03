/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Network from "/Users/michelle/code/diario/src/utils/network.js";
import { useAppContext } from "../../contexts/context";
import { useUserData } from "../../data/user/fetchAndSaveUserData";
import { CATEGORY_LIST } from "../../data/aux/CategoryList";
import "../styles/sidebar.css";

function FormComponent({ formLabel, onCancel, onTransactionAdded }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userInfo, _ } = useAppContext();
  const fetchUserData = useUserData();

  const network = new Network();
  const accs = userInfo.accounts;

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
      const resp = await network.post("/transactions", transactionData);
      console.log("Sent " + transactionData);
      console.log(resp);
      setErrorMessage("");
      onTransactionAdded();
      onCancel();
      // here add GET "/transactions" ?
      await fetchUserData();
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };
  return (
    <form className="addItemForm" id="add-item-form">
      <div className="itemType-container">
        <p className="itemType">{formLabel}</p>
      </div>

      <div className="entry">
        <label className="entryLabel" htmlFor="entry-name">
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
        <label className="entryLabel" htmlFor="entry-account">
          Spending Account
        </label>
        <select
          id="entry-account"
          className="entryInput"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(Number(e.target.value))}
        >
          <option value="">Select an Account</option>
          {accs.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.number}
            </option>
          ))}
        </select>
      </div>

      <div className="entry">
        <label className="entryLabel" htmlFor="entry-date">
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
        <label className="entryLabel" htmlFor="entry-type">
          Category
        </label>
        <select
          id="entry-type"
          className="entryInput"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {CATEGORY_LIST.map((cat, idx) => (
            <option key={idx} value={cat}>
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
        <button type="button" className="addButton" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}

export default FormComponent;
