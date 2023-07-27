import React from "react";
import { QUERY_KEYS } from "../../../../src/hooks/queryKeys";
import { useQuery } from "../../../../src/hooks/useQuery";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ApiUrl } from "../../../apis/apiUrl";
import dayjs from "dayjs";

// const data = [
//   {
//     name: "Page A",
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//     cnt: 490
//   },
//   {
//     name: "Page B",
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//     cnt: 590
//   },
//   {
//     name: "Page C",
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//     cnt: 350
//   },
//   {
//     name: "Page D",
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//     cnt: 480
//   },
//   {
//     name: "Page E",
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//     cnt: 460
//   },
//   {
//     name: "Page F",
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//     cnt: 380
//   }
// ];

const BarChart = ({ collectionId }: { collectionId: string | undefined }) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_BAR_CHART, collectionId],
    url: ApiUrl.GET_BAR_CHART,
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
        return {
          x: dayjs(item?.date).format("MMM DD"),
          y: item?.volume,
          z: item?.avgPrice,
        };
      })
    );
  };
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={getGraphData(data)}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="x" scale="band" />
        <YAxis dataKey="y" />
        <YAxis
          dataKey="z"
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
        />
        <Tooltip />
        <Bar dataKey="y" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="y" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
