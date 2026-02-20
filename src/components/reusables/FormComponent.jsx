/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Network from "/Users/michelle/code/diario/src/utils/network.js";
import { useAppContext } from "../../contexts/context";
import { useUserData } from "../../data/user/fetchAndSaveUserData";
import { CATEGORY_LIST } from "../../data/aux/CategoryList";
import SliderButton from "./buttons/SliderButton";
import "../styles/sidebar.css";

function FormComponent({ formLabel, onCancel, onTransactionAdded }) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isTaxable, setIsTaxable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userInfo, _ } = useAppContext();
  const fetchUserData = useUserData();

  const network = new Network();
  const accountNumbers = userInfo.accountNumbers;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const addTransaction = async () => {
    if (!name || !category || !amount || !date || !selectedAccountId) {
      setErrorMessage("All fields must be complete");
      return;
    }
    const transactionData = {
      accountId: Number(selectedAccountId),
      name,
      category,
      typeName: formLabel,
      amount: parseFloat(amount),
      createdOn: new Date(date).toISOString(),
      isTaxable,
    };

    try {
      await network.post("/transactions", transactionData);
      setErrorMessage("");
      onTransactionAdded();
      onCancel();
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
      <div className="entries">
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
            {accountNumbers.map((acc) => (
              <option key={acc.accountId} value={acc.accountId}>
                {acc.formattedAccountNumber}
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
            max={today.toLocaleDateString("en-CA")}
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        <div className="entry-vertical">
          <p className="entryLabel-vertical">Mark as taxable</p>
          <SliderButton
            value={isTaxable}
            onSelect={() => setIsTaxable((prev) => !prev)}
          />
        </div>
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
