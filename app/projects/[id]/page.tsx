"use client";

import AddProduct from "@/components/product/addProduct";
import { DataTable } from "@/components/ui/data-table";
import { mockBundles, mockProducts } from "@/lib/data";
import { columns } from "../../../components/product/columns";
import { columns as bundleColumns } from "@/components/bundle/columns";
import PageLayout from "../../../components/layout/PageLayout";
import AddBundle from "@/components/bundle/addBundle";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/lib/types";

export default function ProjectPage() {
  const [products, setProducts] = useState<Product[]>([]);
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
        const productsResponse = await fetch(`/api/products?projectId=${projectId}`);
        
        if (!productsResponse.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }

        const productsData = await productsResponse.json();
        setProducts(productsData);

        // TODO: Récupérer les bundles quand l'API sera prête
        // const bundlesResponse = await fetch(`/api/bundles?projectId=${projectId}`);
        // const bundlesData = await bundlesResponse.json();
        // setBundles(bundlesData);
        
        // En attendant, utiliser les données mock pour les bundles
        // setBundles(mockBundles);

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

  if (products.length === 0) {
    return <div className="p-4">Aucun produit trouvé.</div>;
  }

  console.log(products);
  return (
    <PageLayout>
      <h2 className="text-xl font-bold">Mes fiches produits</h2>
      <DataTable columns={columns} data={products} />
      <div className="w-full flex justify-end mt-4">
        <AddProduct />
      </div>
      <h2 className="text-xl font-bold mt-8">Mes bundles</h2>

      <DataTable columns={bundleColumns} data={mockBundles} />
      <div className="w-full flex justify-end mt-4">
        <AddBundle />
      </div>
    </PageLayout>
  );
}
