"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
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
import { LocateIcon, Map, UserCheck2, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/DateInput";

const page = () => {
  const { data: session } = useSession();

  const form = useForm<LeadValidationSchemaType>({
    resolver: zodResolver(LeadValidationSchema),
    defaultValues: {
      userId: session?.user.id,
    },
  });

  const onSubmit = (values: LeadValidationSchemaType) => {
    toast.loading("Lead Creating...", {
      id: "lead-create",
    });
  };

  return (
    <>
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 py-3">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-bold flex items-center justify-start">
                  <UserCheck2 />
                  Basic Info
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex items-center justify-around w-full">
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
                  <div className="flex items-center justify-around w-full">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter mobile number"
                              type="tel"
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter email address"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-around w-full">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <DateInput {...field} className="w-lg" />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              className="w-lg"
                              {...field}
                              placeholder="Enter email address"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-bold flex items-center justify-start">
                  <Map />
                  Address
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We offer worldwide shipping through trusted courier
                    partners. Standard delivery takes 3-5 business days, while
                    express shipping ensures delivery within 1-2 business days.
                  </p>
                  <p>
                    All orders are carefully packaged and fully insured. Track
                    your shipment in real-time through our dedicated tracking
                    portal.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Return Policy</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                  <p>
                    Our hassle-free return process includes free return shipping
                    and full refunds processed within 48 hours of receiving the
                    returned item.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button variant={"default"} type="submit">
                  Submit
                </Button>
                <Button variant={"outline"} type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Accordion>
      </div>
    </>
  );
};

export default page;
