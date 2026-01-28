import "../../../components/styles/budget-reusables.css";

export function BudgetTopCards({ cardTitle, amount, amountColor }) {
  return (
    <div className="budget-top-card-total">
      <p className="budget-top-card-title">{cardTitle}</p>
      <p className="budget-top-card-amount" style={{ color: amountColor }}>
        {amount}
      </p>
    </div>
  );
}
