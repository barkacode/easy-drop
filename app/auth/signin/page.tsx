import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "@/components/forms/signin-form";
import Link from "next/link";
import PageLayout from "@/app/PageLayout";

export default function SignUpPage() {
  return (
    <PageLayout>
      <SignInForm />
    </PageLayout>
  );
}
