"use client";

import { IIrrHome } from "@/types/ITab4And5";
import { formatMonthName } from "@/utils/formatString";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";

const formatData = (data: IIrrHome) => {
  return data.irrChart.map((item) => ({
    ...item,
    month: formatMonthName(item.month),
  }));
};

const DiffIRRChart = ({ irrData }: { irrData?: IIrrHome }) => {
  const formattedData = irrData ? formatData(irrData) : [];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Responsividade e o gráfico em si */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* Eixo X */}
            <XAxis dataKey="month" tick={{ fontSize: 14 }} />

            {/* Eixo Y */}
            <YAxis domain={[0, 5]} />

            {/* Tooltip */}
            <Tooltip />

            {/* Barras */}
            <Bar
              dataKey="fixed"
              fill="#5CA7FF"
              barSize={20}
              radius={[0, 0, 0, 0]}
            >
              {/* Labels: canto superior direito dentro da barra */}
              <LabelList
                dataKey="fixed"
                position="insideTopLeft"
                fill="#fff"
                fontSize={12}
                offset={5}
                angle={-90}
                dy={25}
              />
            </Bar>
            <Bar
              dataKey="identified"
              fill="#EE8B82"
              barSize={20}
              radius={[0, 0, 0, 0]}
            >
              {/* Labels: canto superior direito dentro da barra */}
              <LabelList
                dataKey="identified"
                position="insideTopLeft"
                fill="#fff"
                fontSize={12}
                offset={5}
                angle={-90}
                dy={25}
              />
            </Bar>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiffIRRChart;
