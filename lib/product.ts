export type Product = {
	description: string;
	poids: number | undefined;
};

export const products: Record<string, Product> = {
	tshirt_adjusted: {
		description:
			"<p>T-shirt col rond manches courtes.<br>Coupe : Ajusté<br>Modèle mixte<br>Matière : 100% coton<br>Grammage : 180g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 180,
	},

	tshirt_loose: {
		description:
			"<p>T-shirt col rond manches courtes.<br>Coupe : Loose<br>Modèle mixte<br>Matière : 100% coton<br>Grammage : 205g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 205,
	},
	tshirt_oversize: {
		description:
			"<p>T-shirt col rond manches courtes.<br>Coupe : très Oversize<br>Modèle mixte<br>Matière : 100% coton<br>Grammage : 240g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 240,
	},

	hoodie_middle: {
		description:
			"<p>Sweat-shirt capuche doublée, manches extra longues.<br>Poche kangourou<br>Coupe : Classique<br>Modèle mixte<br>Matière : 80% coton / 20% polyester<br>Grammage : 300 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 300,
	},
	hoodie_classic: {
		description:
			"<p>Sweat-shirt capuche doublée, manches extra longues.<br>Poche kangourou<br>Coupe : Classique<br>Modèle mixte<br>Matière : 80% coton / 20% polyester.<br>Grammage : 280 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 280,
	},
	hoodi_lourd: {
		description:
			"<p>Sweat-shirt capuche doublée, manches extra longues.<br>Capuche très profonde<br>Poche kangourou<br>Coupe : très Oversize<br>Modèle mixte<br>Bords côtes larges à la taille et aux poignets<br>Matière : 100% coton<br>Grammage : 460 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 460,
	},
	hoodie_oversize: {
		description:
			"<p>BASIC OVERSIZE</p><br>Coupe : Oversize<br>Modèle mixte<br>Matière : 80% coton / 20% polyester<br>Grammage : 330 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 330,
	},
	crewneck: {
		description:
			"<p>Sweat-shirt col rond manches longues.</p><br>Coupe : Classique<br>Modèle mixte<br>Matière : 80% coton / 20% polyester<br>Print : face<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 280,
	},
	cd: {
		description:
			"<p>Précommandez dès maintenant le nouvel album de ARTISTE, « NOM DE L’ALBUM »,<br> Édition FORMAT. Disponible le …***</p>",
		poids: 100,
	},
	vinyl: {
		description:
			"<p>Précommandez dès maintenant le nouvel album de ARTISTE, « NOM DE L’ALBUM », Édition FORMAT. Disponible le …***</p>",
		poids: 430,
	},
	cagoule: {
		description: "<p>Cagoule en coton.</p>",
		poids: 120,
	},
	chaussette: {
		description: "<p>Chaussettes Fabriquées en coton.</p>",
		poids: 70,
	},
	tote: {
		description: "<p>Un tote bag en coton.</p>",
		poids: 120,
	},
	mug: {
		description:
			"<p>Un mug en céramique, parfait pour déguster votre boisson chaude préférée.</p>",
		poids: 200,
	},
	keychain: {
		description: "<p>Un porte-clé en métal.</p>",
		poids: 25,
	},
	plateau: {
		description: "<p>Un plateau.</p>",
		poids: 150,
	},
	bob: {
		description: "<p>Un bob en coton.</p>",
		poids: 110,
	},
	pin: {
		description: "<p>Un pin's en métal.</p>",
		poids: 20,
	},
	other: {
		description: "<p>Un autre produit.</p>",
		poids: undefined,
	},
};
