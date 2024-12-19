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

const data = [
  { name: "Jan", Identificadas: 200, Corrigidas: 100 },
  { name: "Feb", Identificadas: 250, Corrigidas: 150 },
  { name: "Mar", Identificadas: 300, Corrigidas: 180 },
  { name: "Apr", Identificadas: 280, Corrigidas: 160 },
  { name: "May", Identificadas: 260, Corrigidas: 140 },
  { name: "Jun", Identificadas: 240, Corrigidas: 130 },
  { name: "Jul", Identificadas: 250, Corrigidas: 120 },
  { name: "Aug", Identificadas: 300, Corrigidas: 150 },
  { name: "Sep", Identificadas: 300, Corrigidas: 160 },
  { name: "Oct", Identificadas: 300, Corrigidas: 155 },
  { name: "Nov", Identificadas: 350, Corrigidas: 170 },
  { name: "Dec", Identificadas: 420, Corrigidas: 200 },
];

const IRRChart = () => {
  return (
    <div className="w-full h-[400px]">
      <h2 className="text-center font-bold text-lg mb-4">IRR</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 20, left: 0, bottom: 20 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Eixo X */}
          <XAxis dataKey="name" />

          {/* Eixo Y */}
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Legenda */}
          <Legend verticalAlign="top" align="right" iconSize={8} iconType="circle"/>

          <Area
            type="monotone"
            dataKey="Identificadas"
            fill="none" 
            stroke="#EE8B82"
            dot={{ r: 4}}
            activeDot={{ r: 6 }}
          />

          <Area
            type="monotone"
            dataKey="Corrigidas"
            fill="#EAFAFE"
            stroke="#5CA7FF"
            strokeWidth={2}
            dot={{ r: 4}}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="Identificadas"
            stroke="#EE8B82"
            strokeWidth={2}
            dot={{ r: 4, fill: "#EE8B82" }}
            activeDot={{ r: 6 }}
          />

            <Line
            type="monotone"
            dataKey="Corrigidas"
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
