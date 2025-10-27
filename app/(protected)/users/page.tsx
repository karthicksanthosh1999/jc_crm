"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  userValidationSchema,
  UserValidationSchemaType,
} from "@/schema/user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { differenceInDays, startOfMonth } from "date-fns";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constand";
import UserTable from "./_components/UserTable";

const page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const handleOpen = () => {
    setIsOpen((preV) => !preV);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (values: UserValidationSchemaType) =>
      axios.post("/api/users", values),
    onSuccess: async () => {
      toast.success("User created successfully", {
        id: "create-user",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["create_user"] });
    },
    onError: (error) => {
      toast.error("Failed to create user", { id: "create-user" });
      console.error(error);
    },
  });

  const form = useForm<UserValidationSchemaType>({
    resolver: zodResolver(userValidationSchema),
  });

  const onSubmit = (values: UserValidationSchemaType) => {
    toast.loading("User creating", {
      id: "create-user",
    });
    mutate(values);
  };

  return (
    <div className="container mx-auto max-w-[1550px]">
      <Drawer open={isOpen} onOpenChange={handleOpen} direction="right">
        <DrawerContent className="px-5">
          <DrawerHeader>
            <DrawerTitle>Create User</DrawerTitle>
            <DrawerDescription>Create the user</DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 overflow-y-auto">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Mobile */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile No</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter Mobile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SUPER_ADMIN">
                            SUPER ADMIN
                          </SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="BDE"> BED</SelectItem>
                          <SelectItem value="ACCOUNT">ACCOUNT</SelectItem>
                          <SelectItem value="QC">QC</SelectItem>
                          <SelectItem value="PLACEMENT">PLACEMENT</SelectItem>
                          <SelectItem value="TECH">TECH </SelectItem>
                          <SelectItem value="SALES_MANAGER">
                            SALES_MANAGER
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit" variant={"default"}>
                  Submit
                </Button>
                <DrawerClose onClick={() => form.reset()}>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 py-3">
        <div>
          <p className="text-2xl font-bold">User List</p>
        </div>
        <div className="flex gap-2">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(`The selected date range is too big, Max allowed range is 
                    ${MAX_DATE_RANGE_DAYS} days!`);
                return;
              }
              setDateRange({ from, to });
            }}
          />
          <Button variant={"default"} onClick={handleOpen}>
            Add User
          </Button>
        </div>
      </div>
      <div className="container mx-auto">
        <UserTable
          from={dateRange.from}
          to={dateRange.to}
          search=""
          userType="SUPER_ADMIN"
        />
      </div>
    </div>
  );
};

export default page;
