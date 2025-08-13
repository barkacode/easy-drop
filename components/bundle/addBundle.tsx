"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import CreateBundleForm from "../forms/createBundleForm";
import { Product } from "@/lib/types";

interface AddBundleProps {
  data: Product[];
}

export default function AddBundle({ data }: AddBundleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => {
    setIsOpen(false);
  };
  console.log("2 "+ JSON.stringify(data));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter un bundle</Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Ajouter un bundle</DialogTitle>
          <DialogDescription>
            Créer un nouveau bundle de produits.
          </DialogDescription>
        </DialogHeader>
        <CreateBundleForm data={data} />
        <DialogFooter>
          <Button variant="secondary" onClick={handleDialogClose}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
