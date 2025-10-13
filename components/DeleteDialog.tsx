"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteDialog = ({
  open,
  setOpen,
  deleteId,
  title,
  deleteMutationFun,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteId: string;
  title: string;
  deleteMutationFun: (id: string) => Promise<void>;
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteMutationFun,
    onSuccess: async () => {
      toast.success(`${title} deleted successfully`, {
        id: deleteId,
      });
      await queryClient.invalidateQueries({
        queryKey: [`${title}-delete`],
      });
      onerror: async () => {
        toast.error("Something went wrong", {
          id: deleteId,
        });
      };
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone, This will permanently delete your
            category
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting transaction...", {
                id: deleteId,
              });
              deleteMutation.mutate(deleteId);
            }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
