"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";

export const AuthButton = ({
  user,
}: {
  user: { name?: string; image?: string };
}) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2" asChild>
        <Button variant="ghost" className="flex items-center p-5" size="sm">
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
          <Link href="/auth">
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2 w-full"
            >
              <User2 className="size-4 mr-2 text-inherit" />
              <span className="text-sm font-semibold">Mon compte</span>
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form>
            <Button
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onResponse: () => {
                      router.push("/auth/signin");
                    },
                  },
                });
              }}
              className="flex items-center justify-start gap-2 w-full hover:bg-red-500 hover:text-white"
              variant="ghost"
            >
              <LogOut className="size-4 mr-2 text-inherit" />
              Déconnexion
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
