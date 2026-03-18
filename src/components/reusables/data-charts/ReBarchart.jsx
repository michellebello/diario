import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LoadingBar from "../LoadingBar";
import { useMemo, useState, useLayoutEffect, useRef } from "react";

function ReBarchart({ dataObject }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const chartData = useMemo(() => {
    setDataLoaded(true);
    return Object.entries(dataObject).map(([key, value]) => {
      const isCredit = key === "Credit";
      return {
        "Account Type": key,
        "Total Balance": isCredit ? value * -1 : value,
      };
    });
  }, [dataObject]);

  const [fontSize, setFontSize] = useState(10);
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width < 400) setFontSize(5);
      else if (width < 700) setFontSize(6);
      else if (width < 1000) setFontSize(7);
      else setFontSize(12);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <LoadingBar loading={!dataLoaded}>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eaeaf0" />
            <XAxis
              dataKey="Account Type"
              tick={{ fill: "#717182", fontSize }}
              axisLine={{ stroke: "#eaeaf0" }}
            />
            <YAxis
              tick={{ fill: "#717182", fontSize }}
              axisLine={{ stroke: "#eaeaf0" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) =>
                `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
              contentStyle={{
                backgroundColor: "#fffffc",
                border: "1px solid #0000001a",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="Total Balance"
              fill="#43457cff"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </LoadingBar>
  );
}

export default ReBarchart;
