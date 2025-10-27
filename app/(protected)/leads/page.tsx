"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";
import { useFilterLead } from "./hooks/leadsHook";

const page = () => {
  const { data } = useFilterLead();
  console.log(data);
  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h4>User</h4>
        <Button variant={"default"} onClick={() => redirect("/leads/addLeads")}>
          Add Lead
        </Button>
      </div>
      {/* <LeadDataTable columns={leadsColumns} data={data} /> */}
    </div>
  );
};

export default page;
