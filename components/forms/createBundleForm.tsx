"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multiselect";
import { useState } from "react";
import { Product } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500),
  products: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateBundleFormProps {
  data: Product[];
  projectId: string;
}

export default function CreateBundleForm({
  data,
  projectId,
}: CreateBundleFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productPrices, setProductPrices] = useState<{ [key: string]: number }>(
    {}
  );

  const products = data.filter((p) => p.inPack);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      products: [],
    },
  });

  const handlePriceChange = (productTitle: string, newPrice: string) => {
    setProductPrices((prev) => ({
      ...prev,
      [productTitle]: parseFloat(newPrice) || 0,
    }));
  };

  // Calculer le prix total
  const totalPrice = products
    .filter((p) => (form.watch("products") || []).includes(p.title))
    .reduce((sum, product) => {
      const price = productPrices[product.title] || product.price;
      return sum + price;
    }, 0);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("📤 Début de la soumission du bundle");

      // Récupérer les IDs des produits sélectionnés à partir de leurs titres
      const selectedProductIds = products
        .filter((product) => data.products.includes(product.title))
        .map((product) => product.id);

      if (selectedProductIds.length === 0) {
        alert("Veuillez sélectionner au moins un produit.");
        return;
      }

      // Préparer les données à envoyer
      const payload = {
        name: data.name,
        description: data.description,
        price: totalPrice, // Utiliser le prix total calculé
        projectId: projectId,
        productIds: selectedProductIds,
        // Optionnel : inclure les prix personnalisés
        customPrices: productPrices,
      };

      console.log("📦 Payload envoyé:", payload);

      // Envoyer la requête à l'API
      const response = await fetch("/api/bundles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erreur API (texte brut):", errorText);

        try {
          const error = JSON.parse(errorText);
          console.error("❌ Erreur API (JSON):", error);
          alert(error.error || "Erreur lors de la création du bundle.");
        } catch {
          console.error("Impossible de parser l'erreur JSON");
          alert(`Erreur ${response.status}: ${errorText}`);
        }
        return;
      }

      const result = await response.json();
      console.log("✅ Bundle créé avec succès:", result);

      // Afficher un message de succès
      alert("Bundle créé avec succès !");

      // Réinitialiser le formulaire
      form.reset();
      setSelectedProducts([]);
      setProductPrices({});

      // Appeler le callback de succès pour fermer le dialog et rafraîchir
      // if (onSuccess) {
      //   onSuccess();
      // }
    } catch (error) {
      console.error("💥 Erreur lors de la création du bundle:", error);
      alert("Erreur lors de la création du bundle. Veuillez réessayer.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du bundle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="input"
                  placeholder="Entrez le nom du bundle"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="textarea"
                  placeholder="Entrez une description du bundle"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produits disponibles</FormLabel>
              <MultiSelector
                onValuesChange={(values) => {
                  field.onChange(values); // ✅ Met à jour le formulaire
                  setSelectedProducts(values); // ✅ Met à jour l'état local
                }}
                values={field.value ?? []}
                className="text-sm"
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Ajouter un produit" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {products.map((product, index) => (
                      <MultiSelectorItem value={product.title} key={index}>
                        {product.title}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormItem>
          )}
        />

        {form.watch("products") && form.watch("products").length > 0 && (
          <div className="mt-4">
            <table className="min-w-full border text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Nom</th>
                  <th className="border px-2 py-1">EAN</th>
                  <th className="border px-2 py-1">Prix</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((p) =>
                    (form.watch("products") || []).includes(p.title)
                  )
                  .map((product) => (
                    <tr key={product.title}>
                      <td className="border px-2 py-1">{product.title}</td>
                      <td className="border px-2 py-1">{product.ean}</td>
                      <td className="border px-2 py-1 flex items-center">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          className="border-none bg-transparent shadow-none outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-transparent focus-visible:ring-transparent p-0 h-auto w-16 flex-1"
                          value={productPrices[product.title] || product.price}
                          onChange={(e) =>
                            handlePriceChange(product.title, e.target.value)
                          }
                        />
                        €
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Prix total */}
            <div className="mt-4 p-3">
              <div className="flex justify-between items-center font-semibold">
                <span>Prix total du bundle :</span>
                <span className="text-lg">{totalPrice.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Création..." : "Créer le produit"}
        </Button>
      </form>
    </Form>
  );
}
