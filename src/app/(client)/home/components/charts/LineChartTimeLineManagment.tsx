import { ITimeLineHome } from "@/types/ITab4And5";
import React, { PureComponent } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  conversionIndex?: ITimeLineHome[];
}

export default class LineChartTimeLineManagment extends PureComponent<Props> {
  render() {
    return (
      <div className="overflow-x-auto bg-white mt-4 py-4 rounded-lg">
        <div className="w-full flex items-center justify-center gap-8">
          <IoIosArrowBack size={30} color="#0D3C73" />{" "}
          <span className="text-base text-[#0D3C73] font-semibold">
            Janeiro de 2024
          </span>{" "}
          <IoIosArrowForward size={30} color="#0D3C73" />
        </div>
        <LineChart
          width={1000}
          height={500}
          data={this.props.conversionIndex}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" />
          <Tooltip />
          {/* Configuração da legenda */}
          <Legend
            layout="horizontal"
            iconType="circle"
            iconSize={7}
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingBottom: 50,
              gap: 10,
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="created"
            stroke="#EE8B82"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="fixed"
            stroke="#5CA7FF"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    );
  }
}
