"use client";
import { ITimeCorrection } from "@/types/ICharts";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = {
  critico: "#ff6868",
  alto: "#ffd9d9",
  medio: "#ffd666",
  geral: "#4c9aff",
};

interface HorizontalBarProps {
  timeCorrection?: ITimeCorrection[];
}

const HorizontalBarChart: React.FC<HorizontalBarProps> = ({
  timeCorrection,
}) => {
  const totalDaysToFix = timeCorrection
    ? timeCorrection.reduce((sum, tc) => sum + (tc.daysToFix || 0), 0)
    : 0;

  const data = [
    {
      name: "Crítico",
      critico: timeCorrection
        ? timeCorrection.find((tc) => tc.severity === 5)?.daysToFix
        : 0,
    },
    {
      name: "Alto",
      alto: timeCorrection
        ? timeCorrection.find((tc) => tc.severity === 4)?.daysToFix
        : 0,
    },
    {
      name: "Médio",
      medio: timeCorrection
        ? timeCorrection.find((tc) => tc.severity === 3)?.daysToFix
        : 0,
    },
    { name: "Geral", geral: timeCorrection ? totalDaysToFix : 0 },
  ];
  return (
    <div className="p-4 bg-white rounded-lg w-full max-w-2xl lg:max-w-none">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Tempo médio de correção
        </h2>
        <button className="px-3 py-1 bg-blue-100 text-blue-500 rounded-md flex justify-between">
          <span>Dias</span>
          <ChevronDownIcon size={20} color="#1A69C4" className={`w-6 h-6`} />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: -40,
            bottom: 20,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={100} />
          <Tooltip />
          <Legend
            align="center"
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: 10 }}
          />
          {/* Cada `Bar` usa um `dataKey` e uma cor exclusiva */}
          <Bar
            dataKey="critico"
            fill={colors.critico}
            name="Crítico"
            barSize={20}
            style={{ transform: "translateY(6%)" }}
          />
          <Bar
            dataKey="alto"
            fill={colors.alto}
            name="Alto"
            barSize={20}
            style={{ transform: "translateY(2%)" }}
          />
          <Bar
            dataKey="medio"
            fill={colors.medio}
            name="Médio"
            barSize={20}
            style={{ transform: "translateY(-2%)" }}
          />
          <Bar
            dataKey="geral"
            fill={colors.geral}
            name="Geral"
            barSize={20}
            style={{ transform: "translateY(-5%)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
