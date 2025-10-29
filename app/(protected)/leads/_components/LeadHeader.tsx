"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Import, X } from "lucide-react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const LeadHeader = ({ open, setOpen }: Props) => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const handleClose = () => {
    setExcelData([]);
    setOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Extracted Excel Data:", jsonData);
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const onSubmit = (value: any) => {
    console.log("Form Data:", value);
    console.log("Excel Data:", excelData);

    // 👉 You can send this data to your API route here:
    // await fetch("/api/leads/import", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(excelData),
    // });
  };

  return (
    <div className="flex justify-between">
      <h4 className="text-xl font-semibold">Leads</h4>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Import />
          Import
        </Button>
        <Button variant="default" onClick={() => redirect("/leads/addLeads")}>
          Add Lead
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between cursor-pointer">
              <h1>Import the Leads</h1>
              <X onClick={handleClose} />
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription>
              Upload an Excel file to import leads
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="flex items-center space-x-6">
              <label className="block">
                <Input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {excelData.length > 0 && (
              <div className="max-h-40 overflow-y-auto border p-2 rounded">
                <p className="font-semibold mb-1">Preview:</p>
                <pre className="text-sm">
                  {JSON.stringify(excelData.slice(0, 3), null, 2)}
                </pre>
              </div>
            )}

            <AlertDialogFooter>
              <Button variant="destructive" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={excelData.length === 0}>
                Import
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LeadHeader;
