import { IIrrHome } from "@/types/ITab4And5";
import { formatMonthName } from "@/utils/formatString";
import React from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatData = (data: IIrrHome) => {
  return data.irrChart.map((item) => ({
    ...item,
    month: formatMonthName(item.month),
  }));
};

const IRRChart = ({ irrData }: { irrData?: IIrrHome }) => {
  const formattedData = irrData ? formatData(irrData) : [];

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-center font-bold text-lg mb-4">IRR</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{ top: 0, right: 20, left: 0, bottom: 20 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Eixo X */}
          <XAxis dataKey="month" />

          {/* Eixo Y */}
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Legenda */}
          <Legend
            verticalAlign="top"
            align="right"
            iconSize={8}
            iconType="circle"
          />

          <Area
            type="monotone"
            dataKey="identified"
            fill="none"
            stroke="#EE8B82"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Area
            type="monotone"
            dataKey="fixed"
            fill="#EAFAFE"
            stroke="#5CA7FF"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="identified"
            stroke="#EE8B82"
            strokeWidth={2}
            dot={{ r: 4, fill: "#EE8B82" }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="fixed"
            stroke="#5CA7FF"
            strokeWidth={2}
            dot={{ r: 4, fill: "#5CA7FF" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IRRChart;
