import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth-server";
import { getUserStores } from "@/services/store.service";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const data = await req.json();

    const { name } = data;

    // Validation simple
    if (!name) {
      return NextResponse.json({ error: "Nom requis." }, { status: 400 });
    }

    // Création de la boutique
    const store = await prisma.shopifyStore.create({
      data: {
        ...data,
        ownerId: user?.id,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Erreur lors de la création de la boutique." },
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

    const stores = await getUserStores(user.id);
    return NextResponse.json(stores, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Erreur lors de la récupération des boutiques.",
      },
      { status: 500 }
    );
  }
}
