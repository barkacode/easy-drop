import { prisma } from "@/lib/prisma";

export async function createStore(data: any) {
  return prisma.shopifyStore.create({
    data: {
      ...data,
    },
  });
}

export async function getUserStores(userId: string) {
  return await prisma.shopifyStore.findMany({
    where: { ownerId: userId },
    include: {
      projects: true,
    },
  });
}