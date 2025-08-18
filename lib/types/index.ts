
export type ProjectStatus = "DRAFT" | "IN_PROGRESS" | "VALIDATED" | "DEPLOYED";
export type StoreStatus = "IN_PROGRESS" | "ACTIVE" | "INACTIVE";
export type UserRole = "user" | "admin";
export type ProductCategory = "ON_DEMAND" | "FABRICATION_FERME" | "PHONOGRAPHIE";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  company?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  sessions: Session[];
  accounts: Account[];
  role: UserRole;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  Project: Project[];
  ShopifyStore: ShopifyStore[];
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  user: User;
  impersonatedBy?: string;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  user: User;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  id: string;
  name: string;
  shopifyStoreId: string;
  shopifyStore: ShopifyStore;
  deadline?: Date;
  status: ProjectStatus;
  products: Product[];
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

// model Product {
//   id           String          @id @default(uuid())
//   category     ProductCategory @default(ON_DEMAND)
//   type         String
//   title        String
//   description  String
//   ean          String?         @unique
//   weight       Int?
//   price        Float
//   images       ProductImage[]
//   isIndividual Boolean         @default(false)
//   inPack       Boolean         @default(false)


//   // Champs optionnels selon la catégorie
//   color     ProductColor?
//   quantity  Int?
//   printType PrintType?
//   sizes     Json?
  
//   // ✅ Relation avec le projet
//   projectId String?
//   project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@map("product")
// }
export interface Product {
  id: string;
  category: ProductCategory;
  type: string;
  title: string;
  description: string;
  ean?: string;
  weight?: number;
  price: number;
  images: ProductImage[];
  isIndividual: boolean;
  inPack: boolean;
  color?: string;
  quantity?: number;
  printType?: string;
  sizes?: string[];
  createdAt: Date;
  updatedAt: Date;
  project: Project[];
  projectId: string;
}

export interface ProductImage {
  id: string;
  url: string;
  order: number;
  productId: string;
  product: Product;
}

export interface ShopifyStore {
  id: string;
  name: string;
  url: string;
  status: StoreStatus;
  projects: Project[];
  ownerId: string;
  owner: User;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  products: Product[];
  projectId: string;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}
