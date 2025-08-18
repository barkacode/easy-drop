"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
import { Checkbox } from "../ui/checkbox";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multiselect";
import { Category } from "../product/addProduct";

const formSchema = z.object({
  type: z.string().min(1, "Type de produit requis"),
  title: z.string().min(1, "Titre requis"),
  color: z.string().optional(),
  description: z.string().min(1, "Description requise"),
  ean: z.string().optional(),
  picture: z
    .any()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files instanceof FileList && files.length > 0),
      "Format de fichier invalide"
    )
    .optional(),
  weight: z.coerce.number().min(0, "Poids requis"),
  quantity: z.coerce.number().optional(),
  price: z.coerce.number().min(0.01, "Prix requis"),
  isIndividual: z.boolean().default(false),
  inPack: z.boolean().default(false),
  sizes: z.array(z.string()).optional(),
  sizeQuantities: z.record(z.string(), z.number()).optional(),
  print: z.string().optional(),
});

interface CreateProductFormProps {
  projectId: string;
  category: Category;
  onSuccess?: () => void;
}

export default function CreateProductForm({
  projectId,
  category,
  onSuccess,
}: CreateProductFormProps) {
  const sizes = ["Taille unique", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // États pour la gestion des tailles
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(
    {}
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      type: "",
      title: "",
      color: "",
      description: "",
      ean: "",
      picture: undefined,
      weight: 0,
      quantity: undefined,
      price: 0.0,
      isIndividual: false,
      inPack: false,
      sizes: [],
      sizeQuantities: {},
      print: "",
    },
  });

  console.log("Form initialized with default values:", form.formState.errors);

  // surveille l'élément choisi
  const onSelectType = form.watch("type");

  const convert = (htmlString: string) => {
    return htmlString
      .replace(/<br\s*\/?>/gi, "\n") // Remplace <br> par saut de ligne
      .replace(/<\/p>/gi, "\n") // Remplace </p> par saut de ligne
      .replace(/<[^>]*>/g, ""); // Enlève toutes les autres balises
  };

  useEffect(() => {
    // vérifie si un élément est vraiment choisi
    if (onSelectType && onSelectType !== "") {
      const description = getDescriptionByProductName(onSelectType);
      const weight = getPoidsByProductName(onSelectType);

      form.setValue("description", convert(description));
      if (weight !== undefined) {
        form.setValue("weight", weight);
      }
    }
  }, [onSelectType, form]);

  // fonctions pour la gestion des tailles
  const toggleSize = (size: string) => {
    const newSelectedSizes = new Set(selectedSizes);

    if (newSelectedSizes.has(size)) {
      newSelectedSizes.delete(size);
      const newQuantities = { ...sizeQuantities };
      delete newQuantities[size];
      setSizeQuantities(newQuantities);
      form.setValue("sizeQuantities", newQuantities);
    } else {
      newSelectedSizes.add(size);
      const newQuantities = { ...sizeQuantities, [size]: 1 };
      setSizeQuantities(newQuantities);
      form.setValue("sizeQuantities", newQuantities);
    }

    // Trier les tailles sélectionnées avant de les enregistrer dans le formulaire
    const sortedSizes = Array.from(newSelectedSizes).sort(
      (a, b) => sizes.indexOf(a) - sizes.indexOf(b)
    );

    setSelectedSizes(new Set(sortedSizes));
    form.setValue("sizes", sortedSizes);
  };

  // async function uploadImage(file: File): Promise<string | null> {
  async function uploadImage(): Promise<string | null> {
    // À adapter selon ta solution d'upload (Cloudinary, S3, etc.)
    // Ici, on retourne null pour l'exemple
    return null;
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      let imageUrl: string | null = null;

      if (data.picture && data.picture.length > 0) {
        // const file = data.picture[0];
        imageUrl = await uploadImage();
      }

      // Mappage des couleurs vers les enums Prisma
      const colorMapping: Record<string, string> = {
        black: "BLACK",
        gray: "GRAY",
        white: "WHITE",
      };

      // Mappage des types d'impression vers les enums Prisma
      const printMapping: Record<string, string> = {
        dtf: "DTF",
        serigraphie: "SERIGRAPHIE",
        broderie: "BRODERIE",
      };

      // Déterminer la catégorie basée sur le contexte
      let categoryValue: string;
      switch (category) {
        case "on-demand":
          categoryValue = "ON_DEMAND";
          break;
        case "fabrication-ferme":
          categoryValue = "FABRICATION_FERME";
          break;
        case "phonographie":
          categoryValue = "PHONOGRAPHIE";
          break;
        default:
          categoryValue = "ON_DEMAND";
      }

      const payload = {
        projectId: projectId,
        category: categoryValue,
        type: data.type,
        title: data.title,
        description: data.description,
        price: data.price,
        isIndividual: data.isIndividual,
        inPack: data.inPack,

        // Champs optionnels
        ean: data.ean || null,
        weight: data.weight || null,

        // Couleur - seulement pour ON_DEMAND
        color:
          category === "on-demand" && data.color
            ? colorMapping[data.color] || null
            : null,

        // Quantité - seulement pour PHONOGRAPHIE
        quantity: category === "phonographie" ? data.quantity ?? null : null,

        // Type d'impression - seulement pour FABRICATION_FERME
        printType:
          category === "fabrication-ferme" && data.print
            ? printMapping[data.print] || null
            : null,

        // Tailles - format JSON pour FABRICATION_FERME
        sizeInventory:
          category === "fabrication-ferme" && data.sizeQuantities
            ? data.sizeQuantities
            : null,

        // Images
        images: imageUrl ? [imageUrl] : [],
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erreur API (texte brut):", errorText);

        try {
          const error = JSON.parse(errorText);
          console.error("Erreur API (JSON):", error);
          alert(error.error || "Erreur lors de la création du produit.");
        } catch {
          console.error("Impossible de parser l'erreur JSON");
          alert(`Erreur ${res.status}: ${errorText}`);
        }
        return;
      }

      alert("Produit créé avec succès !");
      form.reset();

      // Reset des états locaux
      setSelectedSizes(new Set());
      setSizeQuantities({});

      // Appel du callback de succès pour fermer le dialog
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur lors de la création du produit.");
    }
  }

  const getCategoryLabel = (category: Category) => {
    switch (category) {
      case "on-demand":
        return "On-Demand";
      case "fabrication-ferme":
        return "Fabrication ferme";
      case "phonographie":
        return "Phonographie";
      default:
        return category;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Mode sélectionné :</strong> {getCategoryLabel(category)}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            {/* Type de produit */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de produit</FormLabel>
                  {category !== "fabrication-ferme" && (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un type de produit" />
                        </SelectTrigger>
                      </FormControl>

                      {category === "on-demand" && (
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Vêtements et accessoires</SelectLabel>
                            <SelectItem value="tshirt_oversize">
                              T-shirt oversize
                            </SelectItem>
                            <SelectItem value="tshirt_loose">
                              T-shirt loose
                            </SelectItem>
                            <SelectItem value="tshirt_adjusted">
                              T-shirt ajusté
                            </SelectItem>
                            <SelectItem value="hat">Casquette</SelectItem>
                            <SelectItem value="hoodie">Hoodie</SelectItem>
                            <SelectItem value="crewneck">Crewneck</SelectItem>
                            <SelectItem value="balaclava">Cagoule</SelectItem>
                          </SelectGroup>

                          <SelectGroup>
                            <SelectLabel>Accessoires</SelectLabel>
                            <SelectItem value="mug">Mug</SelectItem>
                            <SelectItem value="tote">Tote bag</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      )}

                      {category === "phonographie" && (
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Supports audio</SelectLabel>
                            <SelectItem value="cd">CD</SelectItem>
                            <SelectItem value="vinyl">Vinyle</SelectItem>
                            <SelectItem value="cassette">Cassette</SelectItem>
                            <SelectItem value="usb">Clé USB</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      )}
                    </Select>
                  )}
                  {category === "fabrication-ferme" && (
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Entrez le type de produit"
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Titre */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nom du produit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Couleur (uniquement on demand) */}
            {category === "on-demand" && (
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Couleur</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner une couleur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="black">
                            <div className="flex items-center">
                              <span className="inline-block w-4 h-4 bg-black rounded-full mr-2"></span>
                              Noir
                            </div>
                          </SelectItem>
                          <SelectItem value="gray">
                            <div className="flex items-center">
                              <span className="inline-block w-4 h-4 bg-gray-500 rounded-full mr-2"></span>
                              Gris
                            </div>
                          </SelectItem>
                          <SelectItem value="white">
                            <div className="flex items-center">
                              <span className="inline-block w-4 h-4 bg-gray-100 border rounded-full mr-2"></span>
                              Blanc
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-20"
                      placeholder="Décrivez votre produit..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images du produit */}
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image du produit{" "}
                    <span className="text-gray-500">(optionnel)</span>
                  </FormLabel>
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
          </div>
          <div className="space-y-4 ">
            {/* Sélection des tailles (uniquement fabrication-ferme) */}
            {category === "fabrication-ferme" && (
              <div className="space-y-6">
                {/* Sélection des tailles */}
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tailles disponibles</FormLabel>
                      <MultiSelector
                        onValuesChange={(newValues: string[]) => {
                          const previous = new Set(selectedSizes);

                          const added = newValues.find((v) => !previous.has(v));
                          const removed = Array.from(previous).find(
                            (v) => !newValues.includes(v)
                          );

                          if (added) {
                            toggleSize(added);
                          } else if (removed) {
                            toggleSize(removed);
                          }
                        }}
                        values={field.value ?? []}
                        className="text-sm"
                      >
                        <MultiSelectorTrigger baseOrder={sizes}>
                          <MultiSelectorInput placeholder="Ajouter une taille" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {sizes.map((size, index) => (
                              <MultiSelectorItem value={size} key={index}>
                                {size}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormItem>
                  )}
                />

                {/* Quantités par taille */}
                {selectedSizes.size > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Quantités par taille</FormLabel>
                    </div>

                    <div className="space-y-3 text-sm">
                      {Array.from(selectedSizes).map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <span>Taille {size}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              value={sizeQuantities[size] || 0}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value) || 0;
                                const newQuantities = {
                                  ...sizeQuantities,
                                  [size]: newValue,
                                };
                                setSizeQuantities(newQuantities);
                                form.setValue("sizeQuantities", newQuantities);
                              }}
                              onBlur={(e) => {
                                const value = parseInt(e.target.value) || 0;

                                if (value === 0) {
                                  const newQuantities = { ...sizeQuantities };
                                  delete newQuantities[size];
                                  setSizeQuantities(newQuantities);

                                  const newSelectedSizes = new Set(
                                    selectedSizes
                                  );
                                  newSelectedSizes.delete(size);
                                  setSelectedSizes(newSelectedSizes);

                                  form.setValue(
                                    "sizes",
                                    Array.from(newSelectedSizes)
                                  );
                                  form.setValue(
                                    "sizeQuantities",
                                    newQuantities
                                  );
                                }
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Poids */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poids (grammes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="ex: 150" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Prix unitaire */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix unitaire (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        placeholder="ex: 25.99"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantité uniquement pour phono */}
            {category === "phonographie" && (
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantité en stock{" "}
                      <span className="text-gray-500">(optionnel)</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="ex: 100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Code EAN */}
            <FormField
              control={form.control}
              name="ean"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Code EAN <span className="text-gray-500">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="ex: 1234567890123"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Individuel */}
            <FormField
              control={form.control}
              name="isIndividual"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Ce produit peut être vendu individuellement
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* En pack */}
            <FormField
              control={form.control}
              name="inPack"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Ce produit sera disponible dans un bundle
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Impression (uniquement fabrication-ferme) */}
            {category === "fabrication-ferme" && (
              <FormField
                control={form.control}
                name="print"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impression</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un type d'impression" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="dtf">DTF</SelectItem>
                          <SelectItem value="serigraphie">
                            Sérigraphie
                          </SelectItem>
                          <SelectItem value="broderie">Broderie</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Création..." : "Créer le produit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
