import { getUser } from "@/lib/auth-server";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { AuthButton } from "@/components/auth/AuthButton";

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="w-full flex items-center justify-between p-4 border-b mx-auto">
      <div className="flex justify-center text-2xl font-bold">
        <Link href="/">BOBW STUDIO</Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
            {user ? (
              <AuthButton user={{ name: user.name, image: user.image ?? undefined }} />
            ) : (
              <Link href="/auth/signin" className="text-sm font-semibold">
                Connexion
              </Link>
            )}
          </Suspense>
        </div>
      </div>
    </header>
  );
};
