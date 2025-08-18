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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères"),
  company: z.string().optional(),
});

export function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      company: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await authClient.admin
        .createUser({
          name: values.username,
          email: values.email,
          password: values.password,
          role: "user",
          data: {
            company: values.company,
          },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error("Erreur lors de la création de l'utilisateur:", err);
          throw new Error(err.message || "Erreur inconnue");
        });

      toast("Utilisateur créé avec succès !");
      // router.push("/admin/users"); // ou autre page
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message);
      } else {
        toast("Erreur inconnue");
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 pt-10 justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-8 w-md"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl font-bold">Créez un nouveau compte</h1>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d&apos;utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">S&apos;inscrire</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
