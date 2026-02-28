import { Plus } from "lucide-react";
import "../../styles/mobile-transactions.css";

function MobileTransactions({
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
}) {
  if (!transactions || transactions.length === 0) {
    return <p className="no-transactions">No transactions found</p>;
  }

  return (
    <div className="mobile-transactions">
      {transactions.map((transaction) => {
        const isEditing = transaction.id === editingRowId;
        const Icon = categoryToIcon[transaction.category] || Plus;

        return (
          <div key={transaction.id} className="transaction-card">
            <div className="transaction-card-content">
              {/* Header */}
              <div className="card-header">
                <div className="card-title-div">
                  <Icon size={20} className="card-icon" />
                  {isEditing ? (
                    <EditInput
                      value={editFormData.name || ""}
                      inputName="name"
                      inputType="text"
                      onChange={handleEditChange}
                    />
                  ) : (
                    <p className="card-title">{transaction.name}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="card-actions">
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
              </div>

              {/* Amount */}
              <div className="card-row">
                <span className="label">Amount</span>
                {isEditing ? (
                  <EditInput
                    value={editFormData.amount || ""}
                    inputName="amount"
                    inputType="text"
                    onChange={handleEditChange}
                  />
                ) : (
                  <span
                    className={`amount ${
                      transaction.typeName !== "Expense" ? "plus" : "minus"
                    }`}
                  >
                    {transaction.typeName !== "Expense"
                      ? `+ $${transaction.amount.toFixed(2)}`
                      : `- $${transaction.amount.toFixed(2)}`}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="card-row">
                <span className="label">Category</span>
                {isEditing ? (
                  <OptionInput
                    value={editFormData.category || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  <div className="category-block">
                    <span className="category-block-values">
                      {transaction.category}
                    </span>
                    {transaction.isTaxable && (
                      <span className="tax-badge">Taxable</span>
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
                {isEditing ? (
                  <EditInput
                    value={editFormData.createdOn}
                    inputName="createdOn"
                    inputType="date"
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className="category-values">
                    {formatDate(transaction)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MobileTransactions;
