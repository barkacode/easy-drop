import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { ProjectStatus, ProjectStatusKey } from "@/lib/types/project";

interface ProjectCardProps {
  id: string;
  title: string;
  status: ProjectStatusKey; 
  date: string;
}

export default function ProjectCard({ id, title, status, date }: ProjectCardProps) {
  const router = useRouter();

  // 4. Couleur selon le statut
  function getColorByStatus(status: ProjectStatusKey): string {
    switch (status) {
      case "DRAFT":
        return "bg-gray-200 text-gray-800";
      case "IN_PROGRESS":
        return "bg-yellow-200 text-yellow-800";
      case "VALIDATED":
        return "bg-green-200 text-green-800";
      case "DEPLOYED":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  // 5. Redirection sur clic
  const handleClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <div
      className={`border p-4 rounded-md shadow-md h-32 w-48 ${getColorByStatus(status)} cursor-pointer`}
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <Badge variant="outline">{ProjectStatus[status]}</Badge>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
    </div>
  );
}
