import { Input } from "@/components/ui/input";
import PageLayout from "../../components/Layout/PageLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-6 pt-10 justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg mb-6">Nous sommes là pour vous aider !</p>
        <form className="w-full max-w-md space-y-4">
          <Input type="text" placeholder="Votre nom" />
          <Input type="email" placeholder="Votre email" />
          <Textarea placeholder="Votre message" className="h-32" />
          <Button type="submit">Envoyer</Button>
        </form>
      </div>
    </PageLayout>
  );
}
