// product.ts - Version complète avec toutes les entrées
export type Product = {
	name: string;
	type?: "Clothing" | "Audio" | "Accessory" | "Other";
	description: string;
	poids: number | undefined;
};

export const products: Record<string, Product> = {
	// T-shirts
	tshirt_adjusted: {
		name: "T-shirt ajusté",
		type: "Clothing",
		description:
			"<p>T-shirt col rond manches courtes.<br>Coupe : Ajusté<br>Modèle mixte<br>Matière : 100% coton<br>Grammage : 180g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 180,
	},
	tshirt_loose: {
		name: "T-shirt loose",
		type: "Clothing",
		description:
			"<p>T-shirt col rond manches courtes.<br>Coupe : Loose<br>Modèle mixte<br>Matière : 100% coton<br>Grammage : 205g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 205,
	},
	tshirt_oversize: {
		name: "T-shirt oversize",
		type: "Clothing",
		description:
			"<p>T-shirt col rond manches courtes.<br>Coupe : très Oversize<br>Modèle mixte<br>Matière : 100% coton<br>Grammage : 240g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 240,
	},

	// Hoodies
	hoodie_middle: {
		name: "Sweat-shirt capuche",
		type: "Clothing",
		description:
			"<p>Sweat-shirt capuche doublée, manches extra longues.<br>Poche kangourou<br>Coupe : Classique<br>Modèle mixte<br>Matière : 80% coton / 20% polyester<br>Grammage : 300 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 300,
	},
	hoodie_classic: {
		name: "Sweat-shirt capuche classique",
		type: "Clothing",
		description:
			"<p>Sweat-shirt capuche doublée, manches extra longues.<br>Poche kangourou<br>Coupe : Classique<br>Modèle mixte<br>Matière : 80% coton / 20% polyester.<br>Grammage : 280 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 280,
	},
	hoodie_lourd: {
		name: "Sweat-shirt capuche lourd",
		type: "Clothing",
		description:
			"<p>Sweat-shirt capuche doublée, manches extra longues.<br>Capuche très profonde<br>Poche kangourou<br>Coupe : très Oversize<br>Modèle mixte<br>Bords côtes larges à la taille et aux poignets<br>Matière : 100% coton<br>Grammage : 460 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*</p>",
		poids: 460,
	},
	hoodie_oversize: {
		name: "Sweat-shirt capuche oversize",
		type: "Clothing",
		description:
			"<p>BASIC OVERSIZE</p><br>Coupe : Oversize<br>Modèle mixte<br>Matière : 80% coton / 20% polyester<br>Grammage : 330 g<br>Print : face et dos<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 330,
	},

	// Autres vêtements
	crewneck: {
		name: "Sweat-shirt col rond",
		type: "Clothing",
		description:
			"<p>Sweat-shirt col rond manches longues.</p><br>Coupe : Classique<br>Modèle mixte<br>Matière : 80% coton / 20% polyester<br>Print : face<br><br>- *Lavable à 30° max, à l'envers en délicat. Sèche-linge déconseillé.*",
		poids: 280,
	},
	balaclava: {
		name: "Cagoule",
		type: "Clothing",
		description: "<p>Cagoule en coton.</p>",
		poids: 120,
	},
	socks: {
		name: "Chaussettes",
		type: "Clothing",
		description: "<p>Chaussettes Fabriquées en coton.</p>",
		poids: 70,
	},
	bob: {
		name: "Bob",
		type: "Clothing",
		description: "<p>Un bob en coton.</p>",
		poids: 110,
	},
	hat: {
		name: "Casquette",
		type: "Clothing",
		description:
			"<p>Casquette en coton avec visière.<br>Réglable par scratch<br>Modèle mixte<br>Matière : 100% coton<br>Print : face</p>",
		poids: 90,
	},

	// Audio
	cd: {
		name: "CD",
		type: "Audio",
		description:
			"<p>Précommandez dès maintenant le nouvel album de ARTISTE, « NOM DE L'ALBUM »,<br> Édition FORMAT. Disponible le …***</p>",
		poids: 100,
	},
	vinyl: {
		name: "Vinyle",
		type: "Audio",
		description:
			"<p>Précommandez dès maintenant le nouvel album de ARTISTE, « NOM DE L'ALBUM », Édition FORMAT. Disponible le …***</p>",
		poids: 430,
	},
	usb: {
		name: "USB",
		type: "Audio",
		description:
			"<p>Clé USB contenant l'album complet en haute qualité.<br>Format : MP3 320kbps<br>Capacité : 8GB<br>Compatible avec tous les appareils</p>",
		poids: 10,
	},

	// Accessoires
	tote: {
		name: "Tote bag",
		type: "Accessory",
		description: "<p>Un tote bag en coton.</p>",
		poids: 120,
	},
	mug: {
		name: "Mug",
		type: "Accessory",
		description: "<p>Un mug pour votre boisson.</p>",
		poids: 200,
	},
	keychain: {
		name: "Porte-clé",
		type: "Accessory",
		description: "<p>Un porte-clé en métal.</p>",
		poids: 25,
	},
	pin: {
		name: "Pin's",
		type: "Accessory",
		description: "<p>Un pin's en métal.</p>",
		poids: 20,
	},
	plateau: {
		name: "Plateau",
		type: "Accessory",
		description: "<p>Un plateau.</p>",
		poids: 150,
	},

	// Autres
	other: {
		name: "Autre produit",
		type: "Other",
		description: "<p>Un autre produit.</p>",
		poids: undefined,
	},
};
