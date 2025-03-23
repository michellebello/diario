// import React, { useState, useEffect } from "react";
// import "../styles/donutchart.css";
// import Network from "/Users/michelle/code/diario/src/utils/network.js";

// function TransactionsBreakdown() {
//   const network = new Network();
//   const [transactionMap, setTransactionMap] = useState(new Map());

//   const getTransactionBreakdown = async () => {
//     const result = await network.get("/transactions");
//     const transactionData = result.data;
//     const totalPerCategory = new Map();
//     for (let transaction of transactionData) {
//       const category = transaction.type;
//       if (totalPerCategory.has(category)) {
//         let total = totalPerCategory.get(category);
//         total = total + transaction.amount;
//         totalPerCategory.set(category, total);
//       } else {
//         totalPerCategory.set(category, transaction.amount);
//       }
//     }
//     setTransactionMap(transactionData);
//   };

//   useEffect(() => {
//     getTransactionBreakdown();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="total-legend">
//       {transactionMap.forEach((key, value) => {
//         <div className="legend-row">
//           return (<p> {transactionMap.key}</p>)
//         </div>;
//       })}
//     </div>
//   );
// }

// export default TransactionsBreakdown;
