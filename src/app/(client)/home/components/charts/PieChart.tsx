/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Crítica', value: 25.25, color: '#ff6868' }, // cor vermelha
    { name: 'Info', value: 50.5, color: '#b0d8ff' }, // cor azul claro
    { name: 'Alta', value: 13, color: '#ffd9d9' }, // cor rosa claro
    { name: 'Média', value: 7.25, color: '#ffd666' }, // cor amarela
    { name: 'Baixo', value: 5, color: '#4c9aff' }, // cor azul médio
];

const PieChartHome: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg w-full max-w-sm mx-auto">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            labelLine={false}
            label={false} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col space-y-2 mt-4 w-full px-12">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex justify-between items-center text-sm text-gray-700">
            <div className="flex items-center">
              <span
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span>{entry.name}</span>
            </div>
            <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartHome;
