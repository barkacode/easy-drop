
export type ProjectStatus = "DRAFT" | "IN_PROGRESS" | "VALIDATED" | "DEPLOYED";
export type StoreStatus = "IN_PROGRESS" | "ACTIVE" | "INACTIVE";
export type UserRole = "user" | "admin";

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

export interface Product {
  id: string;
  type: string;
  title: string;
  description: string;
  ean: string;
  weight: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  images: ProductImage[];
  project: Project[];
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

