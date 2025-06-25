import fs from "fs";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";

const filePath = path.join(process.cwd(), "data", "produits.csv");

export const appendToCSV = async (data: {
	titre: string;
	prix: string;
	poids: string;
	sku: string;
	ean: string;
	variants: string;
	image: string;
}) => {
	const exists = fs.existsSync(filePath);

	const csvWriter = createObjectCsvWriter({
		path: filePath,
		header: [
			{ id: "titre", title: "Titre" },
			{ id: "prix", title: "Prix" },
			{ id: "poids", title: "Poids" },
			{ id: "sku", title: "SKU" },
			{ id: "ean", title: "EAN" },
			{ id: "variants", title: "Variants" },
			{ id: "image", title: "Image" },
		],
		append: exists,
	});

	await csvWriter.writeRecords([data]);
};
