/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import LoadingBar from "./reusables/bars/LoadingBar.jsx";
import DateRange from "./reusables/input/DateRange.jsx";
import IconButton from "./reusables/buttons/IconButton.jsx";
import TextButton from "./reusables/buttons/TextButton.jsx";
import EditInput from "./reusables/input/EditInput.jsx";
import OptionInput from "./reusables/input/OptionInput.jsx";
import { formatDate } from "../data/aux/formatDate.js";
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
import MobileTransactions from "./reusables/transactions/MobileTransactions.jsx";
import DesktopTransactions from "./reusables/transactions/DesktopTransactions.jsx";
import PaginationBar from "./reusables/bars/PaginationBar.jsx";

function Transactions() {
  const network = new Network();

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

  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [paginationCursor, setPaginationCursor] = useState(null);
  const [_, setHasMore] = useState(true);

  const showFilteredTransactions = async (isReset = false) => {
    setLoadingState(true);
    const cursorParam = isReset ? 0 : paginationCursor;
    try {
      const response = await network.get(
        `/transactions?after=${afterDate}&before=${beforeDate}&cursor=${cursorParam}`,
      );
      console.log(JSON.stringify(response.data));
      const transactionList = response.data.transactionJsonList;
      setTransactions(transactionList);
      setPaginationCursor(response.data.cursor);
      transactionList.length > 20 ? setHasMore(true) : setHasMore(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    showFilteredTransactions(true);
  }, []);

  const [editingRowId, setEditingRowId] = useState("");
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    isTaxable: "",
    amount: "",
    createdOn: "",
  });

  const [originalData, setOriginalData] = useState(null);
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

    const initialValues = {
      name: transaction.name,
      type: transaction.type,
      isTaxable: transaction.isTaxable,
      amount: transaction.amount != null ? transaction.amount.toString() : "",
      createdOn: formattedDate,
    };

    setEditFormData(initialValues);
    setOriginalData(initialValues);
  };

  const cancelEdit = () => {
    setEditingRowId("");
    setEditFormData({
      name: "",
      type: "",
      amount: "",
      isTaxable: "",
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

    const payload = {};
    payload.id = transactionId;

    if (editFormData.name !== originalData.name) {
      payload.name = editFormData.name;
    }

    const currentAmount = parseFloat(editFormData.amount);
    const prevAmount = parseFloat(originalData.amount);
    if (currentAmount !== prevAmount) {
      payload.amount = currentAmount;
    }

    if (editFormData.type !== originalData.type) {
      payload.type = editFormData.type;
    }

    if (editFormData.isTaxable !== originalData.isTaxable) {
      payload.isTaxable = editFormData.isTaxable;
    }

    if (editFormData.createdOn !== originalData.createdOn) {
      payload.createdOn = editFormData.createdOn + "T00:00:00";
    }

    try {
      const response = await network.patch(
        `/transactions/${transactionId}`,
        payload,
      );
      if (response.status === 200) {
        showFilteredTransactions();
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
      showFilteredTransactions();
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
      <LoadingBar loading={loadingState}>
        {transactions && transactions.length > 0 ? (
          isMobile ? (
            <MobileTransactions {...sharedProps} />
          ) : (
            <DesktopTransactions {...sharedProps} />
          )
        ) : (
          <p className="no-transactions">No transactions found</p>
        )}
        {transactions && transactions.length > 0 && (
          <PaginationBar
            pageNumber={pageNumber}
            pageSize={20}
            totalTransactions={transactions.length}
            onPageChange={(pageNumber) => showFilteredTransactions(pageNumber)}
          />
        )}
      </LoadingBar>
    </div>
  );
}

export default Transactions;
