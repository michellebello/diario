import { useState, useEffect, useRef } from "react";
import Network from "../utils/network.js";
import { RotatingLines } from "react-loader-spinner";
import "./styles/donutchart.css";
import DateRange from "./reusables/DateRange.jsx";
import Edonut from "./reusables/data-charts/echarts/Edonut.jsx";

function DonutChart() {
  const [loadingState, setLoadingState] = useState(false);
  const [transactionMap, setTransactionMap] = useState(new Map());
  const [grandTotal, setGrandTotal] = useState(0);

  const svgReference = useRef(null);

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
        if (totalPerCategory.has(category)) {
          let total = totalPerCategory.get(category);
          total = total + transaction.amount;
          totalPerCategory.set(category, total);
        } else {
          totalPerCategory.set(category, transaction.amount);
        }
        totalExpense += transaction.amount;
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

  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");

  return (
    <div className="all-content">
      <div className="topTransaction">
        <p className="content-title">Transactions Donut Chart View</p>
        <DateRange
          afterDate={afterDate}
          setAfterDate={setAfterDate}
          beforeDate={beforeDate}
          setBeforeDate={setBeforeDate}
          apply={transactionsBreakdown}
        />
      </div>
      <div className="flex-content">
        {loadingState ? (
          <RotatingLines
            strokeColor="grey"
            animationDuration="2.75"
            visible={true}
          />
        ) : (
          <div className="donut-chart-container">
            {transactionMap.size > 0 ? (
              <Edonut transactionMap={transactionMap} />
            ) : (
              <p className="no-transactions"> No transactions found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DonutChart;
