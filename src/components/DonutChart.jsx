import React, { useState, useEffect, useRef } from "react";
import Network from "../utils/network.js";
import * as d3 from "d3";
import "./styles/donutchart.css";

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
    const w = svgElement.node().getBoundingClientRect().width;
    const h = w;
    const margin = 40;
    const radius = Math.min(w, h) / 2 - margin;

    const svg = svgElement
      .attr("viewBox", `0 0 ${w} ${h}`)
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);

    const pie = d3.pie().value(function (d) {
      return d[1];
    });
    const data_ready = pie(Array.from(transactionMap.entries()));

    const color = d3.scaleOrdinal().domain(transactionMap.keys()).range([
      "#C1666B", // shopping
      "#D4B483", // groceries
      "#E4DFDA", // transportation
      "#48A9A6", // eat out
      "#4281A4", // entertainment
      "#D4C5E2", // pet
      "#FCB97D", // miscellaneous
      "#EF6F6C", // deposit
      "#775B59", // food
    ]);
    svg
      .selectAll("donut_chart")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius * 0, 5)
          .outerRadius(radius)
      )
      .attr("fill", function (d) {
        return color(d.data[0]);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // svg add lines and labels
  }, [transactionMap]);

  return (
    <div className="main-content">
      <p>Transaction Breakdown</p>
      <div className="donut-chart-container">
        <svg ref={svgReference}></svg>
      </div>
    </div>
  );
}

export default DonutChart;
