import React, { useState, useEffect, useRef } from "react";
import Network from "../utils/network.js";
// import TransactionsBreakdown from "./reusables/TransactionBreakdown.jsx";
import * as d3 from "d3";
import "./styles/donutchart.css";
import DateRange from "./reusables/DateRange.jsx";

function DonutChart() {
  const [transactionMap, setTransactionMap] = useState(new Map());
  const [grandTotal, setGrandTotal] = useState(0);

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
    let totalExpense = 0;

    for (let transaction of transactionData) {
      const category = transaction.type;
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
  };

  useEffect(() => {
    transactionsBreakdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (transactionMap.size === 0) return;

    const svgElement = d3.select(svgReference.current);
    const w = svgElement.node().parentElement.getBoundingClientRect().width;
    const h = w;
    const margin = 40;
    const radius = Math.min(w, h) / 2 - margin;
    svgElement.selectAll("*").remove();
    const svg = svgElement
      .attr("viewBox", `0 0 ${w} ${h}`)
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);

    const sortedTransactionMap = new Map(
      [...transactionMap.entries()].sort((a, b) => b[1] - a[1])
    );

    const pie = d3.pie().value(function (d) {
      return d[1];
    });
    const data_ready = pie(Array.from(sortedTransactionMap.entries()));

    const color = d3.scaleOrdinal().domain(sortedTransactionMap.keys()).range([
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

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const slices = svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return color(d.data[0]);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    const centerText = svg
      .append("text")
      .attr("class", "center-text")
      .attr("text-anchor", "middle");

    centerText
      .selectAll("tspan")
      .data(["Total Expenses", `$${grandTotal.toFixed(2)}`])
      .enter()
      .append("tspan")
      .attr("x", 0)
      .attr("dy", (d, i) => (i === 0 ? 0 : "1.2em"))
      .text((d) => d);

    slices
      .on("mouseover", function (e, d) {
        const category = d.data[0];
        const val = d.data[1];
        const formattedCat =
          category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

        centerText.selectAll("tspan").remove();
        centerText
          .selectAll("tspan")
          .data([formattedCat, `$${val}`])
          .enter()
          .append("tspan")
          .attr("x", 0)
          .attr("dy", (d, i) => (i === 0 ? 0 : "1.2em"))
          .text((d) => d);

        d3.select(this)
          .transition()
          .duration(100)
          .attr("fill", d3.color(color(category)).darker(0.5));
      })
      .on("mouseout", function (e, d) {
        centerText.selectAll("tspan").remove();
        centerText
          .selectAll("tspan")
          .data(["Total Expenses", `$${grandTotal.toFixed(2)}`])
          .enter()
          .append("tspan")
          .attr("x", 0)
          .attr("dy", (d, i) => (i === 0 ? 0 : "1.2em"))
          .text((d) => d);

        d3.select(this)
          .transition()
          .duration(100)
          .attr("fill", color(d.data[0]));
      });
  }, [transactionMap, grandTotal]);

  const [afterDate, setAfterDate] = useState("");
  const [beforeDate, setBeforeDate] = useState("");

  return (
    <div className="main-content">
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
        <div className="donut-chart-container">
          <svg className="donut-chart" ref={svgReference}></svg>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
