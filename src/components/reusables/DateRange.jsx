import "../styles/transactions.css";

export default function DateRange({
  afterDate,
  setAfterDate,
  beforeDate,
  setBeforeDate,
  apply,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDateRange = (e) => {
    const currBeforeDate = e.target.value;
    const beforeDateComp = new Date(currBeforeDate);
    const afterDateComp = new Date(afterDate);
    if (beforeDateComp < afterDateComp) {
      alert("Incorrect date range. Please try again");
    } else {
      setBeforeDate(currBeforeDate);
    }
  };
  return (
    <div className="total-date-range">
      <div className="date-selectors">
        <div className="fromTo">
          <div className="from-to-div">
            <p className="from">FROM</p>
            <input
              id="input-date-from"
              type="date"
              className="inputDate"
              value={afterDate}
              onChange={(e) => setAfterDate(e.target.value)}
            ></input>
          </div>
          <div className="from-to-div">
            <p className="to">TO</p>
            <input
              id="input-date-to"
              type="date"
              max={today.toLocaleDateString("en-CA")}
              className="inputDate"
              value={beforeDate}
              onChange={checkDateRange}
            ></input>
          </div>
        </div>
        <span className="apply-filter-button" onClick={apply}>
          &rarr;
        </span>
      </div>
    </div>
  );
}
