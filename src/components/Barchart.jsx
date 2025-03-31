import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import Network from "../utils/network.js";
import DateRange from "./reusables/DateRange.jsx";
import "./styles/donutchart.css";

function Barchart() {
  const [transactionMap, setTransactionMap] = useState(new Map());

  const svgReference = useRef(null);

  const network = new Network();
  const transactionsBreakdown = async () => {
    let result = "";
    if (beforeDate && afterDate) {
      result = await network.get(
        "/transactions?after=" + afterDate + "&before=" + beforeDate
      );
    } else {
      result = await network.get("/transactions");
    }
    const transactionData = result.data;
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
    setTransactionMap(totalPerCategory);
    console.log(totalPerCategory);
  };

  useEffect(() => {
    transactionsBreakdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");

  useEffect(() => {
    if (transactionMap.size === 0) return;

    // const svgElement = d3.select(svgReference.current);
    // const w = svgElement.node().parentElement.getBoundingClientRect().width;
    // const h = w;
    // const margin = 40;
  }, [transactionMap]);

  return (
    <div className="main-content">
      <p className="content-title">Transactions Barchart View</p>
      <DateRange
        beforeDate={beforeDate}
        setBeforeDate={setBeforeDate}
        afterDate={afterDate}
        setAfterDate={setAfterDate}
        apply={transactionsBreakdown}
      />
    </div>
  );
}

export default Barchart;
