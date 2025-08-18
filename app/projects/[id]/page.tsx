"use client";

import AddProduct from "@/components/product/addProduct";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../../../components/product/columns";
import { columns as bundleColumns } from "@/components/bundle/columns";
import PageLayout from "../../../components/layout/pageLayout";
import AddBundle from "@/components/bundle/addBundle";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/lib/types";
import { Bundle } from "@prisma/client";

export default function ProjectPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const projectId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) {
        setError("ID du projet manquant");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Récupérer les produits
        const productsResponse = await fetch(
          `/api/products?projectId=${projectId}`
        );

        if (!productsResponse.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }

        const productsData = await productsResponse.json();
        setProducts(productsData);

        const bundlesResponse = await fetch(
          `/api/bundles?projectId=${projectId}`
        );
        const bundlesData = await bundlesResponse.json();
        setBundles(bundlesData);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return <div className="p-4">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Erreur: {error}</div>;
  }

  return (
    <PageLayout>
      <h2 className="text-xl font-bold">Mes fiches produits</h2>
      <DataTable columns={columns} data={products} />
      <div className="w-full flex justify-end mt-4">
        <AddProduct projectId={projectId as string} />
      </div>
      <h2 className="text-xl font-bold mt-8">Mes bundles</h2>

      <DataTable columns={bundleColumns} data={bundles} />
      <div className="w-full flex justify-end mt-4">
        <AddBundle data={products} projectId={projectId as string} />
      </div>
    </PageLayout>
  );
}
