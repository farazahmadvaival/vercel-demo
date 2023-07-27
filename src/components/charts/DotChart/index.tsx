import dayjs from "dayjs";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  CartesianAxis,
} from "recharts";
import { QUERY_KEYS } from "../../../../src/hooks/queryKeys";
import { useQuery } from "../../../../src/hooks/useQuery";
import { ApiUrl } from "../../../apis/apiUrl";

const DotChart = ({ collectionId }: { collectionId: string | undefined }) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_DOT_CHART, collectionId],
    url: ApiUrl.GET_SALE_CHART,
    params: {
      collectionId: collectionId,
      interval: "month",
    },
    enabled: collectionId ? true : false,
  });

  const getGraphData = (graphData: any) => {
    return (
      graphData &&
      graphData?.map((item: any, index: number) => {
        return { x: dayjs(item?.date).format("MMM DD"), y: item?.noOfSales };
      })
    );
  };
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid horizontal={true} vertical={false} />
        <XAxis dataKey="x" name="date" />
        <YAxis type="number" dataKey="y" name="Sales" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={getGraphData(data)} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default DotChart;
