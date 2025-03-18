import React, { useState, useEffect } from "react";
import Network from "../utils/network.js";
// import d3 from "d3";

function DonutChart() {
  const [transactionMap, setTransactionMap] = useState("");

  const network = new Network();
  const transactionsBreakdown = async () => {
    const result = await network.get("/transactions");
    const transactionData = result.data;
    // hashmap with key as transaction category and value as total money spent in that transaction
    const totalPerCategory = new Map();
    for (let transaction of transactionData) {
      const category = transaction.type;
      if (totalPerCategory.has(category)) {
        let total = totalPerCategory.get(category);
        total = total + transaction.amount;
        totalPerCategory.set(category, total);
      } else {
        totalPerCategory.set(category, transaction.amount);
      }
    }
    console.log(totalPerCategory);
    setTransactionMap(totalPerCategory);
  };

  useEffect(() => {
    transactionsBreakdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p> Donut chart</p>
      {transactionMap ? (
        <p>{JSON.stringify([...transactionMap.entries()])}</p>
      ) : (
        <p>none</p>
      )}
    </div>
  );
}

export default DonutChart;
