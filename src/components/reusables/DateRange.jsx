export default function DateRange({
  afterDate,
  setAfterDate,
  beforeDate,
  setBeforeDate,
  apply,
}) {
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
    <div className="fromTo">
      <p className="from">FROM</p>
      <input
        type="date"
        className="inputDate"
        value={afterDate}
        onChange={(e) => setAfterDate(e.target.value)}
      ></input>
      <p className="to">TO</p>
      <input
        type="date"
        className="inputDate"
        value={beforeDate}
        onChange={checkDateRange}
      ></input>
      <span className="apply-filter-button" onClick={apply}>
        &rarr;
      </span>
    </div>
  );
}
