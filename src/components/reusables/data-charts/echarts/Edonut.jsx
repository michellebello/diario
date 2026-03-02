import ReactECharts from "echarts-for-react";
import { CATEGORY_TO_COLOR } from "../../../../data/aux/CategoryList";

function Edonut({ transactionMap }) {
  const pieData = Array.from(transactionMap, ([category, value]) => ({
    name: category,
    value: Number(value),
    itemStyle: {
      color: CATEGORY_TO_COLOR[category] || "#BDC3C7",
    },
  }));
  const chartOptions = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return `$${params.value.toFixed(2)}`;
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        padAngle: 5,
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{b}: {d}%",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "1.1rem",
            fontWeight: "300",
          },
        },
        data: pieData,
      },
    ],
  };

  return (
    <div className="ebarchart-container">
      <ReactECharts
        option={chartOptions}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}

export default Edonut;
