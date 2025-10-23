"use client";
import React, { useEffect, useState } from "react";
import UserForm from "./_components/userForm";
import { Button } from "@/components/ui/button";
import UserList from "./_components/UserList";
import { Input } from "@/components/ui/input";
import { useFilterCourse } from "./hooks/userHooks";

const page = () => {
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { data, mutate } = useFilterCourse();

  useEffect(() => {
    const fetchData = setTimeout(() => {
      mutate(inputValue);
    }, 2000);
    return () => clearTimeout(fetchData);
  }, [inputValue, mutate]);

  return (
    <div className="container mx-auto max-w-[1440px] px-5">
      <div className=" flex items-center justify-between">
        <h1>User section</h1>
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
          Add User
        </Button>
      </div>
      <UserForm open={userFormOpen} setOpen={setUserFormOpen} title="Create" />
      <UserList courseList={data?.data} />
    </div>
  );
};

export default page;
