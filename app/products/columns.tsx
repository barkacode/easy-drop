"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FormProduct } from "@/types/formProduct";
import { Images, ImageOff, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<FormProduct>[] = [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-sm text-neutral-500">{row.getValue("type")}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <>{row.getValue("description")}</>,
  },
  {
    accessorKey: "ean",
    header: "EAN",
    cell: ({ row }) => <>{row.getValue("ean")}</>,
  },
  {
    accessorKey: "weight",
    header: "Poids (g)",
    cell: ({ row }) => <>{row.getValue("weight")}</>,
  },
  {
    accessorKey: "quantity",
    header: "Quantité",
    cell: ({ row }) => <>{row.getValue("quantity")}</>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <div className="text-right">Prix</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("price")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Editer</DropdownMenuItem>
            <DropdownMenuItem>Dupliquer</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
