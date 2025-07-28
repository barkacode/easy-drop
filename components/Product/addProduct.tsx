import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateProductForm from "../forms/createProductForm";
import { Button } from "../ui/button";

export default function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ajouter un produit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
        </DialogHeader>
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
}
