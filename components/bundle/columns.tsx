"use client";

import { FormBundle } from "@/types/formBundle";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FormBundle>[] = [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="text-right font-semibold">Prix</div>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-right">{row.getValue("price")}</div>
    ),
  },
];
