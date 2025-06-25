'use client';

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  type: z.string(),
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  ean: z.string().min(1, "EAN requis"),
  picture: z.any().refine(
    (files) => files instanceof FileList && files.length > 0,
    "Veuillez télécharger une image"
  ),
  weight: z.number().min(1, "Poids requis"),
  quantity: z.number().min(1, "Quantité requise").optional(),
  price: z.number().min(0.01, "Prix requis"),
});

export default function CreateProductForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      title: "",
      description: "",
      ean: "",
      picture: undefined,
      weight: undefined,
      quantity: undefined,
      price: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form data submitted:", data);
    // send data to an API
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vetements et accessoires</SelectLabel>
                    <SelectItem value="shirt">T-shirt</SelectItem>
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
                    <SelectItem value="pin">Pin's</SelectItem>
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
      </form>
    </Form>
  );
}
