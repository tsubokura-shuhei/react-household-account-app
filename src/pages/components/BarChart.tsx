import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Transaction } from "../../types";
import { calculateDailyBalances } from "../../utils/financeCalculations";
import { Box, Typography, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const BarChart = ({ monthlyTransactions, isLoading }: BarChartProps) => {
  const theme = useTheme();

  // オプション設定
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: "top" as const,
      // },
      title: {
        display: true,
        text: "日別の収支",
      },
    },
  };

  //日付ごとの収支の算出
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // console.log(monthlyTransactions);
  // console.log(dailyBalances);
  // console.log(dailyBalances);
  // console.log(monthlyTransactions, "1ヶ月分の取引データ");

  //ラベル（日付）を配列へ格納
  const dateLabels = Object.keys(dailyBalances).sort();
  // console.log(dailyBalances);

  //日付ごとの支出を配列へ格納
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);

  //日付ごとの収入を配列へ格納
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  //データ設定
  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "収入",
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
      {
        label: "支出",
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
    ],
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}
    </Box>
  );
};

export default BarChart;
