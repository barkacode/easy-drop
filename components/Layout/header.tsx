import { getUser } from "@/lib/auth-server";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-between p-4 border-b mx-auto ">
      <div className="flex justify-center text-2xl font-bold">
        <Link href="/">BOBW STUDIO</Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export const AuthButton = async () => {
  const user = await getUser();
  if (!user) {
    return (
      <div className="flex items-center space-x-4 ">
        <Link href="/auth/signin" className="text-sm font-semibold">
          Connexion
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2" asChild>
        <Button variant="ghost" className="flex items-center p-5" size={"sm"}>
          <img
            src={user.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-semibold">{user.name || "User"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/auth" className="">
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2 w-full "
            >
              <User2 className="size-4 mr-2 text-inherit " />
              <span className="text-sm font-semibold">Mon compte</span>
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form>
            <Button
              formAction={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });

                redirect("/auth/signin");
              }}
              className="flex items-center justify-start gap-2 w-full hover:bg-red-500 hover:text-white group"
              variant="ghost"
            >
              <LogOut className="size-4 mr-2 text-inherit" />
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
