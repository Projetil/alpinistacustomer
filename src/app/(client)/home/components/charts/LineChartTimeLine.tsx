"use client";
import { IIntelligenceTimeLine } from '@/types/ICharts';
import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
      rx={5}
      ry={10} 
      fill={fill}
    />
  );
};

const months: Record<number, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}

interface TimeLineProps {
  timeline?: IIntelligenceTimeLine[]
}

const LineChartTimeLine: React.FC<TimeLineProps> = ({timeline}) => {

  const data = timeline ? timeline.map((item) => ({
    name: months[item.time] || "Unknown",
    value: item.quantity
  })) : [];

  return (
    <div className="p-4 bg-white rounded-lg w-full h-[400px] mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Quantidade de ameaças</h2>
        <button className="px-3 py-1 flex gap-2 text-xs items-center">Esse ano <MdKeyboardArrowDown/></button>
      </div>
      
        <div className="w-full overflow-x-auto">
            <LineChart
            width={1000}
            height={300}
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
                dot={<OvalDot fill="#4c9aff" />}
                activeDot={{ r: 6, stroke: '#4c9aff', strokeWidth: 2 }}
              />
            </LineChart>
        </div>
      
    </div>
  );
};

export default LineChartTimeLine;
