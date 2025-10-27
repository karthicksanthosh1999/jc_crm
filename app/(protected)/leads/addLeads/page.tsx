"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LeadValidationSchema,
  LeadValidationSchemaType,
} from "@/schema/lead_schema";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Map, UserCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/DateInput";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  const form = useForm<LeadValidationSchemaType>({
    resolver: zodResolver(LeadValidationSchema) as any,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = (values: LeadValidationSchemaType) => {
    toast.loading("Lead Creating...", {
      id: "lead-create",
    });
  };

  return (
    <>
      <div className="container mx-auto max-w-[1440px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full">
            <CardHeader className="container mx-auto">
              <CardTitle className="flex gap-3 items-center">
                {" "}
                <UserCheck2 /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="space-y-5">
                  <div>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col gap-3">
                              <input
                                name={field.name}
                                ref={field.ref}
                                onBlur={field.onBlur}
                                type="file"
                                accept="image/png, image/jpeg"
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const imageUrl = URL.createObjectURL(file);
                                    setPreview(imageUrl);
                                    field.onChange(file);
                                  } else {
                                    field.onChange(null);
                                    setPreview(null);
                                  }
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-around">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter full name"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter email"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-around">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter phone"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter company name"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-around">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Of Birth</FormLabel>
                          <FormControl>
                            <DateInput
                              className="w-lg"
                              name={field.name}
                              onChange={field.onChange}
                              ref={field.ref}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter company name"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-around">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter street"
                              className="w-lg"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter city"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-around">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              type="text"
                              {...field}
                              placeholder="Enter state"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pin-code</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter pin-code"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button variant={"default"} type="submit">
                Submit
              </Button>
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default page;
