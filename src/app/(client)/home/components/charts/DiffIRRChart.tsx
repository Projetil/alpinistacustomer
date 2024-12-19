"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend
} from "recharts";

const data = [
  { name: "Jan", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Fev", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Mar", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Abr", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Mai", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Jun", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Jul", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Ago", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Set", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Out", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Nov", Corrigidas: 3.58, Identificadas: 4.38 },
  { name: "Dez", Corrigidas: 3.58, Identificadas: 4.38 },
];

const DiffIRRChart = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Responsividade e o gráfico em si */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {/* Eixo X */}
            <XAxis dataKey="name" tick={{ fontSize: 14 }} />

            {/* Eixo Y */}
            <YAxis domain={[0, 5]} />

            {/* Tooltip */}
            <Tooltip />

            {/* Barras */}
            <Bar dataKey="Corrigidas" fill="#5CA7FF" barSize={20} radius={[0, 0, 0, 0]}>
              {/* Labels: canto superior direito dentro da barra */}
              <LabelList
                dataKey="Corrigidas"
                position="insideTopLeft"
                fill="#fff"
                fontSize={12}
                offset={5}
                angle={-90}
                dy={25}
              />
            </Bar>
            <Bar dataKey="Identificadas" fill="#EE8B82" barSize={20} radius={[0, 0, 0, 0]}>
              {/* Labels: canto superior direito dentro da barra */}
              <LabelList
                dataKey="Identificadas"
                position="insideTopLeft"
                fill="#fff"
                fontSize={12}
                offset={5}
                angle={-90}
                dy={25}
              />
            </Bar>
            <Legend/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiffIRRChart;
