import { NextRequest, NextResponse } from "next/server";
import { PrintType, PrismaClient, ProductColor, Prisma } from "@prisma/client";
import { getUser } from "@/lib/auth-server";
import { ProductCategory } from "@/lib/types";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Début de la création du produit");

    // Récupération des données
    const data = await req.json();
    console.log("📦 Données reçues:", JSON.stringify(data, null, 2));

    // Validation des champs obligatoires
    const requiredFields = [
      "category",
      "type",
      "title",
      "description",
      "price",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      console.error("❌ Champs manquants:", missingFields);
      return NextResponse.json(
        { error: `Champs obligatoires manquants: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validation des types de données
    const price = parseFloat(data.price);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "Le prix doit être un nombre positif" },
        { status: 400 }
      );
    }

    const weight = data.weight ? parseInt(data.weight) : null;
    if (data.weight && (weight === null || isNaN(weight) || weight < 0)) {
      return NextResponse.json(
        { error: "Le poids doit être un nombre positif" },
        { status: 400 }
      );
    }

    // Préparation des données pour Prisma
    interface ProductData {
      category: ProductCategory;
      type: string;
      title: string;
      description: string;
      price: number;
      isIndividual: boolean;
      inPack: boolean;
      ean?: string | null;
      color?: ProductColor | null;
      quantity?: number | null;
      printType?: PrintType | null;
      sizes?: undefined;
      projectId: string;
      weight?: number | null;
    }

    const productData: ProductData = {
      category: data.category,
      type: data.type,
      title: data.title,
      description: data.description,
      price: price,
      isIndividual: Boolean(data.isIndividual),
      inPack: Boolean(data.inPack),
      ean: data.ean || null,
      color: data.color || null,
      quantity: data.quantity ? parseInt(data.quantity) : null,
      printType: data.printType || null,
      sizes: data.sizeInventory || null,
      projectId: data.projectId || null,
    };

    if (weight !== null) {
      productData.weight = weight;
    }

    console.log(
      "🔄 Données préparées pour Prisma:",
      JSON.stringify(productData, null, 2)
    );

    // Création du produit
    const product = await prisma.product.create({
      data: productData,
      include: {
        images: true,
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    console.log("✅ Produit créé avec succès:", product.id);

    // // Création des images si présentes
    if (data.images && data.images.length > 0) {
      console.log("📸 Création des images...");

      await prisma.productImage.createMany({
        data: data.images.map((url: string, index: number) => ({
          url,
          order: index,
          productId: product.id,
        })),
      });
    }

    // Récupération du produit complet avec les images
    const completeProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: { images: true },
    });

    return NextResponse.json(completeProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("💥 Erreur lors de la création du produit:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Gestion des erreurs Prisma spécifiques
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Un produit avec ce code EAN existe déjà" },
          { status: 409 }
        );
      }

      if (error.code === "P2003") {
        return NextResponse.json(
          { error: "Erreur de relation de base de données" },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      {
        error: "Erreur lors de la création du produit",
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

    let products;

    if (projectId) {
      console.log("🔍 Récupération des produits pour le projet:", projectId);
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
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "Erreur lors de la récupération des produits.",
      },
      { status: 500 }
    );
  }
}
