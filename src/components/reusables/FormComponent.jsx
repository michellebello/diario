import { useState, useEffect } from "react";
import Network from "/Users/michelle/code/diario/src/utils/network.js";
import "../styles/sidebar.css";

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
    <form className="addItemForm">
      <p className="itemType">{formLabel}</p>

      <div className="entry">
        <label className="entryLabel">Name</label>
        <input
          className="entryInput"
          type="text"
          placeholder="Ex. Shake Shack"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="entry">
        <label className="entryLabel">Spending Account</label>
        <select
          className="entryInput"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          <option value="">Select an Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.number}
            </option>
          ))}
        </select>
      </div>

      <div className="entry">
        <label className="entryLabel">Date</label>
        <input
          className="entryInput"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="entry">
        <label className="entryLabel">Category</label>
        <select
          className="entryInput"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="Eat Out">Eat Out</option>
          <option value="Transportation">Transportation</option>
          <option value="Groceries">Groceries</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Pet">Pet</option>
          <option value="Education">Education</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>

      <div className="entry">
        <label className="entryLabel">Amount</label>
        <input
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
