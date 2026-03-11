export const formatDate = (transaction) => {
  if (!transaction.createdOn) return "N/A";

  let year, month, day;

  if (Array.isArray(transaction.createdOn)) {
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
