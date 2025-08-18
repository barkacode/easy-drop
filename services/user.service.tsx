import { prisma } from "@/lib/prisma";

export const getProjectByUserId = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {Project : true},
  });
};

export const getStoreByUserId = async (id?: string) => {
  const currentUserId = id || process.env.USER_ID;
  
  return prisma.user.findUnique({
    where: { id: currentUserId },
    select: { ShopifyStore: true },
  });
}