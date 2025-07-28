"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  getDescriptionByProductName,
  getPoidsByProductName,
} from "../../lib/productsUtils";

const formSchema = z.object({
  type: z.string(),
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  ean: z.string().optional(),
  picture: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Veuillez télécharger une image"
    )
    .optional(),
  weight: z.coerce.number().min(0, "Poids requis"),
  quantity: z.coerce.number().min(0, "Quantité requise").optional(),
  price: z.coerce.number().min(0.01, "Prix requis"),
});

export default function CreateProductForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      type: "",
      title: "",
      description: "",
      ean: "",
      picture: undefined,
      weight: 0,
      quantity: undefined,
      price: 0.0,
    },
  });

  // surveille ce l'element choisie
  const onSelectType = form.watch("type");
  const convert = (htmlString: string) => {
    return htmlString
      .replace(/<br\s*\/?>/gi, "\n") // Remplace <br> par saut de ligne
      .replace(/<\/p>/gi, "\n") // Remplace </p> par saut de ligne
      .replace(/<[^>]*>/g, ""); // Enlève toutes les autres balises
  };

  useEffect(() => {
    // verifie si un element est vraiment choisie
    if (onSelectType && onSelectType !== "") {
      const description = getDescriptionByProductName(onSelectType);
      const weight = getPoidsByProductName(onSelectType);

      form.setValue("description", convert(description));
      if (weight !== undefined) {
        form.setValue("weight", weight);
      }
    }
  }, [onSelectType, form]);

  async function uploadImage(file: File): Promise<string | null> {
    // À adapter selon ta solution d’upload (Cloudinary, S3, etc.)
    // Ici, on retourne null pour l’exemple
    return null;
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      let imageUrl: string | null = null;

      if (data.picture && data.picture.length > 0) {
        const file = data.picture[0];
        imageUrl = await uploadImage(file);
      }

      const payload = {
        type: data.type,
        title: data.title,
        description: data.description,
        ean: data.ean,
        weight: data.weight,
        quantity: data.quantity ?? 0,
        price: data.price,
        images: imageUrl ? [imageUrl] : [],
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors de la création du produit.");
        return;
      }

      alert("Produit créé avec succès !");
      form.reset();
    } catch (err) {
      alert("Erreur lors de la création du produit.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de produit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un type de produit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vetements et accessoires</SelectLabel>
                    <SelectItem value="tshirt_oversize">
                      T-shirt oversize
                    </SelectItem>
                    <SelectItem value="tshirt_loose">T-shirt loose</SelectItem>
                    <SelectItem value="tshirt_adjusted">
                      T-shirt ajusté
                    </SelectItem>
                    <SelectItem value="hat">Casquette</SelectItem>
                    <SelectItem value="hoodie">Hoodie</SelectItem>
                    <SelectItem value="crewneck">Crewneck</SelectItem>
                    <SelectItem value="balaclava">Cagoule</SelectItem>
                    <SelectItem value="socks">Chaussettes</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Audio</SelectLabel>
                    <SelectItem value="cd">CD</SelectItem>
                    <SelectItem value="vinyl">Vinyle</SelectItem>
                    <SelectItem value="usb">Clé USB</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Accessoires</SelectLabel>
                    <SelectItem value="keychain">Porte-clés</SelectItem>
                    <SelectItem value="pin">Pins</SelectItem>
                    <SelectItem value="mug">Mug</SelectItem>
                    <SelectItem value="tote">Tote bag</SelectItem>
                  </SelectGroup>
                  <SelectItem value="other">Autres</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} type="text" id="title" placeholder="Titre" />
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
                  placeholder="Entrez la description du produit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ean"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                EAN <span className="text-gray-300">(optionnel)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Entrez le code EAN du produit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image <span className="text-gray-300">(optionnel)</span></FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poids (en grammes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Entrez le poids du produit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Quantité <span className="text-gray-300">(optionnel)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Entrez la quantité du produit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (en euros)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  placeholder="Entrez le prix du produit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!form.formState.isValid}
        >
          Créer le produit
        </Button>
      </form>
    </Form>
  );
}
