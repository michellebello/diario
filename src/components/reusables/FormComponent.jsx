import { useState } from "react";
import Network from "/Users/michelle/code/diario/src/utils/network.js";
import "../styles/sidebar.css";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";

function FormComponent({ formLabel, onCancel }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTransaction = async () => {
    const transactionData = {
      name: name,
      type: type,
      amount: amount,
      date: date,
    };
    if (!name || !type || !amount || !date) {
      setErrorMessage("All fields must be complete");
      return;
    }
    try {
      const network = new Network();
      await network.post("/transactions", transactionData);
      setSuccessMessage("Transaction successfully added");
      setErrorMessage("");
    } catch (error) {
      const errorMessage = error.response.data?.message;
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  };

  const cancelAction = (e) => {
    e.preventDefault();
    onCancel();
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
        <label className="entryLabel">Spending account</label>
        <input
          className="entryInput"
          type="text"
          placeholder="Chase XXXXXXX1234"
        />
      </div>
      <div className="entry">
        <label className="entryLabel">Date</label>
        <input
          className="entryInput"
          type="date"
          value={date}
          onChange={(e) => setDate(e.value.target)}
          // need to add function to send date properly
        />
      </div>
      <div className="entry">
        <label className="entryLabel">Category</label>
        <select
          className="entryInput"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option className="options">Eat Out</option>
          <option className="options">Transportation</option>
          <option className="options">Groceries</option>
          <option className="options">Shopping</option>
          <option className="options">Entertainment</option>
          <option className="options">Pet</option>
          <option className="options">Education</option>
          <option className="options">Miscellaneous</option>
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
          onChange={(e) => setAmount(e.value.target)}
        />
      </div>
      <div className="buttons">
        <button className="addButton" onClick={addTransaction}>
          Add
        </button>
        <button className="cancelButton" onClick={cancelAction}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
