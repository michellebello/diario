import React from "react";
import { useSearchParams } from "react-router-dom";

function AddItem() {
  const [searchParams] = useSearchParams();
  const itemType = searchParams.get("type");

  return (
    <div className="formContainer">
      <div className="addItemForm">
        <label htmlFor="itemName">{itemType}:</label>
        <input id="itemName" type="text" placeholder={`Ex. ${itemType}`} />
      </div>
    </div>
  );
}

export default AddItem;
