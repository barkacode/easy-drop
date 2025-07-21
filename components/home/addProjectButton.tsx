import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import CreateProjectForm from "../forms/createProjectForm";

export default function AddProjectButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-32 w-48 border-dashed border-2 border-gray-300 rounded-md flex flex-col items-center justify-center p-7 text-gray-600">
          <Plus className="h-6 w-6 " />
          <span>Ajouter un projet</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-lg font-semibold">
          Créer un projet
        </DialogTitle>
        <CreateProjectForm />
      </DialogContent>
    </Dialog>
  );
}
