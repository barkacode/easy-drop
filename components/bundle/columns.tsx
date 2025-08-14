"use client";

import { Bundle } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Bundle>[] = [
  {
    accessorKey: "name",
    header: "Titre",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
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
