export default function DateRange({
  afterDate,
  setAfterDate,
  beforeDate,
  setBeforeDate,
  apply,
}) {
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
        // add validation if(beforeDate > afterDate) { set else { alert ("")}}
        onChange={(e) => {
          setBeforeDate(e.target.value);
        }}
      ></input>
      <span className="apply-filter-button" onClick={apply}>
        &rarr;
      </span>
    </div>
  );
}
