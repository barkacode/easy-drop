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
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500),
  products: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateBundleFormProps {
  data: Product[];
}

export default function CreateBundleForm({ data }: CreateBundleFormProps) {
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
  console.log("3 "+products)

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
      console.log("Form submitted:", data);
      console.log("Product prices:", productPrices);
      console.log("Total price:", totalPrice);
    } catch (error) {
      console.error("Error submitting form:", error);
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
                onValuesChange={field.onChange}
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
