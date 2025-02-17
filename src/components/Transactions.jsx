/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Network from "../utils/network.js";
import "./styles/transactions.css";

function Transactions() {
  const network = new Network();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    network
      .get("/transactions")
      .then((result) => {
        setTransactions(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-content">
      <div className="topTransaction">
        <p className="title">Tracked expenses</p>
        <div className="fromTo">
          <p className="from">FROM</p>
          <p className="to">TO</p>
        </div>
      </div>
      <table className="allTransactions">
        <div className="headers">
          <header>Name</header>
          <header>Amount</header>
          <header>Category</header>
        </div>
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            return (
              <div className="transactionFlex">
                <p className="transactionLabel">{transaction.name}</p>
                <p className="transactionLabel">{transaction.amount}</p>
                <p className="transactionLabel">{transaction.type}</p>
              </div>
            );
          })
        ) : (
          <p>No transactions</p>
        )}
      </table>
    </div>
  );
}

export default Transactions;
