import { useEffect, useState } from "react";
import Network from "../utils/network.js";

function Transactions() {
  const network = new Network();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    network
      .get("/transactions")
      .then((result) => {
        setTransactions(result.data);
      })
      .catch((err) =>
        console.error("Ohhrrr Nohhhrrr!! An errrorr ocurrred!: ", err)
      );
  }, []);

  return (
    <div className="transactions">
      <div className="topTransaction">
        <p className="title">Tracked expenses</p>
        <div className="fromTo">
          <p className="from">FROM</p>
          <p className="to">TO</p>
          <div>
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                return (
                  <div>
                    <p>{transaction.name}</p>
                    <p>{transaction.amount}</p>
                  </div>
                );
              })
            ) : (
              <p>No transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
