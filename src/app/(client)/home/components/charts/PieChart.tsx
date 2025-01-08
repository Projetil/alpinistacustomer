/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { IHeader } from '@/types/ICharts';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


interface PieChartProps {
  headers?: IHeader
}

const PieChartHome: React.FC<PieChartProps> = ({headers}) => {

  const data = [
    { name: 'Crítica', value: headers ? headers.severityCount.critical : 0, color: '#ff6868' },
    { name: 'Info', value: headers ? headers.severityCount.info : 0, color: '#b0d8ff' },
    { name: 'Alta', value: headers ? headers.severityCount.high : 0, color: '#ffd9d9' },
    { name: 'Média', value: headers ? headers.severityCount.medium : 0, color: '#ffd666' },
    { name: 'Baixo', value: headers ? headers.severityCount.low : 0, color: '#4c9aff' },
];
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
