"use client";
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

const data = [
  {
    name: "Superfície de ataques",
    Critica: 30,
    Alta: 20,
    Media: 10,
    Baixa: 50,
    Info: 60,
  },
  {
    name: "Inteligência de ameaças",
    Critica: 20,
    Alta: 25,
    Media: 15,
    Baixa: 55,
    Info: 70,
  },
  {
    name: "Gestão de vulnerabilidade",
    Critica: 35,
    Alta: 22,
    Media: 17,
    Baixa: 45,
    Info: 65,
  },
  {
    name: "Teste de intrusão",
    Critica: 40,
    Alta: 30,
    Media: 25,
    Baixa: 35,
    Info: 75,
  },
  {
    name: "Terceiros",
    Critica: 25,
    Alta: 28,
    Media: 20,
    Baixa: 50,
    Info: 55,
  },
  {
    name: "Conformidade",
    Critica: 30,
    Alta: 35,
    Media: 15,
    Baixa: 40,
    Info: 60,
  },
];

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

const BarChartHome: React.FC = () => {
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
