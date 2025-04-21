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
    const container = svgElement.node().parentElement;
    const w = container.getBoundingClientRect().width;
    const h = 400; // fixed height for clarity

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    svgElement.selectAll("*").remove();

    const svg = svgElement
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const sortedTransactionMap = new Map(
      [...transactionMap.entries()].sort((a, b) => b[1] - a[1])
    );

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain([...sortedTransactionMap.keys()])
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const color = d3
      .scaleOrdinal()
      .domain([...sortedTransactionMap.keys()])
      .range([
        "#8B5E83", // shopping
        "#6A944D", // groceries
        "#DD5896", // transportation
        "#48A9A6", // eat out
        "#4281A4", // entertainment
        "#D4C5E2", // pet
        "#FCB97D", // miscellaneous
        "#EF6F6C", // deposit
        "#775B59", // food
      ]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max([...sortedTransactionMap.values()])])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data([...sortedTransactionMap.entries()])
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d[1]))
      .attr("fill", (d) => color(d[0]));
  }, [transactionMap]);

  return (
    <div className="main-content">
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
        <div className="barchart-container">
          <svg ref={svgReference}></svg>
        </div>
      </div>
    </div>
  );
}

export default Barchart;
