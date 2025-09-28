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

    let year, month, day;

    if (Array.isArray(transaction.createdOn)) {
      // backend returns array
      [year, month, day] = transaction.createdOn;
    } else if (typeof transaction.createdOn === "string") {
      // backend returns string ("YYYY-MM-DDTHH:mm:ss")
      const [datePart] = transaction.createdOn.split("T"); // taking "YYYY-MM-DD"
      [year, month, day] = datePart.split("-").map(Number);
    }

    return `${String(month).padStart(2, "0")}/${String(day).padStart(
      2,
      "0"
    )}/${year}`;
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

  const [editingRowId, setEditingRowId] = useState("");
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    amount: "",
    createdOn: "",
  });

  const startEdit = (transaction) => {
    setEditingRowId(transaction.id);
    let formattedDate = "";

    if (Array.isArray(transaction.createdOn)) {
      const [year, month, day] = transaction.createdOn;
      formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
    } else {
      formattedDate = transaction.createdOn.split("T")[0];
    }

    if (isNaN(parseFloat(transaction.amount))) {
      alert("Amount entered is not a number");
    }

    setEditFormData({
      name: transaction.name ?? "",
      type: transaction.type ?? "",
      amount: transaction.amount != null ? transaction.amount.toString() : "",
      createdOn: formattedDate,
    });
  };

  const cancelEdit = () => {
    setEditingRowId("");
    setEditFormData({
      name: "",
      type: "",
      amount: "",
      createdOn: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEdit = async (transactionId) => {
    const parsedAmount = parseFloat(editFormData.amount);
    if (isNaN(parsedAmount)) {
      alert("Amount entered is not a number");
      return;
    }

    try {
      const payload = {
        name: editFormData.name,
        type: editFormData.type,
        amount: parseFloat(editFormData.amount),
        createdOn: editFormData.createdOn + "T00:00:00",
      };
      console.log("payload sent was " + JSON.stringify(payload));

      const response = await network.patch(
        `/transactions/${transactionId}`,
        payload
      );
      console.log("save button response " + JSON.stringify(response));
      if (response.data === "Transaction successfully updated.") {
        setTransactions((prev) => {
          const newTransactionArr = prev.map((t) =>
            t.id === transactionId ? { ...t, ...payload } : t
          );
          console.log(
            "updated transactions is " + JSON.stringify(newTransactionArr)
          );
          return newTransactionArr;
        });
        setEditingRowId(null);
      } else {
        alert(`An error occured: ${JSON.stringify(response.data)}`);
      }
    } catch (err) {
      alert("Error updating transaction, try again");
    }
  };

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
            {transactions && transactions?.length > 0 ? (
              transactions.map((transaction, index) => {
                const isEditing = transaction.id === editingRowId;
                return (
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
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name || ""}
                          onChange={handleEditChange}
                        />
                      ) : (
                        transaction.name
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="amount"
                          value={editFormData.amount || ""}
                          onChange={handleEditChange}
                        />
                      ) : (
                        `$${transaction.amount.toFixed(2)}`
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="type"
                          value={editFormData.type || ""}
                          onChange={handleEditChange}
                        />
                      ) : (
                        transaction.type
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="date"
                          name="createdOn"
                          value={editFormData.createdOn}
                          onChange={handleEditChange}
                        />
                      ) : (
                        formatDate(transaction)
                      )}
                    </td>
                    <td className="transaction-modify-buttons">
                      <div className="transaction-modify-buttons-div">
                        {isEditing ? (
                          <>
                            <button
                              className="transaction-button-edit-save"
                              onClick={() => submitEdit(transaction.id)}
                            >
                              Save
                            </button>
                            <button
                              className="transaction-button-edit-cancel"
                              onClick={() => cancelEdit()}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="transaction-button-edit"
                              onClick={() => startEdit(transaction)}
                            >
                              <Pen className="transaction-button-symbol"></Pen>
                            </button>
                            <button
                              className="transaction-button-delete"
                              onClick={() => deleteTransaction(transaction.id)}
                            >
                              <X className="transaction-button-symbol"></X>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
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
