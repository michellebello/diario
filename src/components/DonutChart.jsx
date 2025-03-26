import React, { useState, useEffect, useRef } from "react";
import Network from "../utils/network.js";
// import TransactionsBreakdown from "./reusables/TransactionBreakdown.jsx";
import * as d3 from "d3";
import "./styles/donutchart.css";
import DateRange from "./reusables/DateRange.jsx";

function DonutChart() {
  const [transactionMap, setTransactionMap] = useState(new Map());

  const svgReference = useRef(null);

  const network = new Network();
  const transactionsBreakdown = async () => {
    const result = await network.get("/transactions");
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

    const pie = d3.pie().value(function (d) {
      return d[1];
    });
    const data_ready = pie(Array.from(transactionMap.entries()));

    const color = d3.scaleOrdinal().domain(transactionMap.keys()).range([
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

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    slices
      .on("mouseover", function (e, d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(`Category: ${d.data.category} <br />Value: ${d.data.value}`)
          .style("left", e.pageX + 10 + "px")
          .style("top", e.pageY - 20 + "px");
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "scale(1.1)");
      })
      .on("mouseout", function (e, d) {
        tooltip.transition().duration(200).style("opacity", 0);
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "scale(1)");
      });

    svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("transform", (d) => `translate(${arc.centroid})`)
      .text((d) => d.data.category)
      .style("font-size", "10px")
      .style("fill", "white");
  }, [transactionMap]);

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
          apply={() =>
            alert(`${afterDate} ${setAfterDate} ${beforeDate} ${setBeforeDate}`)
          }
        />
      </div>
      <div className="flex-content">
        <div className="donut-chart-container">
          <svg ref={svgReference}></svg>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
