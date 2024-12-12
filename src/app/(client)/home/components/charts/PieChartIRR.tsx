/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Identificados', value: 50, color: '#ff6868' }, // cor vermelha
    { name: 'Corrigidos', value: 50, color: '#4c9aff' }, // cor azul médio
];

const PieChartIRR: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg w-full max-w-sm mx-auto">
      {/* Botão de seleção */}
      <button className="mb-4 px-4 py-1 bg-blue-100 text-blue-500 rounded-md w-full flex justify-between">
        <span className='font-semibold'>Outubro</span>
        <ChevronDownIcon
          size={20}
          color="#1A69C4"
          className={`w-6 h-6`}
        />
      </button>

      {/* Gráfico de Pizza */}
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

      {/* Legenda */}
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
            <span className="font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartIRR;
