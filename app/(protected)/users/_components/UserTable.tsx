import { DataTableColumnHeader } from "@/components/dataTable/ColumnHeader";
import DeleteDialog from "@/components/DeleteDialog";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Table, TableHeader } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  from: Date;
  to: Date;
  userType: string;
  search: string;
}

const emptyData: any[] = [];

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userType: string;
};

const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "firstName",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="First Name" />;
    },
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.firstName}
        <div className="capitalize">{row.original.firstName}</div>
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Last Name" />;
    },
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.lastName}
        <div className="capitalize">{row.original.lastName}</div>
      </div>
    ),
  },
  {
    accessorKey: "mobile",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Mobile" />;
    },
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.mobile}
        <div className="capitalize">{row.original.mobile}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.email}
        <div className="capitalize">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "userType",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="userType" />;
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "flex gap-2 capitalize p-2 rounded-lg",
          row.original.userType === "SUPER_ADMIN" &&
            "bg-emerald-400/10 text-emerald-500",
          row.original.userType === "ADMIN" && "bg-red-400/10 text-red-500"
        )}>
        {row.original.userType}
      </div>
    ),
  },
  {
    id: "actions",
    embleHiding: true,
    cell: ({ row }) => <RowAction />,
  },
];

const UserTable = ({ from, to, userType, search }: Props) => {
  // QUERY CALL
  const userList = useQuery({
    queryKey: ["user-table"],
    queryFn: () =>
      axios.get(
        `/api/users?search=${search}&userType=${userType}&from=${from}&to=${to}`
      ),
  });

  const table = useReactTable({
    data: userList.data || emptyData,
    columns,
  });

  return (
    <div className="w-full">
      <SkeletonWrapper isLoading={false}>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader></TableHeader>
          </Table>
        </div>
      </SkeletonWrapper>
    </div>
  );
};

export default UserTable;

function RowAction({ users }: { users: TUser }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteMutationFun = async (id: string) => {
    await axios.delete(`/api/user/${id}`);
  };

  return (
    <>
      <DeleteDialog
        title="User"
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        deleteId={users.id}
        deleteMutationFun={deleteMutationFun}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-2 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteDialog((preV) => !preV)}>
            <TrashIcon className="h-4 w-4 text-muted-foreground" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
