import { Pagination } from "@/components/default/Pagination";
import { GetThirthDataResponse } from "@/types/ICharts";
import { useEffect, useState } from "react";
import { FaArrowsUpDown } from "react-icons/fa6";
import CardContainer from "./CardContainer";
import { useCustomerContext } from "@/contexts/CustomerContext";
import Tab6Service from "@/services/Tab6HomeService";

const ThirdPartiesTable = () => {
  const [tab6Data, setTab6Data] = useState<GetThirthDataResponse>();
  const [page, setPage] = useState(1);
  const { customers } = useCustomerContext();
  const [orderBy, setOrderBy] = useState("Name");
  const [order, setOrder] = useState(true);

  const fetchData = async () => {
    try {
      const res = await Tab6Service.GetThirthData({
        pageSize: 10,
        pageNumber: page,
        companyId: customers?.companyId,
        orderByColumn: orderBy,
        ascending: order,
      });
      setTab6Data(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (customers) {
      fetchData();
    }
  }, [page, customers, orderBy, order]);

  return (
    <>
      <div className="max-w-[400px] w-full my-4">
        <CardContainer
          title="Terceiros ativos"
          data={tab6Data ? tab6Data.totalItems : 0}
        />
      </div>
      <div className="w-full">
        <div className="bg-white w-full rounded-lg text-black p-4 px-2">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("Name");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-start ml-10 items-center font-semibold"
                    >
                      NOME <FaArrowsUpDown />
                    </span>
                  </th>

                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("TotalRisks");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-center items-center font-semibold"
                    >
                      RISCOS <FaArrowsUpDown />
                    </span>
                  </th>

                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("TotalInfos");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-center items-center font-semibold"
                    >
                      INFO <FaArrowsUpDown />
                    </span>
                  </th>
                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("TotalLow");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-center items-center font-semibold"
                    >
                      BAIXA <FaArrowsUpDown />
                    </span>
                  </th>
                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("TotalMedium");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-center items-center font-semibold"
                    >
                      MÉDIA <FaArrowsUpDown />
                    </span>
                  </th>
                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("TotalHigh");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-center items-center font-semibold"
                    >
                      ALTA <FaArrowsUpDown />
                    </span>
                  </th>
                  <th className="p-2">
                    <span
                      onClick={() => {
                        setOrderBy("TotalCritical");
                        setOrder(!order);
                      }}
                      className="flex gap-2 justify-center items-center font-semibold"
                    >
                      CRÍTICA <FaArrowsUpDown />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tab6Data ? (
                  tab6Data.items.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-2 py-4 border-b text-center">
                          {row.name}
                        </td>
                        <td className="px-2 py-4 border-b text-center">
                          {row.totalRisks}
                        </td>
                        <td className="px-2 py-4 border-b text-center">
                          {row.totalInfos}
                        </td>
                        <td className="px-2 py-4 border-b text-center">
                          {row.totalLow}
                        </td>
                        <td className="px-2 py-4 border-b text-center">
                          {row.totalMedium}
                        </td>
                        <td className="px-2 py-4 border-b text-center">
                          {row.totalHigh}
                        </td>
                        <td className="px-2 py-4 border-b text-center">
                          {row.totalCritical}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            pageIndex={page}
            perPage={10}
            handlePage={setPage}
            totalCount={tab6Data?.totalItems || 0}
          />
        </div>
      </div>
    </>
  );
};

export default ThirdPartiesTable;
