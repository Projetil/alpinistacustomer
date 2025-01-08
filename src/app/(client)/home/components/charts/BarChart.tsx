"use client";
import { ICriticity } from "@/types/ICharts";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const colors: {
  Critica: string;
  Alta: string;
  Media: string;
  Baixa: string;
  Info: string;
} = {
  Critica: "#ff6868",
  Alta: "#ffd9d9",
  Media: "#ffd666",
  Baixa: "#4c9aff",
  Info: "#b0d8ff",
};

interface BarChartProps {
  criticity?: ICriticity[]
}

const BarChartHome: React.FC<BarChartProps> = ({criticity}) => {
  const data = [
    {
      name: 'Superfície de ataques',
      Critica: criticity ? criticity[0].critical : 0,
      Alta: criticity ? criticity[0].high : 0,
      Media: criticity ? criticity[0].medium : 0,
      Baixa: criticity ? criticity[0].low : 0,
      Info: criticity ? criticity[0].info : 0,
    },
    {
      name: 'Inteligência de ameaças',
      Critica: criticity ? criticity[1].critical : 0,
      Alta: criticity ? criticity[1].high : 0,
      Media: criticity ? criticity[1].medium : 0,
      Baixa: criticity ? criticity[1].low : 0,
      Info: criticity ? criticity[1].info : 0,
    },
    {
      name: 'Gestão de vulnerabilidade',
      Critica: criticity ? criticity[2].critical : 0,
      Alta: criticity ? criticity[2].high : 0,
      Media: criticity ? criticity[2].medium : 0,
      Baixa: criticity ? criticity[2].low : 0,
      Info: criticity ? criticity[2].info : 0,
    },
    {
      name: 'Teste de intrusão',
      Critica: criticity ? criticity[3].critical : 0,
      Alta: criticity ? criticity[3].high : 0,
      Media: criticity ? criticity[3].medium : 0,
      Baixa: criticity ? criticity[3].low : 0,
      Info: criticity ? criticity[3].info : 0,
    },
    {
      name: 'Terceiros',
      Critica: criticity ? criticity[4].critical : 0,
      Alta: criticity ? criticity[4].high : 0,
      Media: criticity ? criticity[4].medium : 0,
      Baixa: criticity ? criticity[4].low : 0,
      Info: criticity ? criticity[4].info : 0,
    },
    {
      name: 'Conformidade',
      Critica: criticity ? criticity[5].critical : 0,
      Alta: criticity ? criticity[5].high : 0,
      Media: criticity ? criticity[5].medium : 0,
      Baixa: criticity ? criticity[5].low : 0,
      Info: criticity ? criticity[5].info : 0,
    },
  ];
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-[400px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Criticidade vs. Origem/Serviço
      </h2>

      {/* Legenda personalizada responsiva */}
      <div className="flex flex-wrap justify-left gap-4 mb-4">
        {Object.keys(colors).map((key) => (
          <div key={key} className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: colors[key as keyof typeof colors] }}
            ></span>
            <span className="text-gray-600">{key}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 5 }}
            interval={0}
            textAnchor="center"
            className="hidden"
          />
          <YAxis />
          <Tooltip />
          {Object.keys(colors).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[key as keyof typeof colors]}
              barSize={10}
              radius={[10, 10, 0, 0]} // Borda arredondada na parte superior
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartHome;
