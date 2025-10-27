"use client";
import React, { useEffect, useState } from "react";
import UserForm from "./_components/userForm";
import { Button } from "@/components/ui/button";
import UserList from "./_components/UserList";
import { Input } from "@/components/ui/input";
import { useFilterCourse } from "./hooks/courseHooks";

const page = () => {
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const { data } = useFilterCourse(search);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setSearch(inputValue);
    }, 500);
    return () => clearTimeout(fetchData);
  }, [inputValue]);

  return (
    <div className="container mx-auto max-w-[1440px] px-5">
      <div className=" flex items-center justify-between">
        <h1>Course section</h1>
        <div className="flex gap-2 items-center">
          <Input
            value={inputValue}
            placeholder="Search user"
            className="w-xs"
            type="search"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button
            variant={"default"}
            className="cursor-pointer"
            onClick={() => setUserFormOpen(true)}>
            Add Course
          </Button>
        </div>
      </div>
      <UserForm open={userFormOpen} setOpen={setUserFormOpen} title="Create" />
      <UserList courseList={data} />
    </div>
  );
};

export default page;
