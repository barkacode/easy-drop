"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth-client";
import ProjectCard, { ProjectStatus } from "@/components/home/projectCard";
import PageLayout from "../components/Layout/PageLayout";
import AddProjectButton from "@/components/home/addProjectButton";
import StoreCard from "@/components/home/storeCard";
import AddStoreButton from "@/components/home/addStoreButton";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

interface Store {
  id: string;
  name: string;
  status: string;
}

interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  deadline?: string;
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <LoaderCircle className="animate-spin h-8 w-8" />
    <span className="ml-2">Chargement...</span>
  </div>
);

// Stats card component for reusability
const StatsCard = ({
  title,
  count,
  className = "",
}: {
  title: string;
  count: number;
  className?: string;
}) => (
  <Card className={`@container/card ${className}`}>
    <CardHeader>
      <CardDescription>{title}</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {count}
      </CardTitle>
    </CardHeader>
  </Card>
);

export default function Home() {
  const [stores, setStores] = useState<Store[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [session, setSession] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false); // Track if component is initialized
  const [loading, setLoading] = useState({
    session: true,
    stores: true,
    projects: true,
  });
  const [errors, setErrors] = useState({
    session: null as string | null,
    stores: null as string | null,
    projects: null as string | null,
  });

  const router = useRouter();

  // Memoized project statistics
  const projectStats = useMemo(() => {
    const inProgress = projects.filter(
      (p) => p.status === ProjectStatus.IN_PROGRESS
    ).length;
    const draft = projects.filter((p) => p.status === ProjectStatus.DRAFT).length;
    const validated = projects.filter((p) => p.status === ProjectStatus.VALIDATED).length;

    return { inProgress, draft, validated };
  }, [projects]);

  // Session fetching with error handling
  const fetchSession = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, session: true }));
      const sessionData = await getSession();

      if (!sessionData || !sessionData.data) {
        router.replace("/auth/signin"); 
        return;
      }

      setSession(sessionData);
      setIsInitialized(true);
      setErrors((prev) => ({ ...prev, session: null }));
    } catch (error) {
      console.error("Error fetching session:", error);
      router.replace("/auth/signin");
    } finally {
      setLoading((prev) => ({ ...prev, session: false }));
    }
  }, [router]);

  // Stores fetching with error handling
  const fetchStores = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, stores: true }));
      const res = await fetch("/api/stores");

      if (res.status === 401) {
        router.push("/auth/signin");
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setStores(Array.isArray(data) ? data : []);
      setErrors((prev) => ({ ...prev, stores: null }));
    } catch (error) {
      console.error("Error fetching stores:", error);
      setErrors((prev) => ({
        ...prev,
        stores: "Erreur lors du chargement des boutiques",
      }));
      setStores([]);
    } finally {
      setLoading((prev) => ({ ...prev, stores: false }));
    }
  }, [router]);

  // Projects fetching with error handling
  const fetchProjects = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, projects: true }));
      const res = await fetch("/api/projects");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setErrors((prev) => ({ ...prev, projects: null }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      setErrors((prev) => ({
        ...prev,
        projects: "Erreur lors du chargement des projets",
      }));
      setProjects([]);
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    if (session) {
      fetchStores();
      fetchProjects();
    }
  }, [session, fetchStores, fetchProjects]);

  if (loading.session || !isInitialized) {
    return (
      <PageLayout>
        <LoadingSpinner />
      </PageLayout>
    );
  }

  // If no session after initialization, show loading while redirecting (prevents flash)
  if (!session || !session.data) {
    return (
      <PageLayout>
        <LoadingSpinner />
      </PageLayout>
    );
  }

  const userName = session.data.user?.name || "Utilisateur";

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">Bonjour, {userName}</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Projets en cours de développement"
          count={projectStats.inProgress}
        />
        <StatsCard title="Projets en attente" count={projectStats.draft} />
        <StatsCard title="Projets terminés" count={projectStats.validated} />
      </div>

      {/* Stores Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Vos boutiques Shopify</h3>

        {errors.stores && (
          <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-md">
            {errors.stores}
          </div>
        )}

        <div className="flex flex-row gap-4 overflow-x-auto pb-2">
          {loading.stores ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
              <span>Chargement des boutiques...</span>
            </div>
          ) : (
            <>
              <div className="flex gap-4 min-w-0">
                {stores.length > 0 ? (
                  stores.map((store) => (
                    <StoreCard
                      key={store.id}
                      title={store.name}
                      status={store.status}
                    />
                  ))
                ) : (
                  <div className="text-gray-500 italic">
                    Aucune boutique créée
                  </div>
                )}
              </div>
              <AddStoreButton />
            </>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Vos projets</h3>

        {errors.projects && (
          <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-md">
            {errors.projects}
          </div>
        )}

        <div className="flex flex-row gap-4 overflow-x-auto pb-2">
          {loading.projects ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
              <span>Chargement des projets...</span>
            </div>
          ) : (
            <>
              <div className="flex gap-4 min-w-0">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.name}
                      status={project.status}
                      date={
                        project.deadline
                          ? new Date(project.deadline).toLocaleDateString(
                              "fr-FR"
                            )
                          : ""
                      }
                    />
                  ))
                ) : (
                  <div className="text-gray-500 italic">
                    Aucun projet créé
                  </div>
                )}
              </div>
              <AddProjectButton />
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
