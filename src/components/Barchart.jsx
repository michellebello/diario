import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import LoadingBar from "./reusables/bars/LoadingBar.jsx";
import Network from "../utils/network.js";
import DateRange from "./reusables/input/DateRange.jsx";
import Ebarchart from "./reusables/data-charts/echarts/Ebarchart.jsx";
import "./styles/barchart.css";

function Barchart() {
  const [transactionMap, setTransactionMap] = useState(new Map());
  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

  const network = new Network();
  const transactionsBreakdown = async () => {
    setLoadingState(true);
    try {
      let result = "";
      if (beforeDate && afterDate) {
        result = await network.get(
          "/transactions?after=" + afterDate + "&before=" + beforeDate,
        );
      } else {
        result = await network.get("/transactions");
      }
      const transactionData = result.data;
      const totalPerCategory = new Map();
      let totalExpense = 0;
      for (let transaction of transactionData) {
        const category = transaction.category;
        if (category !== "Income") {
          if (totalPerCategory.has(category)) {
            let total = totalPerCategory.get(category);
            total = total + transaction.amount;
            totalPerCategory.set(category, total);
          } else {
            totalPerCategory.set(category, transaction.amount);
          }
          totalExpense += transaction.amount;
        }
      }
      setTransactionMap(totalPerCategory);
      setGrandTotal(totalExpense);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    transactionsBreakdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="all-content">
      <div className="topTransaction">
        <p className="content-title">Transactions Barchart View</p>
        <DateRange
          beforeDate={beforeDate}
          setBeforeDate={setBeforeDate}
          afterDate={afterDate}
          setAfterDate={setAfterDate}
          apply={transactionsBreakdown}
        />
      </div>
      <div className="flex-content">
        <LoadingBar loading={loadingState}>
          <div className="total-barchart">
            {transactionMap.size > 0 ? (
              <div className="barchart-container">
                <Ebarchart
                  xAxisData={Array.from(transactionMap.keys())}
                  yAxisData={Array.from(transactionMap.values())}
                />
                <div className="barchart-total-container ">
                  <p className="barchart-total-expense">{`Total: $${grandTotal.toFixed(2)}`}</p>
                </div>
              </div>
            ) : (
              <p className="no-transactions">No transactions found.</p>
            )}
          </div>
        </LoadingBar>
      </div>
    </div>
  );
}

export default Barchart;
