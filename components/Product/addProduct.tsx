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
import CreateProductForm from "../forms/createProductForm";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Disc3, Printer, Package, ArrowLeft } from "lucide-react";

export type Category = "on-demand" | "fabrication-ferme" | "phonographie";
interface AddProductProps {
  projectId: string;
} 

export default function AddProduct({ projectId }: AddProductProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (newCategory: Category | null) => {
    setCategory(newCategory);
  };

  const handleDialogClose = () => {
    setCategory(null);
    setIsOpen(false);
  };

  const CategoryButton = ({
    categoryKey,
    title,
    icon,
    description,
  }: {
    categoryKey: string;
    title: string;
    icon: React.ReactNode;
    description: string;
  }) => (
    <button
      className="flex flex-col items-center p-4 w-full max-w-xs border rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={() => handleCategoryChange(categoryKey as Category)}
    >
      <div className="w-full text-start pb-4">
        <span className="flex items-center justify-center rounded-full bg-blue-50 w-12 h-12 text-blue-600">
          {icon}
        </span>
      </div>
      <h3 className="w-full text-start font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="w-full text-start text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </button>
  );

  const getCategoryTitle = (key: string | null) => {
    switch (key) {
      case "on-demand":
        return "On-demand";
      case "fabrication-ferme":
        return "Fabrication ferme";
      case "phonographie":
        return "Phonographie";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Ajouter un produit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {category === null
              ? "Choisir le mode de production"
              : `Ajouter un produit`}
          </DialogTitle>
          <DialogDescription>
            {category === null
              ? "Sélectionnez le mode de production qui correspond à votre produit"
              : "Remplissez les informations du produit dans le formulaire ci-dessous"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {category === null ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CategoryButton
                title="On-demand"
                categoryKey="on-demand"
                icon={<Printer className="w-6 h-6" />}
                description="Nous produisons à la demande selon les commandes"
              />
              <CategoryButton
                title="Fabrication ferme"
                categoryKey="fabrication-ferme"
                icon={<Package className="w-6 h-6" />}
                description="Vous nous fournissez les produits"
              />
              <CategoryButton
                title="Phonographie"
                categoryKey="phonographie"
                icon={<Disc3 className="w-6 h-6" />}
                description="CD, vinyles, etc."
              />
            </div>
          ) : (
            <CreateProductForm
              category={category}
              projectId={projectId}
              // onSuccess={handleDialogClose}
            />
          )}
        </div>

        <DialogFooter className="flex justify-between">
          {category !== null && (
            <Button variant="outline" onClick={() => setCategory(null)}>
              <ArrowLeft /> Retour aux modes
            </Button>
          )}
          <Button
            variant="outline"
            className=" hover:bg-red-500 hover:text-white"
            onClick={handleDialogClose}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
