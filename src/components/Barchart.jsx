import { useState, useEffect } from "react";
import LoadingBar from "./reusables/bars/LoadingBar.jsx";
import Network from "../utils/network.js";
import DateRange from "./reusables/input/DateRange.jsx";
import Ebarchart from "./reusables/data-charts/echarts/Ebarchart.jsx";
import "./styles/barchart.css";

function Barchart() {
  const [transactionMap, setTransactionMap] = useState({});
  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

  const network = new Network();
  const transactionsBreakdown = async () => {
    setLoadingState(true);
    try {
      const result = await network.get(
        "/transactions/chart?after=" + afterDate + "&before=" + beforeDate,
      );
      const transactionTotals = result.data;
      setTransactionMap(transactionTotals);
      let totalExpense = 0;
      for (const val of Object.values(transactionTotals)) {
        totalExpense += val;
      }
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
            {Object.keys(transactionMap).length > 0 ? (
              <div className="barchart-container">
                <Ebarchart
                  xAxisData={Object.keys(transactionMap)}
                  yAxisData={Object.values(transactionMap)}
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
