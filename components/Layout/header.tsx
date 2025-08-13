import { getUser } from "@/lib/auth-server";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { AuthButton } from "@/components/auth/AuthButton";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="w-full flex items-center justify-between p-4 mx-auto">
      <div className="flex items-center ">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
          {user ? (
            <AuthButton
              user={{ name: user.name, image: user.image ?? undefined }}
            />
          ) : (
            <Link href="/auth/signin" className="text-sm font-semibold">
              Connexion
            </Link>
          )}
        </Suspense>
      </div>
    </header>
  );
};
