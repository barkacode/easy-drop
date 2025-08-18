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
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ProjectStatus } from "@prisma/client";
const formSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  deadline: z.coerce
    .date()
    .refine(
      (date) => date > new Date(),
      "La date de fin doit être dans le futur"
    ),
  shopifyStoreId: z.string().min(1, "Selectionner un boutique Shopify"),
});

export default function CreateProjectForm() {
  const router = useRouter();
  type ShopifyStore = {
    name: string;
    deadline: Date | null;
    status: ProjectStatus;
    shopifyStoreId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    clientName: string;
  };

  const [shopifyStores, setShopifyStores] = useState<ShopifyStore[]>([]);
  // const [session, setSession] = useState<any>(null);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const sessionData = await getSession();
  //     setSession(sessionData);
  //   };
  //   fetchSession();
  // }, []);

  useEffect(() => {
    fetch("/api/stores")
      .then((res) => res.json())
      .then((data) => {
        setShopifyStores(data);
      });
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      deadline: new Date(),
      shopifyStoreId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const payload = {
        name: data.name,
        deadline: data.deadline,
        shopifyStoreId: data.shopifyStoreId,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors de la création du produit.");
        return;
      }

      alert("Projet créé avec succès !");
      form.reset();
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de la création du projet.", err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="shopifyStoreId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choisir une boutique</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une boutique" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {shopifyStores.map((store) => (
                      <SelectItem
                        key={store.id}
                        value={store.id}
                        className="capitalize"
                      >
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du projet</FormLabel>
              <FormControl>
                <Input {...field} type="text" id="title" placeholder="Titre" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de deploiement</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
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
          Créer le projet
        </Button>
      </form>
    </Form>
  );
}
