import { Plus } from "lucide-react";
import "../../styles/transactions.css";
function DesktopTransactions({
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
  return (
    <div className={`allTransactions-div ${editingRowId ? "editing" : ""}`}>
      <div className="table-scroll">
        <table className="allTransactions">
          <colgroup>
            <col style={{ width: "9%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
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
              const Icon = categoryToIcon[transaction.category] || Plus;
              return (
                <tr
                  key={transaction.id}
                  className={`${index % 2 === 0 ? "even-row" : "odd-row"} 
                                ${isEditing ? "editing-row" : ""}       
                    `}
                >
                  <td>
                    <Icon
                      strokeWidth={2}
                      size={32}
                      className="transaction-type-icon"
                      width="clamp(2rem, 3vw, 5rem)"
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
                  <td
                    className={`transaction-amount 
                              ${transaction.typeName !== "Expense" ? "plus" : ""}`}
                  >
                    {isEditing ? (
                      <EditInput
                        value={editFormData.amount || ""}
                        inputName="amount"
                        inputType="text"
                        onChange={handleEditChange}
                      />
                    ) : transaction.typeName !== "Expense" ? (
                      `+ $${transaction.amount.toFixed(2)}`
                    ) : (
                      `- $${transaction.amount.toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <OptionInput
                        value={editFormData.category || ""}
                        onChange={handleEditChange}
                      />
                    ) : (
                      <div className="transaction-type-container">
                        <p className="transaction-type-cat">
                          {transaction.category}
                        </p>
                        {transaction.isTaxable && (
                          <p className="transaction-taxable">Taxable</p>
                        )}
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
                        <div className="transaction-action-buttons-div">
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
                        </div>
                      ) : (
                        <div className="transaction-modify-buttons-div">
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
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DesktopTransactions;
