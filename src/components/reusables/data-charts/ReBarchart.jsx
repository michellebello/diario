import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo, useState, useLayoutEffect, useRef } from "react";

function ReBarchart({ dataObject }) {
  const chartData = useMemo(
    () =>
      Object.entries(dataObject).map(([key, value]) => ({
        "Account Type": key,
        "Total Balance": value,
      })),
    [dataObject],
  );

  const [fontSize, setFontSize] = useState(12);
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width < 400) setFontSize(7);
      else if (width < 700) setFontSize(10);
      else if (width < 1000) setFontSize(12);
      else setFontSize(14);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // const isKeyTooLong = Object.keys(dataObject).some((key) => key.length > 10);

  return (
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
          <Bar dataKey="Total Balance" fill="#43457cff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReBarchart;
