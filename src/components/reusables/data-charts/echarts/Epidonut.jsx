import { useState } from "react";
import { CATEGORY_TO_COLOR } from "../../../../data/aux/CategoryList";
import ReactECharts from "echarts-for-react";

function Epidonut({ transactionMap }) {
  const [hoveredData, setHoveredData] = useState({
    name: "Total",
    value: "0.00",
  });
  const pieData = Array.from(transactionMap, ([name, value]) => ({
    name,
    value: Number(value).toFixed(2),
    itemStyle: {
      color: CATEGORY_TO_COLOR[name] || "#7075CE",
    },
  }));

  const totalValue = pieData
    .reduce((sum, value) => sum + Number(value.value), 0)
    .toFixed(2);

  const chartOptions = {
    graphic: [
      {
        type: "text",
        left: "center",
        top: "42%",
        style: {
          text: hoveredData.name,
          textAlign: "center",
          fill: "#646469",
          fontSize: 14,
          fontWeight: 200,
        },
      },
      {
        type: "text",
        left: "center",
        top: "52%",
        style: {
          text: `$${hoveredData.value}`,
          textAlign: "center",
          fill: "#20212e",
          fontSize: 20,
          fontWeight: "300",
        },
      },
    ],
    series: [
      {
        type: "pie",
        radius: ["55%", "80%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: pieData,
        emphasis: {
          scale: true,
          scaleSize: 10,
        },
      },
    ],
  };

  const onEvents = {
    mouseover: (params) => {
      setHoveredData({ name: params.name, value: params.value });
    },
    mouseout: () => {
      setHoveredData({ name: "Total Balance", value: totalValue });
    },
  };

  return (
    <div className="ebarchart-container">
      <ReactECharts
        option={chartOptions}
        style={{ height: "450px", width: "100%" }}
        onEvents={onEvents}
      />
    </div>
  );
}

export default Epidonut;
