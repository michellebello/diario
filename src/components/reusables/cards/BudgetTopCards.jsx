import "../../../components/styles/budget-reusables.css";

export function BudgetTopCards({
  cardTitle,
  cardSecondTitle = "",
  amount,
  amountColor,
}) {
  return (
    <div className="budget-top-card-total">
      <div className="budget-top-card-titles">
        <p className="budget-top-card-title">{cardTitle}</p>
        {cardSecondTitle && (
          <p className="budget-top-card-second-title">{cardSecondTitle}</p>
        )}
      </div>
      <p className="budget-top-card-amount" style={{ color: amountColor }}>
        {amount}
      </p>
    </div>
  );
}
