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
        center: ["50%", "60%"],
        radius: ["50%", "70%"],
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
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
            fontWeight: "200",
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
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
}

export default Edonut;
