import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth-server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { type, title, description, ean, weight, quantity, price, images } =
      data;

    // Validation simple
    if (!type || !title || !description || !weight || !price) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    // Création du produit
    const product = await prisma.product.create({
      data: {
        type,
        title,
        description,
        ean,
        weight,
        quantity,
        price,
        images:
          images && Array.isArray(images)
            ? {
                create: images.map((url: string, idx: number) => ({
                  url,
                  order: idx,
                })),
              }
            : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Erreur d'unicité (ean déjà existant)
      return NextResponse.json(
        { error: "EAN déjà existant." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Erreur lors de la création du produit." },
      { status: 500 }
    );
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

    let products;

    if (projectId) {
      // Récupérer les produits d'un projet spécifique
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: user.id,
        },
        include: {
          products: true,
        },
      });

      if (!project) {
        return NextResponse.json(
          { error: "Projet non trouvé." },
          { status: 404 }
        );
      }

      products = project.products;
    } else {
      // Récupérer tous les produits de tous les projets de l'utilisateur
      const userProjects = await prisma.project.findMany({
        where: { userId: user.id },
        include: { products: true },
      });

      products = userProjects.flatMap((project) => project.products);
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error: error.message || "Erreur lors de la récupération des produits.",
      },
      { status: 500 }
    );
  }
}
