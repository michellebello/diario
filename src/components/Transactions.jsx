/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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
import { useUserData } from "../data/user/fetchAndSaveUserData.js";
import MobileTransactions from "./reusables/transactions/MobileTransactions.jsx";
import DesktopTransactions from "./reusables/transactions/DesktopTransactions.jsx";

function Transactions() {
  const network = new Network();
  const { userInfo, setUserInfo } = useAppContext();
  const fetchUserData = useUserData();
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
      category: transaction.category ?? "",
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
        await fetchUserData();
        setEditingRowId(null);
      } else {
        alert(`An error occured: ${JSON.stringify(response.data)}`);
      }
    } catch (err) {
      alert("Error updating transaction, try again");
    }
  };

  const deleteTransaction = async (transactionId) => {
    console.log("transaction id is " + transactionId);
    const response = await network.delete(`/transactions/${transactionId}`);
    if (response.data === "Successfully deleted transaction") {
      await fetchUserData();
    } else {
      alert("Could not delete transaction");
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 685);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 685px)");

    const listener = () => setIsMobile(media.matches);

    listener();
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const sharedProps = {
    transactions,
    editingRowId,
    editFormData,
    startEdit,
    cancelEdit,
    submitEdit,
    deleteTransaction,
    handleEditChange,
    formatDate,
    categoryToIcon,
    EditInput,
    OptionInput,
    IconButton,
    TextButton,
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
        isMobile ? (
          <MobileTransactions {...sharedProps} />
        ) : (
          <DesktopTransactions {...sharedProps} />
        )
      ) : (
        <p className="no-transactions">No transactions found</p>
      )}
    </div>
  );
}

export default Transactions;
