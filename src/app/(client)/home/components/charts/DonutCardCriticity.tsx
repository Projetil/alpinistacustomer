"use client";
import { ICriticityHome } from "@/types/ITab4And5";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FF5C63", "#FFDDD8", "#FFBB5C", "#5CA7FF", "#D1EBFF"];

interface Props {
  conversionIndex?: ICriticityHome;
}

export default class DonutCardCriticity extends PureComponent<Props> {
  render() {
    const { conversionIndex } = this.props;

    const data = conversionIndex
      ? [
          { name: "Crítica", value: conversionIndex.totalCritical },
          { name: "Alta", value: conversionIndex.totalHigh },
          { name: "Média", value: conversionIndex.totalMedium },
          { name: "Baixa", value: conversionIndex.totalLow },
          { name: "Info", value: conversionIndex.totalInfo },
        ]
      : [];

    return (
      <div className="flex flex-col bg-white rounded-lg">
        <div className="border-b py-2 px-4">
          <h1 className="font-bold text-lg text-black">Criticidade</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center pt-4">
          {/* Gráfico de Pizza */}
          <PieChart width={300} height={300} className="md:ml-7">
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* Texto centralizado dentro do gráfico */}

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: "28px", fontWeight: "500", fill: "black" }}
            >
              {conversionIndex?.totalRisks}
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: "14px", fill: "black" }}
            >
              TOTAL
            </text>
          </PieChart>

          {/* Legenda ao lado */}
          <div className="flex flex-col ml-2 md:ml-0  w-full mt-4 md:mt-0 p-2">
            {data.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-center md:justify-normal"
              >
                <div className="flex justify-between items-center w-2/3 md:ml-6 md:w-1/2">
                  <div className="flex items-center">
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: COLORS[index % COLORS.length],
                        marginRight: "5px",
                        borderRadius: "100px",
                      }}
                    />

                    <span className="text-black text-xs">{entry.name}</span>
                  </div>
                  <span>{entry.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
