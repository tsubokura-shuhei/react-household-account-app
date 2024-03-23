import {
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MonthSelector from "./components/MonthSelector";
import CategoryChart from "./components/CategoryChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import { Transaction } from "../types";
import YearSelector from "./components/YearSelector";
import BarChartYear from "./components/BarChartYear";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { financeCalculations } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";

interface ReportProps {
  currentYear: Date;
  setCurrentYear: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  onDeleteTransaction: (
    transactionId: string | readonly string[]
  ) => Promise<void>;
  yearTransactions: Transaction[];
  monthlyTransactions: Transaction[];
}

const Yearly = ({
  currentYear,
  setCurrentYear,
  isLoading,
  onDeleteTransaction,
  yearTransactions,
  monthlyTransactions,
}: ReportProps) => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };

  //年間の合計データ
  const { income, expense, balance } = financeCalculations(yearTransactions);
  // console.log(financeCalculations(monthlyTransactions));
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mb={2}>
        {/* 日付 */}
        <YearSelector
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
      </Grid>
      {/* 年間合計 */}
      <Grid item xs={12}>
        <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
          {/* 収入 */}
          <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.incomeColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction={"row"}>
                  <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
                  <Typography fontWeight="bold">収入</Typography>
                </Stack>
                <Typography
                  textAlign={"right"}
                  variant="h5"
                  fontWeight={"fontWeightBold"}
                  sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  {formatCurrency(income)}円
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 支出 */}
          <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.expenseColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction={"row"}>
                  <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
                  <Typography fontWeight="bold">支出</Typography>
                </Stack>
                <Typography
                  textAlign={"right"}
                  variant="h5"
                  fontWeight={"fontWeightBold"}
                  sx={{
                    wordBreak: "break-word",
                    fontSize: {
                      xs: ".8rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
                >
                  {formatCurrency(expense)}円
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 残高 */}
          <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.balanceColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction={"row"}>
                  <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
                  <Typography fontWeight="bold">残高</Typography>
                </Stack>
                <Typography
                  textAlign={"right"}
                  variant="h5"
                  fontWeight={"fontWeightBold"}
                  sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
                  }}
                >
                  {formatCurrency(balance)}円
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}>
          {/* 円グラフ */}
          {/* <CategoryChart
            yearTransactions={yearTransactions}
            isLoading={isLoading}
          /> */}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChartYear
            yearTransactions={yearTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {/* テーブル */}
        {/* <TransactionTable
          yearTransactions={yearTransactions}
          onDeleteTransaction={onDeleteTransaction}
        /> */}
      </Grid>
    </Grid>
  );
};

export default Yearly;
