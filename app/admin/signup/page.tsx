import { SignUpForm } from "@/components/forms/signup-form";
import PageLayout from "@/components/layout/PageLayout";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default function SignUpPage() {

  async function createAdminBetterAuth() {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: 'admin@easydrop.com',
        password: 'admin123', // Changez ce mot de passe !
        name: 'Admin'
      }
    });

    // Mettre à jour le rôle en admin
    await prisma.user.update({
      where: { email: 'admin@easydrop.com' },
      data: { 
        role: 'admin',
        emailVerified: true 
      }
    });

    console.log('Admin Better-Auth créé !');
    console.log('Email: admin@easydrop.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

createAdminBetterAuth();

  return (
    <PageLayout>
      <SignUpForm />
    </PageLayout>
  );
}
