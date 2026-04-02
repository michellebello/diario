import ReactECharts from "echarts-for-react";
import { useState, useLayoutEffect, useRef } from "react";
import { CATEGORY_TO_COLOR } from "../../../../data/aux/CategoryList";

function Edonut({ transactionMap }) {
  const [fontSize, setFontSize] = useState(12);
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width < 400) setFontSize(10);
      else if (width < 700) setFontSize(12);
      else if (width < 1000) setFontSize(16);
      else setFontSize(20);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

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
        return `${params.name}
        $${params.value.toFixed(2)}`;
      },
    },
    series: [
      {
        type: "pie",
        center: ["50%", "50%"],
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
          fontFamily: "Economica, sans-serif",
          fontWeight: "300",
          fontSize: fontSize,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: fontSize,
            fontWeight: "200",
            fontFamily: "Economica, sans-serif",
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
