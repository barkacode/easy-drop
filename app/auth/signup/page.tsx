import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpForm } from "@/components/forms/signup-form";
import PageLayout from "@/app/PageLayout";

export default function SignUpPage() {
  return (
    <PageLayout>
      <SignUpForm />
    </PageLayout>
  );
}
