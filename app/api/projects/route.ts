import { getUser } from "@/lib/auth-server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

const prisma = new PrismaClient();

// model Project {
//   id             String        @id @default(uuid())
//   name           String
//   clientName     String
//   shopifyStore   ShopifyStore  @relation(fields: [shopifyStoreId], references: [id])
//   shopifyStoreId String
//   deadline       DateTime?
//   status         ProjectStatus @default(DRAFT)
//   products       Product[]     @relation("ProjectProducts")
//   userId         String
//   user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
//   createdAt      DateTime      @default(now())
//   updatedAt      DateTime      @updatedAt
// }

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const data = await req.json();
    const { name, shopifyStoreId, deadline } = data;

    // Validation simple
    if (!name || !shopifyStoreId) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    // Vérifier que l'utilisateur est authentifié
    if (!user?.id) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié." },
        { status: 401 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await prisma.project.findUnique({ where: { id: slug } });
    if (existing) {
      throw new Error("Un projet avec ce nom existe déjà.");
    }

    // Création du projet
    const project = await prisma.project.create({
      data: {
        id: slug,
        name,
        shopifyStoreId,
        deadline: deadline ? new Date(deadline) : null,
        userId: user.id,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du projet." },
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

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      include: {
        shopifyStore: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la récupération des projets." },
      { status: 500 }
    );
  }
}
