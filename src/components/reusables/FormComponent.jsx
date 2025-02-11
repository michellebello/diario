import "../styles/sidebar.css";

function FormComponent({ formLabel }) {
  return (
    <form className="addItemForm">
      <p className="itemType">{formLabel}</p>
      <div className="entry">
        <label className="entryLabel">Name</label>
        <input
          className="entryInput"
          type="text"
          placeholder="Ex. Shake Shack"
        />
      </div>
      <div className="entry">
        <label className="entryLabel">Spending account</label>
        <input
          className="entryInput"
          type="text"
          placeholder="Chase XXXXXXX1234"
        />
      </div>
      <div className="entry">
        <label className="entryLabel">Date</label>
        <input className="entryInput" type="date" />
      </div>
      <div className="entry">
        <label className="entryLabel">Category</label>
        <input className="entryInput" type="text" placeholder="Eat Out" />
      </div>
      <div className="entry">
        <label className="entryLabel">Amount</label>
        <input
          className="entryInput"
          type="number"
          min="0"
          step="0.01"
          placeholder="$12.34"
        />
      </div>
      <div className="buttons">
        <button className="addButton">Add</button>
        <button className="cancelButton">Cancel</button>
      </div>
    </form>
  );
}

export default FormComponent;
