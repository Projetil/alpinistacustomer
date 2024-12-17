import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";

const data = [
    { name: "Crítico", Crítico: 75, legend: "" },
    { name: "Alto", Alto: 120 , legend: ""},
    { name: "Médio", Médio: 175,legend: "" },
    { name: "Baixo", Baixo: 80,legend: "" },
  ];
  
  

const TotalDangers = () => {
    return (
        <div className="w-full bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-black">Total de ameaças</h2>
          <p className="text-4xl font-bold text-[#5CA7FF] mb-4">175</p>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <BarChart
              width={1000}
              height={300} 
              data={data}
              barGap={10} 
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="legend"/>
              <YAxis />
              <Tooltip />
              <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            
          />
    
    <Bar dataKey="Crítico" fill="#FF5C63" barSize={20} activeBar={<Rectangle />} />
    <Bar dataKey="Alto" fill="#FFDDD8 " barSize={20} activeBar={<Rectangle />} />
    <Bar dataKey="Médio" fill="#FFBB5C" barSize={20} activeBar={<Rectangle />} />
    <Bar dataKey="Baixo" fill="#5CA7FF" barSize={20} activeBar={<Rectangle />} />
    
            </BarChart>
          </div>
        </div>
      );
};

export default TotalDangers;
