import { Plus } from "lucide-react";
import EditInput from "../input/EditInput";
export default function MobileTaxReport({
  loaded,
  taxableTransactions,
  categoryToIcon,
  transactionNote,
  handleAddTransactionNote,
  addTransactionNote,
  formatDate,
}) {
  return (
    <div className="mobile-transactions">
      {taxableTransactions.map((transaction) => {
        const Icon = categoryToIcon[transaction.category] || Plus;
        return (
          <div key={transaction.id} className="transaction-card">
            <div className="transaction-card-content">
              {/* Header */}
              <div className="card-header">
                <div className="card-title-div">
                  <Icon size={20} className="card-icon" />
                  <p className="card-title">{transaction.name}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="card-row">
                <span className="label">Amount</span>
                <span
                  className={`amount ${
                    transaction.typeName !== "Expense" ? "plus" : "minus"
                  }`}
                >
                  {transaction.typeName !== "Expense"
                    ? `+ $${transaction.amount.toFixed(2)}`
                    : `- $${transaction.amount.toFixed(2)}`}
                </span>
              </div>

              {/* Category */}
              <div className="card-row">
                <span className="label">Category</span>

                <div className="category-block">
                  <span className="category-block-values">
                    {transaction.category}
                  </span>
                  {transaction.isTaxable && (
                    <span className="tax-badge">Taxable</span>
                  )}
                </div>
              </div>

              {/* Note */}
              <div className="card-row">
                <span className="label">Note</span>
                {transaction.note.length > 0 ? (
                  <span className="taxable-note">{transaction.note}</span>
                ) : (
                  <div className="card-input-wrapper">
                    <EditInput
                      placeholder="Add a note (ex. donation)"
                      value={transactionNote[transaction.id] || ""}
                      onChange={(e) =>
                        handleAddTransactionNote(transaction.id, e.target.value)
                      }
                      inputName="note"
                      inputType="text"
                    />
                    {transactionNote[transaction.id] && (
                      <button
                        onClick={() => addTransactionNote(transaction.id)}
                        className="table-note-edit-button"
                      >
                        ✓
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Account */}
              <div className="card-row">
                <span className="label">Account</span>
                <span className="category-values">
                  {transaction.accountNumber}
                </span>
              </div>

              {/* Date */}
              <div className="card-row">
                <span className="label">Date</span>
                <span className="category-values">
                  {formatDate(transaction)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
