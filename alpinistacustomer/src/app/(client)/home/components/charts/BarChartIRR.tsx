"use client";
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', Identificado: 50, Corrigido: 25 },
  { name: 'Feb', Identificado: 45, Corrigido: 20 },
  { name: 'Mar', Identificado: 55, Corrigido: 30 },
  { name: 'Apr', Identificado: 60, Corrigido: 35 },
  { name: 'May', Identificado: 65, Corrigido: 40 },
  { name: 'Jun', Identificado: 60, Corrigido: 35 },
  { name: 'Jul', Identificado: 55, Corrigido: 30 },
  { name: 'Aug', Identificado: 60, Corrigido: 35 },
  { name: 'Sep', Identificado: 50, Corrigido: 25 },
  { name: 'Oct', Identificado: 55, Corrigido: 30 },
  { name: 'Nov', Identificado: 60, Corrigido: 35 },
  { name: 'Dec', Identificado: 65, Corrigido: 40 },
];

const BarChartIRR: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg w-full max-w-lg mx-auto shadow-none">
      {/* Título e botão de seleção de ano */}
      <div className="flex flex-col items-start mb-4">
        <h2 className="text-md font-semibold text-gray-700">Riscos Identificados vs Corrigidos</h2>
        <button className="px-4 py-1 bg-blue-100 text-blue-500 rounded-md flex justify-between">
          <span className='font-semibold'>2024</span>
          <ChevronDownIcon
          size={20}
          color="#1A69C4"
          className={`w-6 h-6`}
        />
          </button>
      </div>

      {/* Gráfico de Barras */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: 0, fontSize: '12px' }} />

          {/* Barras Individuais */}
          <Bar dataKey="Identificado" fill="#ff6868" barSize={10} name="Identificado" />
          <Bar dataKey="Corrigido" fill="#4c9aff" barSize={10} name="Corrigido" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartIRR;
