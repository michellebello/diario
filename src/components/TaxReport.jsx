/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ListFilter, Send } from "lucide-react";
import DropdownFilters from "./reusables/input/DropdownFilters";
import EditInput from "./reusables/input/EditInput";
import { CATEGORY_LIST } from "../data/aux/CategoryList";
import { formatDate } from "../data/aux/formatDate";
import Network from "../utils/network";
import "../components/styles/tax-report.css";
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

const monthToNum = new Map([
  ["January", 1],
  ["February", 2],
  ["March", 3],
  ["April", 4],
  ["May", 5],
  ["June", 6],
  ["July", 7],
  ["August", 8],
  ["September", 9],
  ["October", 10],
  ["November", 11],
  ["December", 12],
]);

const yearOptions = ["2024", "2025", "2026"];

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
function TaxReport() {
  const network = new Network();
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [taxableTransactions, setTaxableTransactions] = useState([]);

  const fetchTaxableTransactions = async () => {
    const params = new URLSearchParams();
    const monthValue = monthFilter ? monthToNum.get(monthFilter) : null;
    if (yearFilter) {
      params.append("year", yearFilter);
    }
    if (monthValue) {
      params.append("month", monthValue);
    }
    if (categoryFilter) {
      params.append("category", categoryFilter);
    }
    const response = await network.get(
      `/transactions/taxable?${params.toString()}`,
    );
    if (response.status === 200) {
      setTaxableTransactions(response.data);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    fetchTaxableTransactions();
  }, []);

  const [transactionNote, setTransactionNote] = useState({});
  const handleAddTransactionNote = async (id, note) => {
    setTransactionNote((prev) => ({
      ...prev,
      [id]: note,
    }));
    console.log("note: " + note + " ,added for transaction id : " + id);
  };

  return (
    <div className="tax-report-content">
      <div className="tax-report-top">
        <p className="tax-report-title">My Tax Reports</p>
        <p className="tax-report-subtitle">
          Manage transactions that count towards tax deductions
        </p>
      </div>
      <div className="tax-reports-filters-container">
        <div className="tax-reports-filters-top">
          <ListFilter size="clamp(0.9rem, 1.2vw, 1.2rem)" />
          <p className="tax-report-subtitle">Filters</p>
        </div>

        <div className="tax-report-filters-div">
          <DropdownFilters
            id="month-dropdown-filter"
            value={monthFilter}
            onChange={setMonthFilter}
            defaultText="Select a month"
            options={Array.from(monthToNum.keys())}
          />
          <DropdownFilters
            id="year-dropdown-filter"
            value={yearFilter}
            onChange={setYearFilter}
            defaultText="Select a year"
            options={yearOptions}
          />
          <DropdownFilters
            id="cat-dropdown-filter"
            value={categoryFilter}
            onChange={setCategoryFilter}
            defaultText="Select a category"
            options={CATEGORY_LIST}
          />
          <button
            className="tax-report-button"
            onClick={fetchTaxableTransactions}
          >
            <Send
              className="tax-report-button-icon"
              size="clamp(1rem, 1.2vw, 1.2rem)"
            />
          </button>
        </div>
      </div>
      <div className="allTransactions-div">
        <div className="table-scroll">
          {taxableTransactions.length < 1 ? (
            <p>No transactions found.</p>
          ) : (
            <table className="allTransactions">
              <colgroup>
                <col style={{ width: "7%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>{}</th>
                  <th>Expense</th>
                  <th>Note</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Account Number</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {taxableTransactions.map((t, index) => {
                  const Icon = categoryToIcon[t.category] || Plus;
                  return (
                    <tr
                      key={t.id}
                      className={`${index % 2 === 0 ? "even-row" : "odd-row"} `}
                    >
                      <td>
                        <Icon
                          strokeWidth={2}
                          size={32}
                          className="transaction-type-icon"
                          width="clamp(2rem, 3vw, 5rem)"
                        />{" "}
                      </td>
                      <td>{t.name}</td>
                      <td className="table-note-row">
                        {t.note !== "" ? (
                          <div className="tax-report-note-div">
                            <p className="tax-report-note">{t.note}</p>
                          </div>
                        ) : (
                          <div className="table-note-edit-row">
                            <EditInput
                              placeholder="Add a note (ex. donation)"
                              value={transactionNote[t.id] || ""}
                              onChange={(e) =>
                                handleAddTransactionNote(t.id, e.target.value)
                              }
                              inputName="note"
                              inputType="text"
                            />
                            {transactionNote.length > 0 && (
                              <button className="table-note-edit-button">
                                ✓
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                      <td
                        className={`transaction-amount 
                              ${t.typeName !== "Expense" ? "plus" : ""}`}
                      >
                        {t.typeName !== "Expense"
                          ? `+ $${t.amount.toFixed(2)}`
                          : `- $${t.amount.toFixed(2)}`}
                      </td>
                      <td>
                        <div className="transaction-type-container">
                          <p className="transaction-type-cat">{t.category}</p>
                        </div>
                      </td>
                      <td>{t.accountNumber}</td>
                      <td>{formatDate(t)}</td>
                      <td className="transaction-modify-buttons"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaxReport;
