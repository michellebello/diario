import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import Network from "../utils/network.js";
import DateRange from "./reusables/DateRange.jsx";
import "./styles/barchart.css";

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
    const svgElement = d3.select(svgReference.current);
    const w = svgElement.node().parentElement.getBoundingClientRect().width;
    const h = w;
    svgElement.selectAll("*").remove();
    const svg = svgElement
      .attr("viewBox", `0 0 ${w} ${h}`)
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);
    const sortedTransactionMap = new Map(
      [...transactionMap.entries()].sort((a, b) => b[1] - a[1])
    );

    const x = d3
      .scaleBand()
      .range([0, w])
      .domain([...sortedTransactionMap.keys()])
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max([...sortedTransactionMap.values()])])
      .range([h, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data([...sortedTransactionMap.entries()])
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d[0]);
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return h - y(d[1]);
      })
      .attr("fill", "#69b3a2");
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
      <div className="flex-content">
        <div className="barchart-container">
          <svg ref={svgReference}></svg>
        </div>
      </div>
    </div>
  );
}

export default Barchart;
