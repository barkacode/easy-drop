/*
  Warnings:

  - You are about to drop the column `clientName` on the `Project` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('IN_PROGRESS', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "clientName";

-- AlterTable
ALTER TABLE "shopify_store" ADD COLUMN     "status" "StoreStatus" NOT NULL DEFAULT 'ACTIVE';
