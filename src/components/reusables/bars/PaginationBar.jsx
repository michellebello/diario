import "../../styles/pagination-bar.css";
export default function PaginationBar({ showMoreTransactions }) {
  return (
    <div className="pagination-bar-total">
      <button
        className="pagination-bar-button"
        onClick={() => showMoreTransactions()}
      >
        <p className="pagination-text">Load more</p>{" "}
      </button>
    </div>
  );
}
