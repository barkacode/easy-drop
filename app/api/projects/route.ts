import { getUser } from "@/lib/auth-server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

const prisma = new PrismaClient();

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
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Erreur lors de la création du projet." },
      { status: 500 }
    );
  }
}

export async function GET() {
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
  } catch (error: unknown) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Erreur lors de la récupération des projets." },
      { status: 500 }
    );
  }
}
