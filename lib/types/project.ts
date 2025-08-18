export const ProjectStatus = {
  DRAFT: "Brouillon",
  IN_PROGRESS: "En cours",
  VALIDATED: "Validé",
  DEPLOYED: "Déployé",
} as const;

export type ProjectStatusKey = keyof typeof ProjectStatus; // "DRAFT" | "IN_PROGRESS" | ...
export type ProjectStatusValue = (typeof ProjectStatus)[ProjectStatusKey]; // "Brouillon" | ...
