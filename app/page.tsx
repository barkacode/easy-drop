"use client";

import ProjectCard, { ProjectStatus } from "@/components/home/projectCard";
import PageLayout from "../components/Layout/PageLayout";
import AddProjectButton from "@/components/home/addProjectButton";
import StoreCard from "@/components/home/storeCard";
import AddStoreButton from "@/components/home/addStoreButton";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth-client";

export default function Home() {
  const [stores, setShopifyStores] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      console.log("User ID from session:", sessionData?.data?.user?.name);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    fetch("/api/stores")
      .then((res) => res.json())
      .then((data) => {
        setShopifyStores(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold">
        Bonjour, {session?.data?.user?.name}
      </h1>
      <h3 className="text-2xl font-bold">Vos boutiques Shopify</h3>
      <div className="flex flex-row space-x-4">
        <div className="flex space-x-4">
          {stores.map((store) => (
            <StoreCard key={store.id} title={store.name} />
          ))}
        </div>
        <AddStoreButton />
      </div>
      <h3 className="text-2xl font-bold mt-8">Vos projets</h3>
      <div className="flex flex-row space-x-4  ">
        <div className="flex space-x-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.name}
              status={project.status as ProjectStatus}
              date={
                project.deadline ? new Date(project.deadline).toISOString() : ""
              }
            />
          ))}
        </div>
        <AddProjectButton />
      </div>
    </PageLayout>
  );
}
