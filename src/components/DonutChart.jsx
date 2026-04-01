import { useState, useEffect } from "react";
import { getDefaultDates } from "../data/aux/getDefaultDates.js";
import Network from "../utils/network.js";
import LoadingBar from "./reusables/bars/LoadingBar.jsx";
import "./styles/donutchart.css";
import DateRange from "./reusables/input/DateRange.jsx";
import Edonut from "./reusables/data-charts/echarts/Edonut.jsx";
import Epidonut from "./reusables/data-charts/echarts/Epidonut.jsx";

function DonutChart() {
  const [loadingState, setLoadingState] = useState(false);
  const [transactionMap, setTransactionMap] = useState({});
  const [_, setGrandTotal] = useState(0);
  const { after, before } = getDefaultDates();
  const [afterDate, setAfterDate] = useState(after);
  const [beforeDate, setBeforeDate] = useState(before);

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <LoadingBar loading={loadingState}>
          <div className="donut-chart-container">
            {Object.keys(transactionMap).length > 0 ? (
              <>
                {isMobile ? (
                  <Epidonut
                    transactionMap={new Map(Object.entries(transactionMap))}
                  />
                ) : (
                  <Edonut
                    transactionMap={new Map(Object.entries(transactionMap))}
                  />
                )}
              </>
            ) : (
              <p className="no-transactions"> No transactions found.</p>
            )}
          </div>
        </LoadingBar>
      </div>
    </div>
  );
}

export default DonutChart;
