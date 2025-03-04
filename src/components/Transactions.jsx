import { useEffect, useState } from "react";
import deposit from "./pictures/deposit.png";
import eatOut from "./pictures/eatout.png";
import transport from "./pictures/transportation.png";
import groceries from "./pictures/groceries.png";
import shopping from "./pictures/shopping.png";
import entertainment from "./pictures/entertainment.webp";
import pet from "./pictures/pet.png";
import education from "./pictures/school.svg";
import misc from "./pictures/misc.png";
import Network from "../utils/network.js";
import "./styles/transactions.css";

function Transactions() {
  const network = new Network();
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
    accountId: "",
    date: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const categoryToIcon = {
    Deposit: deposit,
    Food: eatOut,
    Transportation: transport,
    Groceries: groceries,
    Shopping: shopping,
    Entertainment: entertainment,
    Pet: pet,
    Education: education,
    Miscellaneous: misc,
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTransactions = () => {
    network
      .get("/transactions")
      .then((result) => {
        setTransactions(result.data);
      })
      .catch((err) => console.error(err));
  };

  const formatDate = (transaction) => {
    if (!transaction.createdOn) return "N/A";
    const [year, month, day] = transaction.createdOn;
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await network.post("/transactions", formData);

      if (response.status >= 200 && response.status < 300) {
        console.log("Transaction added successfully!");
        setFormData({
          name: "",
          type: "",
          amount: "",
          accountId: "",
          date: "",
        });
        setShowForm(false);
        fetchTransactions();
        return;
      }

      setErrorMessage("Something went wrong. Please try again.");
    } catch (error) {
      console.error("Failed to add transaction:", error);
      setErrorMessage("Failed to add transaction. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <div className="topTransaction">
        <p className="title">Tracked expenses</p>

        <div className="fromTo">
          <p className="from">FROM</p>
          <input type="date"></input>
          <p className="to">TO</p>
          <input type="date"></input>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="transaction-form">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Account ID"
            value={formData.accountId}
            onChange={(e) =>
              setFormData({ ...formData, accountId: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <button type="submit">Add Transaction</button>
        </form>
      )}

      <table className="allTransactions">
        <thead>
          <tr>
            <th>{}</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>
                  <img
                    alt="icon"
                    className="categoryIcon"
                    src={categoryToIcon[transaction.type] || misc}
                  />
                </td>
                <td>{transaction.name}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.type}</td>
                <td>{formatDate(transaction)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="noTransactions">
                No transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
