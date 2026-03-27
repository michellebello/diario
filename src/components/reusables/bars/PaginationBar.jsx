import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/pagination-bar.css";
export default function PaginationBar({
  pageNumber,
  pageSize,
  totalTransactions,
  onPageChange,
}) {
  return (
    <div className="pagination-bar-total">
      <button
        className="pagination-bar-button"
        disabled={pageNumber === 0}
        onClick={() => onPageChange(pageNumber - 1)}
      >
        <ChevronLeft color="#333578" width="clamp(0.85rem, 1wv, 1.05rem)" />
      </button>
      <span className="pagination-bar-span">Page {pageNumber + 1}</span>

      <button
        className="pagination-bar-button"
        disabled={totalTransactions < pageSize}
        onClick={() => onPageChange(pageNumber + 1)}
      >
        <ChevronRight color="#333578" width="clamp(0.85rem, 1wv, 1.05rem)" />
      </button>
    </div>
  );
}
