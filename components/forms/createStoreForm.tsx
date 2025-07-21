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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getStoreByUserId } from "@/services/user.service";


const formSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  url: z.string().optional(),
});

export default function CreateProjectForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      url: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const payload = {
        name: data.name,
        url: data.url,
      };

      const res = await fetch("/api/stores", {
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
      alert("Erreur lors de la création du projet.");
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
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de domaine <span className="text-gray-300">(optionnel)</span></FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  id="url"
                  placeholder="exemple.com"
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
          Créer la boutique 
        </Button>
      </form>
    </Form>
  );
}
