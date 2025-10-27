import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import CompanyForm from "./companyForm";

const Header = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Company List</h1>
      <Input type="search" placeholder="Search company" className="w-lg" />
      <Button className="cursor-pointer">Add Company</Button>
      <CompanyForm />
    </div>
  );
};

export default Header;
