import { NextRequest, NextResponse } from "next/server";
import { appendToCSV } from "@/lib/csv";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { titre, prix, poids, sku, ean, variants, image } = body;

		if (!titre || !prix || !sku) {
			return NextResponse.json(
				{ error: "Champs requis manquants" },
				{ status: 400 }
			);
		}

		await appendToCSV({ titre, prix, poids, sku, ean, variants, image });
		return NextResponse.json({ success: true });
	} catch (err) {
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
