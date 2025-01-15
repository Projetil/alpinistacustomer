import Tab4And5HomeService from "@/services/Tab4And5HomeService";
import { ITimeLineHome } from "@/types/ITab4And5";
import { useEffect, useState } from "react";
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

export default function LineChartTimeLineManagment({
  isVulne,
  companyId,
}: {
  isVulne: boolean;
  companyId: number;
}) {
  const [vulnerabilityData, setVulnerabilityData] = useState<ITimeLineHome[]>(
    []
  );
  const [vulnerabilityMonth, setVulnerabilityMonth] = useState(
    new Date().getMonth()
  );
  const [vulnerabilityYear, setVulnerabilityYear] = useState(
    new Date().getFullYear()
  );
  const [intrusionData, setIntrusionData] = useState<ITimeLineHome[]>([]);
  const [intrusionMonth, setIntrusionMonth] = useState(
    new Date().getMonth() == 0 ? 1 : new Date().getMonth()
  );
  const [intrusionYear, setIntrusionYear] = useState(new Date().getFullYear());

  const fetchVulnerabityChart = async () => {
    try {
      const res = await Tab4And5HomeService.GetTimeLine(
        "Vulnerability",
        companyId,
        vulnerabilityMonth,
        vulnerabilityYear
      );
      setVulnerabilityData(res);
    } catch (error) {
      console.error("Erro ao buscar dados de vulnerabilidade:", error);
    }
  };

  const fetchIntrusionChart = async () => {
    try {
      const res = await Tab4And5HomeService.GetTimeLine(
        "Intrusion",
        companyId,
        intrusionMonth,
        intrusionYear
      );
      setIntrusionData(res);
    } catch (error) {
      console.error("Erro ao buscar dados de intrusão:", error);
    }
  };

  useEffect(() => {
    if (isVulne) {
      fetchVulnerabityChart();
    }
  }, [vulnerabilityMonth, vulnerabilityYear]);

  useEffect(() => {
    if (!isVulne) {
      fetchIntrusionChart();
    }
  }, [intrusionMonth, intrusionYear]);

  const handleMonthChange = (isForward: boolean) => {
    if (isVulne) {
      let newMonth = isForward
        ? vulnerabilityMonth + 1
        : vulnerabilityMonth - 1;
      let newYear = vulnerabilityYear;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      } else if (newMonth <= 0) {
        newMonth = 12;
        newYear--;
      }

      setVulnerabilityMonth(newMonth);
      setVulnerabilityYear(newYear);
    } else {
      let newMonth = isForward ? intrusionMonth + 1 : intrusionMonth - 1;
      let newYear = intrusionYear;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      } else if (newMonth <= 0) {
        newMonth = 12;
        newYear--;
      }

      setIntrusionMonth(newMonth);
      setIntrusionYear(newYear);
    }
  };

  const formatMonthYear = (month: number, year: number) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    if (month == 0) {
      return `Janeiro de ${year}`;
    } else {
      return `${months[month - 1]} de ${year}`;
    }
  };

  return (
    <div className="overflow-x-auto bg-white mt-4 py-4 rounded-lg">
      <div className="w-full flex items-center justify-center gap-8">
        <IoIosArrowBack
          size={30}
          color="#0D3C73"
          onClick={() => handleMonthChange(false)}
          className="cursor-pointer"
        />
        <span className="text-base text-[#0D3C73] font-semibold">
          {isVulne
            ? formatMonthYear(vulnerabilityMonth, vulnerabilityYear)
            : formatMonthYear(intrusionMonth, intrusionYear)}
        </span>
        <IoIosArrowForward
          size={30}
          color="#0D3C73"
          onClick={() => handleMonthChange(true)}
          className="cursor-pointer"
        />
      </div>
      <LineChart
        width={1000}
        height={500}
        data={isVulne ? vulnerabilityData : intrusionData}
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
