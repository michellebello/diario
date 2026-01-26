import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

function ReBarchart({ dataObject }) {
  const chartData = useMemo(
    () =>
      Object.entries(dataObject).map(([key, value]) => ({
        "Account Type": key,
        "Total Balance": value,
      })),
    [dataObject],
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eaeaf0" />
          <XAxis
            dataKey="Account Type"
            tick={{ fill: "#717182", fontSize: 12 }}
            axisLine={{ stroke: "#eaeaf0" }}
          />
          <YAxis
            tick={{ fill: "#717182", fontSize: 12 }}
            axisLine={{ stroke: "#eaeaf0" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value) =>
              `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
            contentStyle={{
              backgroundColor: "#fffffc",
              border: "1px solid rgba(0,0,0,0.1)",
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
