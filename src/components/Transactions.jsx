/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormComponent from "./reusables/FormComponent.jsx";
import { RotatingLines } from "react-loader-spinner";
import DateRange from "./reusables/DateRange";
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
import { Pen, X } from "lucide-react";
import "./styles/transactions.css";

function Transactions() {
  const network = new Network();
  const [loadingState, setLoadingState] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { formVisibility, formLabel, closeForm } = useOutletContext();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   type: "",
  //   amount: "",
  //   accountId: "",
  //   date: "",
  // });
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

  const fetchTransactions = async () => {
    setLoadingState(true);
    try {
      const response = await network.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatDate = (transaction) => {
    if (!transaction.createdOn) return "N/A";
    const [year, month, day] = transaction.createdOn;
    return `${month}/${day}/${year}`;
  };

  const handleTransactionAdded = () => {
    closeForm();
    fetchTransactions();
  };

  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const showFilteredTransactions = async () => {
    await network
      .get("/transactions?after=" + afterDate + "&before=" + beforeDate)
      .then((result) => {
        setTransactions(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTransaction = async () => {};

  const deleteTransaction = async (transactionId) => {
    const response = await network.delete(`/transactions/${transactionId}`);
    console.log(response);
    if (response.data === "Successfully deleted transaction") {
      setTransactions((prev) => {
        prev.filter((transaction) => transaction.id !== transactionId);
      });
      window.location.reload();
    } else {
      alert("Could not delete transaction");
    }
  };

  return (
    <div className="main-content">
      <div className="topTransaction">
        <p className="title">Transactions Table View </p>
        <DateRange
          afterDate={afterDate}
          setAfterDate={setAfterDate}
          beforeDate={beforeDate}
          setBeforeDate={setBeforeDate}
          apply={showFilteredTransactions}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {formVisibility && (
        <FormComponent
          formLabel={formLabel}
          onCancel={closeForm}
          onTransactionAdded={handleTransactionAdded}
        />
      )}
      {loadingState ? (
        <RotatingLines
          strokeColor="grey"
          animationDuration="2.75"
          visible={true}
        />
      ) : (
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
                  <td className="transaction-modify-buttons">
                    <div className="transaction-modify-buttons-div">
                      <button
                        className="transaction-button-edit"
                        onClick={() => editTransaction(transaction.id)}
                      >
                        <Pen className="transaction-button-symbol"></Pen>
                      </button>
                      <button
                        className="transaction-button-delete"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <X className="transaction-button-symbol"></X>
                      </button>
                    </div>
                  </td>
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
      )}
    </div>
  );
}

export default Transactions;
