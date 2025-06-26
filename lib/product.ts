export type Product = {
	description: string;
	poids: number | undefined;
};

export const products: Record<string, Product> = {
	tshirt_adjusted: {
		description:
			"T-shirt col rond manches courtes.\nCoupe : Ajusté\nModèle mixte\nMatière : 100% coton\nGrammage : 180g\nPrint : face et dos\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 180,
	},

	tshirt_loose: {
		description:
			"T-shirt col rond manches courtes.\nCoupe : Loose\nModèle mixte\nMatière : 100% coton\nGrammage : 205g\nPrint : face et dos\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 205,
	},
	tshirt_oversize: {
		description:
			"T-shirt col rond manches courtes.\nCoupe : très Oversize\nModèle mixte\nMatière : 100% coton\nGrammage : 240g\nPrint : face et dos\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 240,
	},

	hoodie_middle: {
		description:
			"Sweat-shirt capuche doublée, manches extra longues.\nPoche kangourou\nCoupe : Classique\nModèle mixte\nMatière : 80% coton / 20% polyester\nGrammage : 300 g\nPrint : face et dos\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 300,
	},
	hoodie_classic: {
		description:
			"Sweat-shirt capuche doublée, manches extra longues.\nPoche kangourou\nCoupe : Classique\nModèle mixte\nMatière : 80% coton / 20% polyester.\nGrammage : 280 g\nPrint : face et dos\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 280,
	},
	hoodi_lourd: {
		description:
			"Sweat-shirt capuche doublée, manches extra longues.\nCapuche très profonde\nPoche kangourou\nCoupe : très Oversize\nModèle mixte\nBords côtes larges à la taille et aux poignets\nMatière : 100% coton\nGrammage : 460 g\nPrint : face et dos\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 460,
	},
	hoodie_oversize: {
		description: "BASIC OVERSIZE",
		poids: 330,
	},
	crewneck: {
		description:
			"Sweat-shirt col rond manches longues.\nCoupe : Classique\nModèle mixte\nMatière : 80% coton / 20% polyester\nPrint : face\n\n- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 280,
	},
	cd: {
		description:
			"Précommandez dès maintenant le nouvel album de ARTISTE, « NOM DE L’ALBUM », Édition FORMAT. Disponible le …***",
		poids: 100,
	},
	vinyl: {
		description:
			"Précommandez dès maintenant le nouvel album de ARTISTE, « NOM DE L’ALBUM », Édition FORMAT. Disponible le …***",
		poids: 430,
	},
	cagoule: {
		description: "Cagoule en coton.",
		poids: 120,
	},
	chaussette: {
		description: "Chaussettes Fabriquées en coton.",
		poids: 70,
	},
	tote: {
		description: "Un tote bag en coton.",
		poids: 120,
	},
	mug: {
		description:
			"Un mug en céramique, parfait pour déguster votre boisson chaude préférée.",
		poids: 200,
	},
	keychain: {
		description: "Un porte-clé en métal",
		poids: 25,
	},
	plateau: {
		description: "Un plateau ",
		poids: 150,
	},
	bob: {
		description: "Un bob en coton.",
		poids: 110,
	},
	pin: {
		description: "Un pin's en métal.",
		poids: 20,
	},
	other: {
		description: "Un autre produit.",
		poids: undefined,
	},
};
