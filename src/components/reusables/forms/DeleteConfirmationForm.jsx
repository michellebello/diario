import "../../styles/accounts.css";
function DeleteConfirmationForm({ deletingObject, deleteFunction, closeForm }) {
  return (
    <div className="delete-account-total">
      <div className="delete-account-container">
        <p className="delete-account-message">
          {`Are you sure you want to delete this ${deletingObject}?`}
        </p>
        <div className="delete-account-buttons">
          <button className="delete-account-button" onClick={deleteFunction}>
            Yes
          </button>
          <button className="delete-account-button" onClick={closeForm}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationForm;
