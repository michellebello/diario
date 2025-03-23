import React from "react";
import "../styles/donutchart.css";
import * as d3 from "d3";

function TransactionsBreakdown({ transactionMap }) {
  return (
    <div className="total-legend">
      {Array.from(transactionMap.entries()).map(([category, total]) => (
        <div key={category} className="legend-item">
          <span
            className="legend-color"
            style={{
              backgroundColor: d3
                .scaleOrdinal()
                .domain(Array.from(transactionMap.keys()))
                .range([
                  "#8B5E83",
                  "#6A944D",
                  "#DD5896",
                  "#48A9A6",
                  "#4281A4",
                  "#D4C5E2",
                  "#FCB97D",
                  "#EF6F6C",
                  "#775B59",
                ])(category),
            }}
          ></span>
          <span>
            {category}: {total}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionsBreakdown;
