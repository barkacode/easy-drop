import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      type,
      title,
      description,
      ean,
      weight,
      quantity,
      price,
      images, 
    } = data;

    // Validation simple
    if (
      !type ||
      !title ||
      !description ||
      !ean ||
      !weight ||
      !quantity ||
      !price
    ) {
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
