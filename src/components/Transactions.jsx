import { useState } from "react";
import Network from "../utils/network.js";

function Transactions() {
  const network = new Network();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      let result = await network.get("/transactions");
      console.log(result.data);
      setTransactions(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (transactions.length === 0) {
    getTransactions();
  }

  return (
    <div className="transactions">
      <div className="topTransaction">
        <p className="title">Tracked expenses</p>
        <div className="fromTo">
          <p className="from">FROM</p>
          <p className="to">TO</p>
          <div>
            {transactions.map((transaction) => (
              <div>
                <p>{transaction.name}</p>
                <p>{transaction.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
