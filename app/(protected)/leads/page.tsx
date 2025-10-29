"use client";
import React from "react";
import { useFilterLead } from "./hooks/leadsHook";
import LeadHeader from "./_components/LeadHeader";

const page = () => {
  const { data } = useFilterLead();
  return (
    <div className="container mx-auto">
      <LeadHeader />
      {/* <LeadDataTable columns={leadsColumns} data={data} /> */}
    </div>
  );
};

export default page;
