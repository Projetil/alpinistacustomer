"use client";
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', Identificados: 20, Corrigidos: 10 },
  { name: 'Feb', Identificados: 25, Corrigidos: 15 },
  { name: 'Mar', Identificados: 30, Corrigidos: 20 },
  { name: 'Apr', Identificados: 40, Corrigidos: 25 },
  { name: 'May', Identificados: 50, Corrigidos: 30 },
  { name: 'Jun', Identificados: 55, Corrigidos: 35 },
  { name: 'Jul', Identificados: 60, Corrigidos: 40 },
  { name: 'Aug', Identificados: 65, Corrigidos: 45 },
  { name: 'Sep', Identificados: 60, Corrigidos: 40 },
  { name: 'Oct', Identificados: 55, Corrigidos: 35 },
  { name: 'Nov', Identificados: 50, Corrigidos: 30 },
  { name: 'Dec', Identificados: 45, Corrigidos: 25 },
];

// Componente para o ponto personalizado
interface CustomDotProps {
  cx?: number;
  cy?: number;
  fill?: string;
}

const OvalDot: React.FC<CustomDotProps> = ({ cx, cy, fill }) => {
  if (cx === undefined || cy === undefined) return null;
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4} // Define o raio do ponto para um estilo mais arredondado
      fill={fill}
    />
  );
};

const LineChartIRR: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Linha do tempo</h2>
        <button className="px-2 py-1 bg-blue-100 text-blue-500 rounded-md flex justify-between">
          <span className='font-semibold'>Esse ano</span>
          <ChevronDownIcon
          size={20}
          color="#1A69C4"
          className={`w-6 h-6`}
        />
          </button>
      </div>

      {/* Gráfico de Linhas */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#888' }} />
          <YAxis tick={{ fontSize: 12, fill: '#888' }} domain={[-60, 60]} />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: 0, fontSize: '12px' }} />

          {/* Linhas */}
          <Line
            type="monotone"
            dataKey="Identificados"
            stroke="#ff6868"
            strokeWidth={2}
            dot={<OvalDot fill="#ff6868" />}
            activeDot={{ r: 6, stroke: '#ff6868', strokeWidth: 2 }}
            name="Identificados"
          />
          <Line
            type="monotone"
            dataKey="Corrigidos"
            stroke="#4c9aff"
            strokeWidth={2}
            dot={<OvalDot fill="#4c9aff" />}
            activeDot={{ r: 6, stroke: '#4c9aff', strokeWidth: 2 }}
            name="Corrigidos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartIRR;
