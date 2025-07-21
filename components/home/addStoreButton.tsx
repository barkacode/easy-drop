import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateStoreForm from "../forms/createStoreForm";

export default function AddStoreButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-32 w-48 border-dashed border-2 border-gray-300 rounded-md flex flex-col items-center justify-center p-7 text-gray-600">
          <Plus className="h-6 w-6 " />
          <span>Ajouter une boutique</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-lg font-semibold">
          Créer une boutique
        </DialogTitle>
        <CreateStoreForm />
      </DialogContent>
    </Dialog>
  );
}
