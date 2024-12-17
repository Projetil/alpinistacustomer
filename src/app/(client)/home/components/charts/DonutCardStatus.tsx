'use client'
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ConversionIndex {
    total: number;
    pendent: number;
    reopen: number;
    fixed: number;
    accepted: number;
    retest: number;
    treatment: number;
    notExist: number;
    notExecuted: number;
}

const COLORS = ["#FFA35C", "#FFCE5C", "#A7F04F", "#4FF075", "#5CBEFF", "#4FF0D2","#A8A8A8", "#FF5C63"];

interface Props {
  conversionIndex?: ConversionIndex;
}

export default class DonutCardStatus extends PureComponent<Props> {
  render() {
    const { conversionIndex } = this.props;

    const data = conversionIndex
      ? [
          { name: "Pendente", value: conversionIndex.pendent },
          { name: "Reaberto", value: conversionIndex.reopen },
          { name: "Corrigido", value: conversionIndex.fixed },
          { name: "Aceito", value: conversionIndex.accepted },
          { name: "Em reteste", value: conversionIndex.retest },
          { name: "Em tratamento", value: conversionIndex.treatment },
          { name: "Não existente", value: conversionIndex.notExist },
          { name: "Não executado", value: conversionIndex.notExecuted },
        ]
      : [];

    return (
        <div className="flex flex-col bg-white rounded-lg">
            <div className="border-b  py-2 px-4">
                <h1 className="font-bold text-lg text-black">Status</h1>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            {conversionIndex?.total}
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
            <div key={index} className="flex items-center justify-center md:justify-normal">
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
 