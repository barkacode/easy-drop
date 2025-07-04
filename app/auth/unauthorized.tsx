import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Unauthorized() {
  return (
    <div className="flex h-screen items-center justify-center">
      <main className="flex flex-col w-full gap-[32px]">
        <Alert variant="destructive">
          <AlertTitle className="text-lg font-semibold">
            Accés non autorisé
          </AlertTitle>
          <AlertDescription className="text-sm">
            Vous n'êtes pas autorisé à accéder à cette page. Veuillez vous
            connecter ou vous inscrire pour continuer.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
