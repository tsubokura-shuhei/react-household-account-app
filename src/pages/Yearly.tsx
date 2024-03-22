import { Grid, Paper } from "@mui/material";
import React from "react";
import MonthSelector from "./components/MonthSelector";
import CategoryChart from "./components/CategoryChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import { Transaction } from "../types";
import YearSelector from "./components/YearSelector";

interface ReportProps {
  currentYear: Date;
  setCurrentYear: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  onDeleteTransaction: (
    transactionId: string | readonly string[]
  ) => Promise<void>;
  yearTransactions: Transaction[];
}

const Yearly = ({
  currentYear,
  setCurrentYear,
  isLoading,
  onDeleteTransaction,
  yearTransactions,
}: ReportProps) => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* 日付 */}
        <YearSelector
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
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
          {/* <BarChart
            yearTransactions={yearTransactions}
            isLoading={isLoading}
          /> */}
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
