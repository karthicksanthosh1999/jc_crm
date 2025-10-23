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
import {
  courseValidationSchemaType,
  courseValidationSchema,
} from "@/schema/course_schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useCreateCourse } from "../hooks/userHooks";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
}

const UserForm = ({ open, setOpen, title }: IProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
    setPreview(null);
    form.reset();
  };

  const { mutate, isPending } = useCreateCourse(handleClose);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const form = useForm({
    resolver: zodResolver(courseValidationSchema),
  });

  const onSubmit = async (value: courseValidationSchemaType) => {
    toast.loading("Course creating...🔃", {
      id: "user-create",
    });
    const formData = new FormData();
    formData.append("name", value.title);
    if (value.image) {
      formData.append("image", value.image);
    }
    mutate(formData);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between cursor-pointer">
            <h1>{title} the User</h1>
            <X onClick={handleClose} />
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription>
            Create the user profile here
          </AlertDialogDescription>
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
                            className="block w-full text-sm text-slate-500
                                                                file:mr-4 file:py-2 file:px-4
                                                                file:rounded-full file:border-0
                                                                file:text-sm file:font-semibold
                                                                file:bg-violet-50 file:text-violet-700
                                                                hover:file:bg-violet-100"
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
              name="title"
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
            <AlertDialogFooter>
              <Button variant={"destructive"} onClick={handleClose}>
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "Creating" : "Create"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserForm;
