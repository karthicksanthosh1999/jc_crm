"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  FormField,
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  companyValidationSchema,
  companyValidationSchemaType,
} from "@/schema/company_schema";
import { Input } from "@/components/ui/input";

type props = {
  open: boolean;
  setOpen: (formOpen: boolean) => void;
  title: "Create" | "Update";
};

const CompanyForm = ({ open, setOpen, title }: props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(companyValidationSchema),
    defaultValues: {
      companyName: "",
      email: "",
      logo: "",
      mobile: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = (value: companyValidationSchemaType) => {
    console.log(value);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between cursor-pointer">
              <h1>{title} the company</h1>
              <X onClick={handleClose} />
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription>Create the Company</AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  {preview && (
                    <Image
                      className="h-16 w-16 object-cover rounded-full"
                      src={preview}
                      alt="Current profile photo"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <FormField
                    control={form.control}
                    name="logo"
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
                </label>
              </div>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the title"
                        {...field}
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
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter the email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter the mobile"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <Button
                  variant={"destructive"}
                  type="reset"
                  onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {title === "Create" ? "Create" : "Update"}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CompanyForm;
