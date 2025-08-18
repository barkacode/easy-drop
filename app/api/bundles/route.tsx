import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth-server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Début de la création du bundle");

    // Vérification de l'authentification
    const user = await getUser();
    if (!user?.id) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié." },
        { status: 401 }
      );
    }

    // Récupération des données
    const data = await req.json();
    console.log("📦 Données reçues:", JSON.stringify(data, null, 2));

    // Validation des champs obligatoires
    const requiredFields = [
      "name",
      "description",
      "price",
      "projectId",
      "productIds",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      console.error("❌ Champs manquants:", missingFields);
      return NextResponse.json(
        { error: `Champs obligatoires manquants: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validation du projet
    const project = await prisma.project.findFirst({
      where: {
        id: data.projectId,
        userId: user.id, // Vérifier que le projet appartient à l'utilisateur
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Projet non trouvé ou non autorisé." },
        { status: 404 }
      );
    }

    // Validation des produits
    if (!Array.isArray(data.productIds) || data.productIds.length === 0) {
      return NextResponse.json(
        { error: "Au moins un produit doit être sélectionné." },
        { status: 400 }
      );
    }

    // Vérifier que tous les produits existent et appartiennent au projet
    const products = await prisma.product.findMany({
      where: {
        id: { in: data.productIds },
        projectId: data.projectId,
      },
    });

    if (products.length !== data.productIds.length) {
      return NextResponse.json(
        {
          error:
            "Certains produits sélectionnés n'existent pas ou n'appartiennent pas au projet.",
        },
        { status: 400 }
      );
    }

    // Validation du prix
    const price = parseFloat(data.price);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "Le prix doit être un nombre positif" },
        { status: 400 }
      );
    }

    // Préparation des données pour Prisma
    const bundleData = {
      name: data.name,
      description: data.description,
      price: price,
      projectId: data.projectId,
      products: {
        connect: data.productIds.map((id: string) => ({ id })),
      },
    };

    console.log(
      "🔄 Données préparées pour Prisma:",
      JSON.stringify(bundleData, null, 2)
    );

    // Création du bundle
    const bundle = await prisma.bundle.create({
      data: bundleData,
      include: {
        products: {
          include: {
            images: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    console.log("✅ Bundle créé avec succès:", bundle.id);

    return NextResponse.json(bundle, { status: 201 });
  } catch (error: unknown) {
    console.error("💥 Erreur lors de la création du bundle:", error);

    // Gestion des erreurs Prisma spécifiques
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; message: string };
      
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          { error: "Un bundle avec ce nom existe déjà dans ce projet" },
          { status: 409 }
        );
      }

      if (prismaError.code === "P2003") {
        return NextResponse.json(
          { error: "Erreur de relation de base de données" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Erreur lors de la création du bundle",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error 
            ? error.message 
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    let bundles;

    if (projectId) {
      console.log("🔍 Récupération des bundles pour le projet:", projectId);

      // Récupérer les bundles d'un projet spécifique
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: user.id,
        },
        include: {
          bundles: true,
        },
      });

      if (!project) {
        return NextResponse.json(
          { error: "Projet non trouvé." },
          { status: 404 }
        );
      }

      bundles = project.bundles;
      console.log(
        `📦 ${bundles.length} bundles trouvés pour le projet ${projectId}`
      );
    }
    return NextResponse.json(bundles, { status: 200 });
  } catch (error: unknown) {
    console.error("💥 Error fetching bundles:", error);
    return NextResponse.json(
      {
        error: error instanceof Error 
          ? error.message 
          : "Erreur lors de la récupération des bundles.",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
