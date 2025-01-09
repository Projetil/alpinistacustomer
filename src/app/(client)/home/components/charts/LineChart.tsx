"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 25 },
  { name: 'Mar', value: 30 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 45 },
];

// Componente para o ponto oval
interface CustomDotProps {
  cx?: number;
  cy?: number;
  fill?: string;
}

const OvalDot: React.FC<CustomDotProps> = ({ cx, cy, fill }) => {
  if (cx === undefined || cy === undefined) return null;
  
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={5} // Largura do ponto oval
      ry={10} // Altura do ponto oval
      fill={fill}
    />
  );
};

const LineChartHome: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Quantidade de riscos</h2>
        <button className="px-3 py-1 bg-blue-100 text-blue-500 rounded-md">Esse ano</button>
      </div>
      <ResponsiveContainer width="100%" height="70%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#888' }} />
          <YAxis tick={{ fontSize: 12, fill: '#888' }} domain={[-60, 60]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4c9aff"
            strokeWidth={2}
            dot={<OvalDot fill="#4c9aff" />} // Aplicando o ponto oval personalizado
            activeDot={{ r: 6, stroke: '#4c9aff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartHome;
