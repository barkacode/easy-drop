import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export enum ProjectStatus {
  DRAFT = "Brouillon",
  IN_PROGRESS = "En cours",
  VALIDATED = "Validé",
  DEPLOYED = "Déployé",
}
interface ProjectCardProps {
  title: string;
  status: ProjectStatus;
  date: string;
}

export default function ProjectCard({ title, status, date }: ProjectCardProps) {
  const router = useRouter();

  function getColorByStatus(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.DRAFT:
        return "bg-gray-200 text-gray-800";
      case ProjectStatus.IN_PROGRESS:
        return "bg-yellow-200 text-yellow-800";
      case ProjectStatus.VALIDATED:
        return "bg-green-200 text-green-800";
      case ProjectStatus.DEPLOYED:
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  // clicker sur une card redirectionne vers la page du projet
  const handleClick = () => {
    // Redirection logic here, e.g., using Next.js router
    router.push(`/projects/${title}`);
  };

  return (
    <div
      className={` border p-4 rounded-md shadow-md h-32 w-48 ${getColorByStatus(status)} cursor-pointer`}
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold ">{title}</h3>
      <Badge variant="outline">{status}</Badge>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
    </div>
  );
}
