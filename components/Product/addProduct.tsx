import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
}
