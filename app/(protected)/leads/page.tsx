"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return (
    <div>
      <Button variant={"default"} onClick={() => redirect("/leads/addLeads")}>
        Add Lead
      </Button>
    </div>
  );
};

export default page;
