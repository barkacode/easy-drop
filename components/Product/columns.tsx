"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/types";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  getNameByProductName,
  getTypeByProductName,
} from "@/lib/productsUtils";

function getColorByProduct(product: string): string {
  const type = getTypeByProductName(product);
  switch (type) {
    case "Audio":
      return "bg-blue-500";
    case "Clothing":
      return "bg-green-500";
    case "Accessory":
      return "bg-purple-500";
    case "Other":
      return "bg-red-500";
    default:
      return "bg-red-500";
  }
}

export const columns: ColumnDef<Product>[] = [
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
        <Badge className={` ${getColorByProduct(row.getValue("type"))}`}>
          {getNameByProductName(row.getValue("type"))}
        </Badge>
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
    header: ({}) => <div className="text-right font-semibold">Prix</div>,
    cell: ({ row }) => (
      <div className="text-right font-semibold">{row.getValue("price")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({}) => {
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
