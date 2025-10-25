import React from "react";
import BarChart from "../../_components/charts/barchart";
import PieChart from "../../_components/charts/pieChart";
import ChartCard from "../../_components/charts/ChartCard";

const ChartLayout = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 w-full p-5 gap-5">
      <ChartCard cardTitle="Pie-Chart" description="Just for testing">
        <PieChart />
      </ChartCard>
      <ChartCard cardTitle="Bar-Chart" description="Just for testing">
        <BarChart />
      </ChartCard>
    </div>
  );
};

export default ChartLayout;
