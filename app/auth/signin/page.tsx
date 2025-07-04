import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "@/components/forms/signin-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
   <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
            <SignInForm />
          </div>
    </div>
  );
}
