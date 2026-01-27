/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../contexts/context.jsx";
import FormComponent from "./reusables/FormComponent.jsx";
import { RotatingLines } from "react-loader-spinner";
import DateRange from "./reusables/DateRange";
import IconButton from "./reusables/buttons/IconButton.jsx";
import TextButton from "./reusables/buttons/TextButton.jsx";
import EditInput from "./reusables/input/EditInput.jsx";
import OptionInput from "./reusables/input/OptionInput.jsx";
import Network from "../utils/network.js";

import {
  ShoppingBasket,
  Utensils,
  PiggyBank,
  Wrench,
  House,
  Fuel,
  TramFront,
  ShoppingCart,
  HeartPlus,
  Dog,
  GraduationCap,
  Drama,
  TvMinimalPlay,
  Rows3,
  Plus,
} from "lucide-react";

import "./styles/transactions.css";

function Transactions() {
  const network = new Network();
  const { userInfo, setUserInfo } = useAppContext();
  const transactions = userInfo.transactions;
  const loadingState = userInfo.loading.transactions;
  const { formVisibility, formLabel, closeForm } = useOutletContext();

  const categoryToIcon = {
    Groceries: ShoppingBasket,
    "Eat Out": Utensils,
    Income: PiggyBank,
    Utilities: Wrench,
    Rent: House,
    Car: Fuel,
    Transportation: TramFront,
    Shopping: ShoppingCart,
    Health: HeartPlus,
    Pet: Dog,
    Education: GraduationCap,
    Entertainment: Drama,
    Streaming: TvMinimalPlay,
    Miscenallenous: Rows3,
    Other: Plus,
  };

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
      "0",
    )}/${year}`;
  };

  const handleTransactionAdded = () => {
    closeForm();
  };

  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const showFilteredTransactions = async () => {
    await network
      .get("/transactions?after=" + afterDate + "&before=" + beforeDate)
      .then((result) => {
        setUserInfo((prev) => ({
          ...prev,
          transactions: result.data,
        }));
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
        day,
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
    e.preventDefault();
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

      const response = await network.patch(
        `/transactions/${transactionId}`,
        payload,
      );
      if (response.data === "Transaction successfully updated.") {
        setUserInfo((prev) => ({
          ...prev,
          transactions: prev.transactions.map((t) =>
            t.id === transactionId ? { ...t, ...payload } : t,
          ),
        }));
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
    if (response.data === "Successfully deleted transaction") {
      setUserInfo((prev) => ({
        ...prev,
        transactions: prev.transactions.filter((t) => t.id !== transactionId),
      }));
    } else {
      alert("Could not delete transaction");
    }
  };

  return (
    <div className="transaction-content">
      {formVisibility && (
        <div className="addItemForm-container">
          <FormComponent
            formLabel={formLabel}
            onCancel={closeForm}
            onTransactionAdded={handleTransactionAdded}
          />
        </div>
      )}

      <div className="topTransaction">
        <p className="title">Transactions Table View</p>
        <DateRange
          className="date-range"
          afterDate={afterDate}
          setAfterDate={setAfterDate}
          beforeDate={beforeDate}
          setBeforeDate={setBeforeDate}
          apply={showFilteredTransactions}
        />
      </div>

      {loadingState ? (
        <RotatingLines
          strokeColor="grey"
          animationDuration="2.75"
          visible={true}
        />
      ) : transactions && transactions.length > 0 ? (
        <div className="allTransactions-div">
          <table className="allTransactions">
            <thead>
              <tr>
                <th>{}</th>
                <th>Expense</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Account Number</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const isEditing = transaction.id === editingRowId;
                const Icon = categoryToIcon[transaction.type] || Plus;
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>
                      <Icon
                        strokeWidth={2}
                        size={32}
                        className="transaction-type-icon"
                      />{" "}
                    </td>
                    <td>
                      {isEditing ? (
                        <EditInput
                          value={editFormData.name || ""}
                          inputName="name"
                          inputType="text"
                          onChange={handleEditChange}
                        />
                      ) : (
                        transaction.name
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <EditInput
                          value={editFormData.amount || ""}
                          inputName="amount"
                          inputType="text"
                          onChange={handleEditChange}
                        />
                      ) : (
                        `$${transaction.amount.toFixed(2)}`
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <OptionInput
                          value={editFormData.type || ""}
                          onChange={handleEditChange}
                        />
                      ) : (
                        <div className="transaction-type-container">
                          <p className="transaction-type-cat">
                            {transaction.type}
                          </p>
                        </div>
                      )}
                    </td>
                    <td>{transaction.accountNumber}</td>
                    <td>
                      {isEditing ? (
                        <EditInput
                          value={editFormData.createdOn}
                          inputName="createdOn"
                          inputType="date"
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
                            <TextButton
                              text="Save"
                              bgColor="#ffffff"
                              fontColor="#4e4c4c"
                              onClick={() => submitEdit(transaction.id)}
                            />
                            <TextButton
                              text="Cancel"
                              bgColor="#ffffff"
                              fontColor="#ba6e6eff"
                              onClick={cancelEdit}
                            />
                          </>
                        ) : (
                          <>
                            <IconButton
                              type="edit"
                              color="#797575"
                              onClick={() => startEdit(transaction)}
                            />
                            <IconButton
                              type="delete"
                              color="#797575"
                              onClick={() => deleteTransaction(transaction.id)}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-transactions">No transactions found</p>
      )}
    </div>
  );
}

export default Transactions;
