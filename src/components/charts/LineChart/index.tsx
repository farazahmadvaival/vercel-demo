import dayjs from "dayjs";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { QUERY_KEYS } from "../../../../src/hooks/queryKeys";
import { useQuery } from "../../../../src/hooks/useQuery";
import { ApiUrl } from "../../../apis/apiUrl";

const CustomLineChart = ({
  collectionId,
}: {
  collectionId: string | undefined;
}) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_LINE_CHART, collectionId],
    url: ApiUrl.GET_LINE_CHART,
    params: {
      collectionId: collectionId,
      interval: "week",
    },
    enabled: collectionId ? true : false,
  });
  const getGraphData = (graphData: any) => {
    return (
      graphData &&
      graphData?.map((item: any, index: number) => {
        return { x: dayjs(item?.date).format("MMM DD"), y: item?.floorPrice };
      })
    );
  };
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={getGraphData(data)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            // activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomLineChart;
