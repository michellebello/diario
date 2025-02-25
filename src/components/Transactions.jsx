/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import deposit from "./pictures/deposit.png";
import eatOut from "./pictures/eatout.png";
import transport from "./pictures/transportation.png";
import groceries from "./pictures/groceries.png";
import shopping from "./pictures/shopping.png";
import entertainment from "./pictures/entertainment.webp";
import pet from "./pictures/pet.png";
import education from "./pictures/school.svg";
import misc from "./pictures/misc.png";
import Network from "../utils/network.js";
import "./styles/transactions.css";

function Transactions() {
  const network = new Network();
  const [transactions, setTransactions] = useState([]);

  const categoryToIcon = {
    Deposit: deposit,
    Food: eatOut,
    Transportation: transport,
    Groceries: groceries,
    Shopping: shopping,
    Entertainment: entertainment,
    Pet: pet,
    Education: education,
    Miscellaneous: misc,
  };

  useEffect(() => {
    network
      .get("/transactions")
      .then((result) => {
        setTransactions(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (transaction) => {
    let dateArray = transaction.createdOn;
    const year = dateArray[0].toString();
    const month = dateArray[1].toString();
    const day = dateArray[3].toString();
    return month + "/" + day + "/" + year;
  };

  return (
    <div className="main-content">
      <div className="topTransaction">
        <p className="title">Tracked expenses</p>
        <div className="fromTo">
          <p className="from">FROM</p>
          <input type="date"></input>
          <p className="to">TO</p>
          <input type="date"></input>
        </div>
      </div>
      <table className="allTransactions">
        <thead>
          <tr>
            <th>{}</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>
                  <img
                    alt="icon"
                    className="categoryIcon"
                    src={categoryToIcon[transaction.type] || misc}
                  ></img>
                </td>
                <td>{transaction.name}</td>
                <td>{transaction.amount.toFixed(2)}</td>
                <td>{transaction.type}</td>
                <td>{formatDate(transaction)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="noTransactions">
                No transactions
              </td>
              <td>Try again later</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
