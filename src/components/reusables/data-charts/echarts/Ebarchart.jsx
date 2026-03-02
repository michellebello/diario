import ReactECharts from "echarts-for-react";
import "../../../styles/ebarchart.css";

function Ebarchart({ xAxisData, yAxisData }) {
  const chartOptions = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return `${params.name}: <b> ${Number(params.value).toFixed(2)}</b>`;
      },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderWidth: 1,
      borderColor: "#ccc",
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        show: false,
      },
      axisLine: { show: true },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: true },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#e0e0e0",
          type: "dashed",
          width: 1,
        },
      },
    },
    series: [
      {
        data: yAxisData,
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: "#2e2e78c2",
        },
        backgroundStyle: {
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            color: "5470c6",
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
        label: {
          show: false,
          position: "top",
          formatter: "{c}",
        },
      },
    ],
  };

  return (
    <div className="ebarchart-container">
      <ReactECharts
        option={chartOptions}
        style={{ height: "400px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}

export default Ebarchart;
